// ==================== Firebase Config (ESM) ====================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBW_GYELchHB-VoIc7TR1XPK-tkE4bLutg",
  authDomain: "iniciopruebabeta.firebaseapp.com",
  projectId: "iniciopruebabeta",
  storageBucket: "iniciopruebabeta.firebasestorage.app",
  messagingSenderId: "17837784293",
  appId: "1:17837784293:web:94538fc553b24751b5680c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ==================== 2º factor: configuración ====================
// Reemplazá este hash por el SHA-256 de TU contraseña.
// Cómo obtenerlo (en la consola del navegador):
//   await crypto.subtle.digest('SHA-256', new TextEncoder().encode('tu-contraseña'))
//     .then(b=>Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,'0')).join(''))
const PASSWORD_HASH = "7a92c8be74878e8ee870f84cc90dcf431a4104dc2d93426a56eb96008699ff52";

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}
function show(elId, display = "flex") { const el = document.getElementById(elId); if (el) el.style.display = display; }
function hide(elId) { const el = document.getElementById(elId); if (el) el.style.display = "none"; }
function isSecondFactorOk() { return sessionStorage.getItem("secondFactorOk") === "1"; }
function setSecondFactorOk(v) { sessionStorage.setItem("secondFactorOk", v ? "1" : "0"); }

// ==================== Login / Logout ====================
window.login = () => {
  signInWithPopup(auth, provider)
    .then(() => {
      // No mostramos app todavía: pedimos contraseña.
      setSecondFactorOk(false);
      hide("loginContainer");
      show("passwordGate", "flex");

      // 🔹 AGREGADO: animación HUD al mostrar el gate tras el login
      requestAnimationFrame(() => {
        document.getElementById("passwordGate")?.classList.add("hud-appear");
      });

      hide("appContent");
    })
    .catch((error) => {
      console.error("Error en login:", error);
      alert("Error al iniciar sesión: " + error.message);
    });
};

window.logout = () => {
  setSecondFactorOk(false);
  signOut(auth).finally(() => {
    show("loginContainer", "block");
    hide("appContent");
    hide("passwordGate");
    hide("logoutBtn");
    const emailText = document.getElementById("emailText");
    if (emailText) emailText.innerText = "";
  });
};

// ==================== 2º factor: verificación con feedback y redirección ====================
// Timer global para no apilar redirecciones
let redirectTimer = null;

window.verifyPassword = async () => {
  const input = document.getElementById("pwdInput");
  const error = document.getElementById("pwdError");
  if (!input) return;

  // Si había un temporizador previo, lo limpio
  if (redirectTimer) {
    clearInterval(redirectTimer.interval);
    clearTimeout(redirectTimer.timeout);
    redirectTimer = null;
  }

  const typed = input.value.trim();
  const typedHash = await sha256Hex(typed);

  if (typedHash === PASSWORD_HASH) {
    // OK → limpiar estados de error si los hubiera
    input.classList.remove("error", "shake");
    if (error) { error.style.display = "none"; error.textContent = ""; }

    // Mostrar app
    setSecondFactorOk(true);
    hide("passwordGate");
    show("appContent", "flex");
    show("logoutBtn", "inline-block");
  } else {
    // Incorrecta → feedback visual + cuenta regresiva + redirección a los 5s
    if (error) {
      error.style.display = "block";
      error.textContent = "❌ Contraseña incorrecta. Redirigiendo en 5…";
    }
    input.classList.add("error", "shake");
    setTimeout(() => input.classList.remove("shake"), 400);

    let seconds = 5;
    redirectTimer = {
      interval: setInterval(() => {
        seconds -= 1;
        if (error && seconds >= 0) {
          error.textContent = `❌ Contraseña incorrecta. Redirigiendo en ${seconds}…`;
        }
        if (seconds <= 0) {
          clearInterval(redirectTimer.interval);
        }
      }, 1000),
      timeout: setTimeout(async () => {
        setSecondFactorOk(false);
        try { await signOut(auth); } catch (_) {}
        location.replace("https://www.google.com/");
      }, 5000)
    };
  }
};

// Mantener sesión activa + gate
onAuthStateChanged(auth, (user) => {
  if (user) {
    const emailText = document.getElementById("emailText");
    if (emailText) emailText.innerText = user.email ?? "";

    if (isSecondFactorOk()) {
      // Ya pasó el 2FA en esta sesión
      hide("loginContainer");
      hide("passwordGate");
      show("appContent", "flex");
      show("logoutBtn", "inline-block");
    } else {
      // Falta contraseña
      hide("loginContainer");
      show("passwordGate", "flex");
      requestAnimationFrame(() => {
        document.getElementById("passwordGate").classList.add("hud-appear")
      });
      hide("appContent");
      show("logoutBtn", "inline-block"); // Ya está logueado con Google
    }
  } else {
    // No autenticado
    setSecondFactorOk(false);
    show("loginContainer", "block");
    hide("passwordGate");
    hide("appContent");
    hide("logoutBtn");
  }
});

// ==================== Funciones de UI (expuestas al window) ====================
window.showResponse = (falla) => {
  ocultarTodo();
  const respuestas = document.getElementById("respuestas");
  respuestas.style.display = "flex";
  void respuestas.offsetWidth;
  respuestas.classList.add("hud-appear");
  respuestas.innerHTML = `<button onclick="volverA('fallas')">← Volver</button><h2>${falla}</h2>`;

  if (typeof window.respuestasPorFalla !== "undefined" && window.respuestasPorFalla[falla]) {
    window.respuestasPorFalla[falla].forEach(([titulo, descripcion]) => {
      const btn = document.createElement("button");
      btn.textContent = titulo;
      btn.onclick = () => {
        respuestas.querySelectorAll(".response-box.dynamic").forEach(e => e.remove());
        const box = document.createElement("div");
        box.className = "response-box hud-appear dynamic";
        box.innerHTML = `➡ ${descripcion}`;
        respuestas.appendChild(box);
      };
      respuestas.appendChild(btn);
    });
  }
};

window.mostrarComoUsar = () => {
  ocultarTodo();
  const uso = document.getElementById("usoMenu");
  uso.style.display = "flex";
  requestAnimationFrame(() => uso.classList.add("hud-appear"));
};

window.mostrarFallas = () => {
  ocultarTodo();
  const fallas = document.getElementById("fallasMenu");
  fallas.style.display = "flex";
  document.getElementById("verdeMenu").style.display = "flex";
  document.getElementById("moradoMenu").style.display = "flex";
  document.getElementById("blancoMenu").style.display = "flex";
  document.getElementById("celesteMenu").style.display = "flex";
  requestAnimationFrame(() => fallas.classList.add("hud-appear"));
};

window.mostrarCodigos = () => {
  ocultarTodo();
  const codigos = document.getElementById("codigosMenu");
  codigos.style.display = "flex";
  requestAnimationFrame(() => codigos.classList.add("hud-appear"));
};

window.mostrarContacto = () => {
  ocultarTodo();
  const contacto = document.getElementById("contactoMenu");
  contacto.style.display = "flex";
  requestAnimationFrame(() => contacto.classList.add("hud-appear"));
};

window.volverA = (seccion) => {
  ocultarTodo();
  const destino = seccion === "main" ? "mainMenu" : "fallasMenu";
  const menu = document.getElementById(destino);
  menu.style.display = "flex";
  requestAnimationFrame(() => menu.classList.add("hud-appear"));
};

window.toggleTheme = () => {
  document.body.classList.toggle("light-mode");
};

window.goToHome = () => {
  window.volverA("main");
  document.getElementById("mainMenu").style.display = "flex";
};

function ocultarTodo() {
  [
    "mainMenu", "usoMenu", "fallasMenu", "codigosMenu",
    "moradoMenu", "verdeMenu", "celesteMenu", "blancoMenu",
    "respuestas", "contactoMenu"
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
  const resp = document.getElementById("respuestas");
  if (resp) resp.innerHTML = "";
}

// ==================== Preloader ====================
const preloader = document.getElementById("preloader");
const fill = document.getElementById("progressFill");
const percentText = document.getElementById("percentage");
const smoothProgress = [1, 5, 10, 20, 35, 50, 65, 80, 90, 100];
let index = 0;

window.onload = () => setTimeout(updateProgress, 200);

function updateProgress() {
  if (index < smoothProgress.length) {
    const value = smoothProgress[index];
    if (fill) fill.style.width = value + "%";
    if (percentText) percentText.textContent = value + "%";
    index++;
    setTimeout(updateProgress, 100);
  } else {
    percentText?.classList.add("flash");
    fill?.classList.add("flash");
    setTimeout(() => {
      if (preloader) preloader.style.display = "none";
      const appContent = document.getElementById("appContent");
      appContent?.classList.add("hud-appear");
    }, 500);
  }
}

// ==================== Restricciones ====================
document.addEventListener("contextmenu", event => event.preventDefault());

// ==================== Limpieza de error al tipear (2FA) ====================
document.getElementById("pwdInput")?.addEventListener("input", () => {
  const input = document.getElementById("pwdInput");
  const error = document.getElementById("pwdError");
  input?.classList.remove("error", "shake");
  if (error) { error.style.display = "none"; error.textContent = ""; }
});

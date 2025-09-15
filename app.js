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

// ==================== Login / Logout ====================
window.login = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      document.getElementById("emailText").innerText = user.email ?? "";
      document.getElementById("logoutBtn").style.display = "inline-block";
      document.getElementById("loginContainer").style.display = "none";
      document.getElementById("appContent").style.display = "flex";
    })
    .catch((error) => {
      console.error("Error en login:", error);
      alert("Error al iniciar sesión: " + error.message);
    });
};

window.logout = () => {
  signOut(auth).then(() => {
    document.getElementById("loginContainer").style.display = "block";
    document.getElementById("appContent").style.display = "none";
    document.getElementById("logoutBtn").style.display = "none";
    document.getElementById("emailText").innerText = "";
  });
};

// Mantener sesión activa
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("emailText").innerText = user.email ?? "";
    document.getElementById("logoutBtn").style.display = "inline-block";
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("appContent").style.display = "flex";
  }
});

// ==================== Funciones de UI (expuestas al window) ====================
window.showResponse = (falla) => {
  ocultarTodo();
  const respuestas = document.getElementById("respuestas");
  respuestas.style.display = "flex";
  void respuestas.offsetWidth; // forzar reflow
  respuestas.classList.add("hud-appear");
  respuestas.innerHTML = `<button onclick="volverA('fallas')">← Volver</button><h2>${falla}</h2>`;

  // Esta variable no está en el HTML que pasaste. Evito errores si no existe.
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

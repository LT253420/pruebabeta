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

// Verificación de 2º factor
window.verifyPassword = async () => {
  const input = document.getElementById("pwdInput");
  const error = document.getElementById("pwdError");
  if (!input) return;

  const typed = input.value.trim();
  const typedHash = await sha256Hex(typed);

  if (typedHash === PASSWORD_HASH) {
    // OK → mostrar app
    setSecondFactorOk(true);
    hide("passwordGate");
    show("appContent", "flex");
    show("logoutBtn", "inline-block");
  } else {
    // Incorrecta → cerrar sesión y saca

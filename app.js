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
const PASSWORD_HASH = "7a92c8b_

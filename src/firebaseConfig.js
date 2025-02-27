// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAS3GytNUd8beilFimU8JSn3wonw84YJVY",
  authDomain: "ppg-iot.firebaseapp.com",
  databaseURL: "https://ppg-iot-default-rtdb.firebaseio.com",
  projectId: "ppg-iot",
  storageBucket: "ppg-iot.firebasestorage.app",
  messagingSenderId: "262937852815",
  appId: "1:262937852815:web:d9623b9b8f8b3acb72e9fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database }; // 🔥 Asegúrate de exportar correctamente

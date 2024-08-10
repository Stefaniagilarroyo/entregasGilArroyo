import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCjihLxl7oi85XUBnGUhKXnBaqjGUIIE0I",
  authDomain: "coderstef.firebaseapp.com",
  projectId: "coderstef",
  storageBucket: "coderstef.appspot.com",
  messagingSenderId: "506744336430",
  appId: "1:506744336430:web:5a1fa115e4d5e7ab62afbf",
  measurementId: "G-HTS62G9RF1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const storage = getStorage(app);

export const getImageUrl = async (imagePath) => {
  const imageRef = ref(storage, imagePath);
  try {
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error al obtener la URL de la imagen:", error);
    return null;
  }
};

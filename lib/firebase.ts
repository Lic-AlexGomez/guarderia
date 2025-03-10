"use client"

import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getStorage, type FirebaseStorage } from "firebase/storage"
import { getAuth, type Auth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxhvBM632Im03UcSWnXBqkoAVq54hYbQI",
  authDomain: "daycare-6e8c4.firebaseapp.com",
  projectId: "daycare-6e8c4",
  storageBucket: "daycare-6e8c4.appspot.com", // Corregido el dominio del storage
  messagingSenderId: "467551701061",
  appId: "1:467551701061:web:e870895d776f4562e97b2c",
  measurementId: "G-CMJLDJR0M4",
}

// Initialize Firebase
let firebaseApp: FirebaseApp | undefined
let firestoreDb: Firestore | undefined
let firebaseStorage: FirebaseStorage | undefined
let firebaseAuth: Auth | undefined

// Check if we're in the browser environment
if (typeof window !== "undefined") {
  try {
    if (!getApps().length) {
      firebaseApp = initializeApp(firebaseConfig)
    } else {
      firebaseApp = getApps()[0]
    }

    firestoreDb = getFirestore(firebaseApp)
    firebaseStorage = getStorage(firebaseApp)
    firebaseAuth = getAuth(firebaseApp)
  } catch (error) {
    console.error("Firebase initialization error:", error)
  }
}

export const app = firebaseApp
export const db = firestoreDb
export const storage = firebaseStorage
export const auth = firebaseAuth


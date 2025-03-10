"use client"

import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, serverTimestamp } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { db, storage } from "./firebase"
import type { Activity, StaffMember, Program, MenuItem, GalleryImage } from "./types"
import { activities, staffMembers, programs, menuItems, galleryImages } from "./data"

// Collection names
const COLLECTIONS = {
  ACTIVITIES: "activities",
  STAFF: "staff",
  PROGRAMS: "programs",
  MENU: "menu",
  GALLERY: "gallery",
  DAYCARE_INFO: "daycareInfo",
}

// Initialize the database with sample data
export async function initializeDatabase() {
  try {
    if (!db) {
      throw new Error("Firestore is not initialized")
    }

    // Check if data already exists
    const activitiesSnapshot = await getDocs(collection(db, COLLECTIONS.ACTIVITIES))
    if (activitiesSnapshot.empty) {
      // Add activities
      for (const activity of activities) {
        await addDoc(collection(db, COLLECTIONS.ACTIVITIES), {
          ...activity,
          createdAt: serverTimestamp(),
        })
      }
      console.log("Activities initialized")
    }

    // Check if staff data exists
    const staffSnapshot = await getDocs(collection(db, COLLECTIONS.STAFF))
    if (staffSnapshot.empty) {
      // Add staff members
      for (const staff of staffMembers) {
        await addDoc(collection(db, COLLECTIONS.STAFF), {
          ...staff,
          createdAt: serverTimestamp(),
        })
      }
      console.log("Staff initialized")
    }

    // Check if programs data exists
    const programsSnapshot = await getDocs(collection(db, COLLECTIONS.PROGRAMS))
    if (programsSnapshot.empty) {
      // Add programs
      for (const program of programs) {
        await addDoc(collection(db, COLLECTIONS.PROGRAMS), {
          ...program,
          createdAt: serverTimestamp(),
        })
      }
      console.log("Programs initialized")
    }

    // Check if menu data exists
    const menuSnapshot = await getDocs(collection(db, COLLECTIONS.MENU))
    if (menuSnapshot.empty) {
      // Add menu items
      for (const menuItem of menuItems) {
        await addDoc(collection(db, COLLECTIONS.MENU), {
          ...menuItem,
          createdAt: serverTimestamp(),
        })
      }
      console.log("Menu initialized")
    }

    // Check if gallery data exists
    const gallerySnapshot = await getDocs(collection(db, COLLECTIONS.GALLERY))
    if (gallerySnapshot.empty) {
      // Add gallery images
      for (const image of galleryImages) {
        await addDoc(collection(db, COLLECTIONS.GALLERY), {
          ...image,
          createdAt: serverTimestamp(),
        })
      }
      console.log("Gallery initialized")
    }

    return { success: true, message: "Database initialized successfully" }
  } catch (error) {
    console.error("Error initializing database:", error)
    return { success: false, message: error instanceof Error ? error.message : "Failed to initialize database" }
  }
}

// Activities
export async function getActivities() {
  if (!db) {
    console.warn("Firestore not initialized, returning mock data")
    return activities
  }

  try {
    const activitiesSnapshot = await getDocs(collection(db, COLLECTIONS.ACTIVITIES))
    return activitiesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Activity[]
  } catch (error) {
    console.error("Error fetching activities:", error)
    return activities // Fallback to mock data
  }
}

export async function addActivity(activity: Omit<Activity, "id">) {
  if (!db) throw new Error("Firestore is not initialized")

  const docRef = await addDoc(collection(db, COLLECTIONS.ACTIVITIES), {
    ...activity,
    createdAt: serverTimestamp(),
  })
  return { id: docRef.id, ...activity } as Activity
}

export async function updateActivity(id: string, activity: Partial<Activity>) {
  if (!db) throw new Error("Firestore is not initialized")

  const activityRef = doc(db, COLLECTIONS.ACTIVITIES, id)
  await updateDoc(activityRef, {
    ...activity,
    updatedAt: serverTimestamp(),
  })
  return { id, ...activity }
}

export async function deleteActivity(id: string) {
  if (!db) throw new Error("Firestore is not initialized")

  await deleteDoc(doc(db, COLLECTIONS.ACTIVITIES, id))
  return { success: true }
}

// Staff
export async function getStaff() {
  if (!db) {
    console.warn("Firestore not initialized, returning mock data")
    return staffMembers
  }

  try {
    const staffSnapshot = await getDocs(collection(db, COLLECTIONS.STAFF))
    return staffSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as StaffMember[]
  } catch (error) {
    console.error("Error fetching staff:", error)
    return staffMembers // Fallback to mock data
  }
}

export async function addStaffMember(staff: Omit<StaffMember, "id">) {
  if (!db) throw new Error("Firestore is not initialized")

  const docRef = await addDoc(collection(db, COLLECTIONS.STAFF), {
    ...staff,
    createdAt: serverTimestamp(),
  })
  return { id: docRef.id, ...staff } as StaffMember
}

export async function updateStaffMember(id: string, staff: Partial<StaffMember>) {
  if (!db) throw new Error("Firestore is not initialized")

  const staffRef = doc(db, COLLECTIONS.STAFF, id)
  await updateDoc(staffRef, {
    ...staff,
    updatedAt: serverTimestamp(),
  })
  return { id, ...staff }
}

export async function deleteStaffMember(id: string) {
  if (!db) throw new Error("Firestore is not initialized")

  await deleteDoc(doc(db, COLLECTIONS.STAFF, id))
  return { success: true }
}

// Programs
export async function getPrograms() {
  if (!db) {
    console.warn("Firestore not initialized, returning mock data")
    return programs
  }

  try {
    const programsSnapshot = await getDocs(collection(db, COLLECTIONS.PROGRAMS))
    return programsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Program[]
  } catch (error) {
    console.error("Error fetching programs:", error)
    return programs // Fallback to mock data
  }
}

export async function addProgram(program: Omit<Program, "id">) {
  if (!db) throw new Error("Firestore is not initialized")

  const docRef = await addDoc(collection(db, COLLECTIONS.PROGRAMS), {
    ...program,
    createdAt: serverTimestamp(),
  })
  return { id: docRef.id, ...program } as Program
}

export async function updateProgram(id: string, program: Partial<Program>) {
  if (!db) throw new Error("Firestore is not initialized")

  const programRef = doc(db, COLLECTIONS.PROGRAMS, id)
  await updateDoc(programRef, {
    ...program,
    updatedAt: serverTimestamp(),
  })
  return { id, ...program }
}

export async function deleteProgram(id: string) {
  if (!db) throw new Error("Firestore is not initialized")

  await deleteDoc(doc(db, COLLECTIONS.PROGRAMS, id))
  return { success: true }
}

// Menu
export async function getMenu() {
  if (!db) {
    console.warn("Firestore not initialized, returning mock data")
    return menuItems
  }

  try {
    const menuSnapshot = await getDocs(collection(db, COLLECTIONS.MENU))
    return menuSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as MenuItem[]
  } catch (error) {
    console.error("Error fetching menu:", error)
    return menuItems // Fallback to mock data
  }
}

export async function updateMenuItem(id: string, menuItem: Partial<MenuItem>) {
  if (!db) throw new Error("Firestore is not initialized")

  const menuRef = doc(db, COLLECTIONS.MENU, id)
  await updateDoc(menuRef, {
    ...menuItem,
    updatedAt: serverTimestamp(),
  })
  return { id, ...menuItem }
}

// Gallery
export async function getGallery() {
  if (!db) {
    console.warn("Firestore not initialized, returning mock data")
    return galleryImages
  }

  try {
    const gallerySnapshot = await getDocs(collection(db, COLLECTIONS.GALLERY))
    return gallerySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as GalleryImage[]
  } catch (error) {
    console.error("Error fetching gallery:", error)
    return galleryImages // Fallback to mock data
  }
}

export async function addGalleryImage(image: Omit<GalleryImage, "id" | "uploadedAt">) {
  if (!db) throw new Error("Firestore is not initialized")

  const docRef = await addDoc(collection(db, COLLECTIONS.GALLERY), {
    ...image,
    uploadedAt: new Date().toISOString(),
    createdAt: serverTimestamp(),
  })
  return {
    id: docRef.id,
    ...image,
    uploadedAt: new Date().toISOString(),
  } as GalleryImage
}

export async function deleteGalleryImage(id: string, imageUrl: string) {
  if (!db || !storage) throw new Error("Firebase is not initialized")

  // Delete from Firestore
  await deleteDoc(doc(db, COLLECTIONS.GALLERY, id))

  // If the image is stored in Firebase Storage, delete it too
  if (imageUrl && !imageUrl.includes("placeholder.svg")) {
    try {
      const imageRef = ref(storage, imageUrl)
      await deleteObject(imageRef)
    } catch (error) {
      console.error("Error deleting image from storage:", error)
    }
  }

  return { success: true }
}

// Upload image to Firebase Storage
export async function uploadImage(file: File, path = "gallery") {
  if (!storage) throw new Error("Firebase Storage is not initialized")

  const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`)
  const snapshot = await uploadBytes(storageRef, file)
  const url = await getDownloadURL(snapshot.ref)
  return { url, path: snapshot.ref.fullPath }
}


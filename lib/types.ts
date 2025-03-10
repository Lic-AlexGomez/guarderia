export interface Activity {
  id: string
  name: string
  description: string
  ageGroup: string
  duration: string
  materials: string[]
  image?: string
}

export interface StaffMember {
  id: string
  name: string
  position: string
  bio: string
  image?: string
  qualifications: string[]
  startDate: string
}

export interface Program {
  id: string
  name: string
  ageRange: string
  description: string
  schedule: string
  capacity: number
  tuition: string
  features: string[]
  image?: string
}

export interface MenuItem {
  id: string
  day: string
  breakfast: string
  lunch: string
  snack: string
  allergies?: string[]
}

export interface GalleryImage {
  id: string
  url: string
  title?: string
  description?: string
  uploadedAt: string
}

export interface Staff extends StaffMember {}

export interface Menu extends MenuItem {}


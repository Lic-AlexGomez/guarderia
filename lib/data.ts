import type { Activity, StaffMember, Program, MenuItem, GalleryImage } from "./types"

export const activities: Activity[] = [
  {
    id: "1",
    name: "Sensory Play with Water",
    description:
      "Children explore water with various tools and containers to develop sensory skills and understand basic scientific concepts.",
    ageGroup: "Toddlers (1-2 years)",
    duration: "30 minutes",
    materials: ["Water table", "Cups", "Funnels", "Sponges", "Waterproof toys"],
    image: "/placeholder.svg?height=300&width=400&text=Water+Play",
  },
  {
    id: "2",
    name: "Story Time & Puppet Show",
    description: "Interactive storytelling with puppets to enhance language development and imagination.",
    ageGroup: "Preschool (3-5 years)",
    duration: "45 minutes",
    materials: ["Children's books", "Puppets", "Felt board", "Props"],
    image: "/placeholder.svg?height=300&width=400&text=Story+Time",
  },
  {
    id: "3",
    name: "Nature Scavenger Hunt",
    description:
      "Outdoor exploration activity where children search for natural items like leaves, rocks, and flowers.",
    ageGroup: "All ages",
    duration: "1 hour",
    materials: ["Collection bags", "Magnifying glasses", "Scavenger hunt lists", "Clipboards"],
    image: "/placeholder.svg?height=300&width=400&text=Scavenger+Hunt",
  },
  {
    id: "4",
    name: "Music & Movement",
    description:
      "Children express themselves through dance, songs, and musical instruments to develop gross motor skills and rhythm.",
    ageGroup: "All ages",
    duration: "40 minutes",
    materials: ["Musical instruments", "Scarves", "Rhythm sticks", "Music player"],
    image: "/placeholder.svg?height=300&width=400&text=Music+Time",
  },
  {
    id: "5",
    name: "Art Exploration: Finger Painting",
    description: "Creative expression through finger painting to develop fine motor skills and sensory exploration.",
    ageGroup: "Toddlers & Preschool",
    duration: "45 minutes",
    materials: ["Finger paint", "Paper", "Smocks", "Wet wipes"],
    image: "/placeholder.svg?height=300&width=400&text=Finger+Painting",
  },
]

export const staffMembers: StaffMember[] = [
  {
    id: "1",
    name: "Laly Rodriguez",
    position: "Owner & Director",
    bio: "With over 15 years of experience in early childhood education, Laly founded the daycare with a vision to create a nurturing environment where children can thrive.",
    qualifications: [
      "Early Childhood Education Degree",
      "CPR & First Aid Certified",
      "Child Development Associate (CDA)",
    ],
    startDate: "2010-03-15",
    image: "/placeholder.svg?height=300&width=300&text=Laly",
  },
  {
    id: "2",
    name: "Maria Gonzalez",
    position: "Lead Teacher",
    bio: "Maria specializes in preschool education and brings creativity and enthusiasm to the classroom every day.",
    qualifications: ["Bachelor's in Education", "Bilingual (English/Spanish)", "CPR & First Aid Certified"],
    startDate: "2015-08-10",
    image: "/placeholder.svg?height=300&width=300&text=Maria",
  },
  {
    id: "3",
    name: "James Wilson",
    position: "Assistant Teacher",
    bio: "James is passionate about early childhood development and creates engaging activities that help children learn through play.",
    qualifications: ["Associate's in Child Development", "CPR & First Aid Certified"],
    startDate: "2018-05-22",
    image: "/placeholder.svg?height=300&width=300&text=James",
  },
]

// Explicitly export staff as staffMembers
export const staff = staffMembers

export const programs: Program[] = [
  {
    id: "1",
    name: "Infant Care",
    ageRange: "6 weeks - 12 months",
    description:
      "Our infant program provides a nurturing and stimulating environment for babies to explore and develop. We focus on sensory experiences, motor skills, and language development.",
    schedule: "Monday-Friday, 7:00 AM - 6:00 PM",
    capacity: 8,
    tuition: "$350/week",
    features: [
      "Low child-to-caregiver ratio (3:1)",
      "Daily reports",
      "Personalized care plans",
      "Tummy time",
      "Sensory activities",
    ],
    image: "/placeholder.svg?height=300&width=400&text=Infant+Care",
  },
  {
    id: "2",
    name: "Toddler Program",
    ageRange: "1-2 years",
    description:
      "Our toddler program encourages independence, social skills, and language development through play-based learning and structured activities.",
    schedule: "Monday-Friday, 7:00 AM - 6:00 PM",
    capacity: 12,
    tuition: "$325/week",
    features: ["Potty training support", "Language development", "Social skills", "Creative arts", "Outdoor play"],
    image: "/placeholder.svg?height=300&width=400&text=Toddler+Program",
  },
  {
    id: "3",
    name: "Preschool",
    ageRange: "3-5 years",
    description:
      "Our preschool program prepares children for kindergarten through a balanced curriculum that includes pre-reading, math concepts, science exploration, and social studies.",
    schedule: "Monday-Friday, 7:00 AM - 6:00 PM",
    capacity: 16,
    tuition: "$300/week",
    features: [
      "Kindergarten readiness",
      "STEAM activities",
      "Field trips",
      "Spanish language introduction",
      "Physical education",
    ],
    image: "/placeholder.svg?height=300&width=400&text=Preschool",
  },
  {
    id: "4",
    name: "School Age Program",
    ageRange: "6-12 years",
    description:
      "Our before and after school program provides a safe and enriching environment for school-age children with homework help, recreational activities, and special projects.",
    schedule: "Monday-Friday, 7:00-9:00 AM & 3:00-6:00 PM",
    capacity: 20,
    tuition: "$175/week",
    features: ["Homework assistance", "STEM projects", "Arts & crafts", "Team sports", "Cooking activities"],
    image: "/placeholder.svg?height=300&width=400&text=School+Age",
  },
]

export const menuItems: MenuItem[] = [
  {
    id: "1",
    day: "Monday",
    breakfast: "Whole grain cereal with milk, banana slices",
    lunch: "Baked chicken, brown rice, steamed broccoli, apple slices",
    snack: "Yogurt with granola, fresh berries",
    allergies: ["Dairy-free options available", "Gluten-free options available"],
  },
  {
    id: "2",
    day: "Tuesday",
    breakfast: "Oatmeal with cinnamon and apple, milk",
    lunch: "Bean and cheese quesadillas, corn, mixed green salad, orange slices",
    snack: "Hummus with veggie sticks, whole grain crackers",
    allergies: ["Dairy-free options available"],
  },
  {
    id: "3",
    day: "Wednesday",
    breakfast: "Scrambled eggs, whole wheat toast, fruit cup",
    lunch: "Turkey and cheese sandwiches, carrot sticks, cucumber slices, pear",
    snack: "Banana bread, milk",
    allergies: ["Gluten-free options available", "Egg-free options available"],
  },
  {
    id: "4",
    day: "Thursday",
    breakfast: "Yogurt parfait with granola and berries",
    lunch: "Pasta with tomato sauce, turkey meatballs, green beans, melon",
    snack: "Cheese cubes, apple slices, whole grain crackers",
    allergies: ["Gluten-free pasta available", "Dairy-free options available"],
  },
  {
    id: "5",
    day: "Friday",
    breakfast: "Whole grain pancakes, fruit compote, milk",
    lunch: "Fish sticks, sweet potato fries, peas, banana",
    snack: "Trail mix (no nuts), dried fruit",
    allergies: ["Fish-free options available", "Gluten-free options available"],
  },
]

// Explicitly export weeklyMenu as menuItems
export const weeklyMenu = menuItems

export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    url: "/placeholder.svg?height=400&width=600&text=Art+Activity",
    title: "Art Activity",
    description: "Children enjoying finger painting during art time",
    uploadedAt: "2023-05-15",
  },
  {
    id: "2",
    url: "/placeholder.svg?height=400&width=600&text=Outdoor+Play",
    title: "Outdoor Play",
    description: "Fun at the playground during outdoor time",
    uploadedAt: "2023-06-22",
  },
  {
    id: "3",
    url: "/placeholder.svg?height=400&width=600&text=Story+Time",
    title: "Story Time",
    description: "Group story time with our favorite books",
    uploadedAt: "2023-07-10",
  },
  {
    id: "4",
    url: "/placeholder.svg?height=400&width=600&text=Graduation+Day",
    title: "Graduation Day",
    description: "Preschool graduation celebration",
    uploadedAt: "2023-05-30",
  },
]

// Add any other data structures that might be needed
export const daycareInfo = {
  license: "Licensed by the NYS Dept. of Health",
  capacity: 50,
  hours: {
    open: "7:30 AM",
    close: "6:00 PM",
  },
  acceptedPayments: [
    "ACS (Administration for Children's Services)",
    "HRA (Human Resources Administration)",
    "ACD (Agency for Child Development)",
    "Private Pay",
  ],
  services: [
    "Nutritious meals & snacks",
    "Learning activities",
    "Storytelling",
    "Potty training",
    "Arts & craft",
    "Outdoor play",
    "Nap time",
    "Educational programs",
  ],
  transportation: {
    available: true,
    areas: ["Bronx", "Upper Manhattan"],
    schedule: "School pick up & drop off available",
  },
}


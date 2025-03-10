"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ChevronRight,
  Clock,
  MapPin,
  Bus,
  Phone,
  Mail,
  Heart,
  Shield,
  BookOpen,
  Users,
  Menu,
  X,
  ImageIcon,
  Settings,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

export default function DaycareWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [language, setLanguage] = useState("es") // Default language is Spanish
  const [isAdmin, setIsAdmin] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  })

  // Translations object with all text content in both languages
  const translations = {
    en: {
      // Navigation
      nav: {
        home: "Home",
        programs: "Programs",
        staff: "Staff",
        safety: "Safety",
        gallery: "Gallery",
        about: "About Us",
        contact: "Contact",
        scheduleVisit: "Schedule a Visit",
        admin: "Admin",
      },
      // Info Bar
      infoBar: {
        location: "Bronx, New York",
        hours: "Hours: 7:30 am - 6:00 pm",
        transport: "Transportation available (Pick-up & Drop-off)",
      },
      // Hero Section
      hero: {
        title: "A safe and fun place for your child's development",
        description:
          "At Incredible Laly Daycare, we are dedicated to providing a welcoming, safe, and stimulating environment where children can learn, grow, and develop. Our approach focuses on learning through play and exploration, fostering each child's natural curiosity.",
        scheduleVisit: "Schedule a Visit",
        explorePrograms: "Explore Programs",
        quote: "We create an environment where children feel safe, loved, and motivated to learn.",
      },
      // Programs Section
      programs: {
        title: "Our Programs",
        description:
          "We offer specialized programs for each stage of child development, tailored to the specific needs of each age group.",
        infants: {
          title: "Infants",
          age: "6 weeks - 17 months",
          description: "Personalized care and early stimulation for babies, with sensory and motor activities.",
        },
        toddlers: {
          title: "Toddlers",
          age: "18 months - 23 months",
          description: "Activities that promote independence, language, and basic social skills.",
        },
        preschoolers: {
          title: "Preschoolers",
          age: "2 - 4 years",
          description: "Complete preschool program with a focus on literacy, mathematics, and social skills.",
        },
        schoolAge: {
          title: "School-Age",
          age: "5 - 12 years",
          description: "After-school program with homework help, recreational activities, and educational projects.",
        },
      },
      // Staff Section
      staff: {
        title: "Our Staff",
        description:
          "We have a team of certified professionals passionate about child development, who receive continuous training to provide the best care.",
        certifications: {
          title: "Certifications",
          items: [
            "First Aid and CPR Certification",
            "State childcare license",
            "Early childhood development training",
            "Safety and prevention certification",
          ],
        },
        dedicatedTeam: {
          title: "Dedicated Team",
          description:
            "Our staff is committed to the well-being and development of each child, creating meaningful bonds and an environment of trust.",
        },
        continuousTraining: {
          title: "Continuous Training",
          items: [
            "Monthly professional development workshops",
            "Constant updating in pedagogical methods",
            "Training in inclusion and diversity",
            "Positive discipline techniques",
          ],
        },
      },
      // Safety Section
      safety: {
        title: "Safety and Policies",
        description:
          "Children's safety is our number one priority. We implement strict policies and a positive discipline approach.",
        measures: {
          title: "Safety Measures",
          items: [
            "Controlled access with door security system",
            "Surveillance cameras in all areas",
            "Regular safety inspections",
            "Monthly emergency drills",
            "Background checks for all staff",
            "Strict protocols for child pickup",
          ],
        },
        discipline: {
          title: "Positive Discipline",
          description:
            "We believe in a positive discipline approach that promotes self-control, empathy, and social skills. Our strategies include:",
          items: [
            "Positive reinforcement and recognition of good behavior",
            "Establishment of clear and consistent boundaries",
            "Respectful communication and active listening",
            "Conflict resolution through dialogue",
            "Teaching social and emotional skills",
            "Close collaboration with families",
          ],
        },
      },
      // Gallery Section
      gallery: {
        title: "Photo Gallery",
        description: "Take a look at our facilities and the activities our children enjoy every day.",
        categories: {
          facilities: "Facilities",
          activities: "Activities",
          events: "Special Events",
          playground: "Playground",
        },
      },
      // About Us Section
      about: {
        title: "About Laly's Family Group Daycare",
        mission: {
          title: "Our Mission",
          description:
            "To provide a nurturing, educational environment where children can develop socially, emotionally, physically, and intellectually at their own pace.",
        },
        vision: {
          title: "Our Vision",
          description:
            "To be recognized as a leading childcare provider that prepares children for future academic success while fostering creativity, independence, and a love for learning.",
        },
        values: {
          title: "Our Values",
          items: [
            "Safety and security above all",
            "Respect for each child's individuality",
            "Inclusive and diverse environment",
            "Partnership with families",
            "Continuous improvement and innovation",
            "Commitment to excellence in early childhood education",
          ],
        },
        history: {
          title: "Our History",
          description:
            "Founded in 2010, Laly's Family Group Daycare began with a simple mission: to create a home-like environment where children could thrive. Over the years, we have grown and evolved, but our commitment to providing exceptional care has remained constant.",
        },
      },
      // Contact Section
      contact: {
        title: "Contact Us",
        description:
          "We invite you to visit our daycare and meet our staff. We would be delighted to show you our facilities and answer all your questions.",
        info: {
          title: "Contact Information",
          address: "Address",
          phone: "Phone",
          email: "Email",
          hours: "Hours",
          hoursValue: "Monday to Friday: 7:30 am - 6:00 pm",
        },
        form: {
          title: "Schedule a Visit",
          name: "Name",
          namePlaceholder: "Your name",
          phone: "Phone",
          phonePlaceholder: "Your phone",
          email: "Email",
          emailPlaceholder: "Your email",
          message: "Message",
          messagePlaceholder: "How can we help you?",
          send: "Send Message",
        },
        map: {
          title: "Our Location",
          viewLarger: "View Larger Map",
        },
      },
      // CTA Section
      cta: {
        title: "Ready to give your child an incredible place to grow?",
        description: "Schedule a visit today and discover why families choose Incredible Laly Daycare.",
        button: "Schedule a Visit Now",
      },
      // Footer
      footer: {
        description: "A safe and fun place for your child's development.",
        quickLinks: "Quick Links",
        hours: "Hours",
        hoursValue: "Monday to Friday: 7:30 am - 6:00 pm",
        closed: "Saturday and Sunday: Closed",
        transport: "Transportation available for pickup and delivery of children in selected areas.",
        rights: "All rights reserved.",
      },
      // Admin
      admin: {
        login: {
          title: "Admin Login",
          username: "Username",
          password: "Password",
          button: "Login",
          error: "Invalid username or password",
        },
        dashboard: {
          title: "Admin Dashboard",
          welcome: "Welcome to the admin dashboard",
          content: "Content Management",
          settings: "Settings",
          logout: "Logout",
        },
        sections: {
          general: "General Information",
          programs: "Programs",
          staff: "Staff",
          gallery: "Gallery",
          contact: "Contact Information",
        },
      },
    },
    es: {
      // Navegación
      nav: {
        home: "Inicio",
        programs: "Programas",
        staff: "Personal",
        safety: "Seguridad",
        gallery: "Galería",
        about: "Nosotros",
        contact: "Contacto",
        scheduleVisit: "Agendar Visita",
        admin: "Admin",
      },
      // Barra de información
      infoBar: {
        location: "Bronx, New York",
        hours: "Horario: 7:30 am - 6:00 pm",
        transport: "Transporte disponible (Pick-up & Drop-off)",
      },
      // Sección Hero
      hero: {
        title: "Un lugar seguro y divertido para el desarrollo de tu pequeño",
        description:
          "En Incredible Laly Daycare nos dedicamos a proporcionar un ambiente acogedor, seguro y estimulante donde los niños pueden aprender, crecer y desarrollarse. Nuestro enfoque se centra en el aprendizaje a través del juego y la exploración, fomentando la curiosidad natural de cada niño.",
        scheduleVisit: "Agendar una Visita",
        explorePrograms: "Explorar Programas",
        quote: "Creamos un ambiente donde los niños se sienten seguros, amados y motivados para aprender.",
      },
      // Sección Programas
      programs: {
        title: "Nuestros Programas",
        description:
          "Ofrecemos programas especializados para cada etapa del desarrollo infantil, adaptados a las necesidades específicas de cada grupo de edad.",
        infants: {
          title: "Infants",
          age: "6 semanas - 17 meses",
          description:
            "Cuidado personalizado y estimulación temprana para bebés, con actividades sensoriales y motoras.",
        },
        toddlers: {
          title: "Toddlers",
          age: "18 meses - 23 meses",
          description: "Actividades que fomentan la independencia, el lenguaje y las habilidades sociales básicas.",
        },
        preschoolers: {
          title: "Preschoolers",
          age: "2 - 4 años",
          description:
            "Programa preescolar completo con enfoque en alfabetización, matemáticas y habilidades sociales.",
        },
        schoolAge: {
          title: "School-Age",
          age: "5 - 12 años",
          description:
            "Programa después de la escuela con ayuda en tareas, actividades recreativas y proyectos educativos.",
        },
      },
      // Sección Personal
      staff: {
        title: "Nuestro Personal",
        description:
          "Contamos con un equipo de profesionales certificados y apasionados por el desarrollo infantil, que reciben capacitación continua para ofrecer el mejor cuidado.",
        certifications: {
          title: "Certificaciones",
          items: [
            "Certificación en Primeros Auxilios y RCP",
            "Licencia estatal de cuidado infantil",
            "Formación en desarrollo infantil temprano",
            "Certificación en seguridad y prevención",
          ],
        },
        dedicatedTeam: {
          title: "Equipo Dedicado",
          description:
            "Nuestro personal está comprometido con el bienestar y desarrollo de cada niño, creando vínculos significativos y un ambiente de confianza.",
        },
        continuousTraining: {
          title: "Capacitación Continua",
          items: [
            "Talleres mensuales de desarrollo profesional",
            "Actualización constante en métodos pedagógicos",
            "Formación en inclusión y diversidad",
            "Técnicas de disciplina positiva",
          ],
        },
      },
      // Sección Seguridad
      safety: {
        title: "Seguridad y Políticas",
        description:
          "La seguridad de los niños es nuestra prioridad número uno. Implementamos políticas estrictas y un enfoque de disciplina positiva.",
        measures: {
          title: "Medidas de Seguridad",
          items: [
            "Acceso controlado con sistema de seguridad en puertas",
            "Cámaras de vigilancia en todas las áreas",
            "Inspecciones regulares de seguridad",
            "Simulacros de emergencia mensuales",
            "Verificación de antecedentes de todo el personal",
            "Protocolos estrictos para la entrega de niños",
          ],
        },
        discipline: {
          title: "Disciplina Positiva",
          description:
            "Creemos en un enfoque de disciplina positiva que fomenta el autocontrol, la empatía y las habilidades sociales. Nuestras estrategias incluyen:",
          items: [
            "Refuerzo positivo y reconocimiento del buen comportamiento",
            "Establecimiento de límites claros y consistentes",
            "Comunicación respetuosa y escucha activa",
            "Resolución de conflictos a través del diálogo",
            "Enseñanza de habilidades sociales y emocionales",
            "Colaboración estrecha con las familias",
          ],
        },
      },
      // Sección Galería
      gallery: {
        title: "Galería de Fotos",
        description:
          "Echa un vistazo a nuestras instalaciones y las actividades que nuestros niños disfrutan cada día.",
        categories: {
          facilities: "Instalaciones",
          activities: "Actividades",
          events: "Eventos Especiales",
          playground: "Área de Juegos",
        },
      },
      // Sección Acerca de Nosotros
      about: {
        title: "Acerca de Laly's Family Group Daycare",
        mission: {
          title: "Nuestra Misión",
          description:
            "Proporcionar un ambiente educativo y acogedor donde los niños puedan desarrollarse social, emocional, física e intelectualmente a su propio ritmo.",
        },
        vision: {
          title: "Nuestra Visión",
          description:
            "Ser reconocidos como un proveedor líder de cuidado infantil que prepara a los niños para el éxito académico futuro mientras fomenta la creatividad, la independencia y el amor por el aprendizaje.",
        },
        values: {
          title: "Nuestros Valores",
          items: [
            "Seguridad y protección ante todo",
            "Respeto por la individualidad de cada niño",
            "Ambiente inclusivo y diverso",
            "Colaboración con las familias",
            "Mejora continua e innovación",
            "Compromiso con la excelencia en educación infantil temprana",
          ],
        },
        history: {
          title: "Nuestra Historia",
          description:
            "Fundada en 2010, Laly's Family Group Daycare comenzó con una misión simple: crear un ambiente hogareño donde los niños pudieran prosperar. A lo largo de los años, hemos crecido y evolucionado, pero nuestro compromiso de proporcionar un cuidado excepcional ha permanecido constante.",
        },
      },
      // Sección Contacto
      contact: {
        title: "Contáctanos",
        description:
          "Te invitamos a visitar nuestra guardería y conocer a nuestro personal. Estaremos encantados de mostrarte nuestras instalaciones y responder a todas tus preguntas.",
        info: {
          title: "Información de Contacto",
          address: "Dirección",
          phone: "Teléfono",
          email: "Email",
          hours: "Horario",
          hoursValue: "Lunes a Viernes: 7:30 am - 6:00 pm",
        },
        form: {
          title: "Agenda una Visita",
          name: "Nombre",
          namePlaceholder: "Tu nombre",
          phone: "Teléfono",
          phonePlaceholder: "Tu teléfono",
          email: "Email",
          emailPlaceholder: "Tu email",
          message: "Mensaje",
          messagePlaceholder: "¿En qué podemos ayudarte?",
          send: "Enviar Mensaje",
        },
        map: {
          title: "Nuestra Ubicación",
          viewLarger: "Ver Mapa Más Grande",
        },
      },
      // Sección CTA
      cta: {
        title: "¿Listo para darle a tu hijo un lugar increíble para crecer?",
        description: "Agenda una visita hoy mismo y descubre por qué las familias eligen Incredible Laly Daycare.",
        button: "Agendar una Visita Ahora",
      },
      // Footer
      footer: {
        description: "Un lugar seguro y divertido para el desarrollo de tu pequeño.",
        quickLinks: "Enlaces Rápidos",
        hours: "Horario",
        hoursValue: "Lunes a Viernes: 7:30 am - 6:00 pm",
        closed: "Sábados y Domingos: Cerrado",
        transport: "Transporte disponible para recogida y entrega de niños en áreas seleccionadas.",
        rights: "Todos los derechos reservados.",
      },
      // Admin
      admin: {
        login: {
          title: "Acceso Administrativo",
          username: "Usuario",
          password: "Contraseña",
          button: "Ingresar",
          error: "Usuario o contraseña inválidos",
        },
        dashboard: {
          title: "Panel de Administración",
          welcome: "Bienvenido al panel de administración",
          content: "Gestión de Contenido",
          settings: "Configuración",
          logout: "Cerrar Sesión",
        },
        sections: {
          general: "Información General",
          programs: "Programas",
          staff: "Personal",
          gallery: "Galería",
          contact: "Información de Contacto",
        },
      },
    },
  }

  // Helper function to get text based on current language
  const t = (path: string) => {
    const keys = path.split(".")
    let value = translations[language as keyof typeof translations]

    for (const key of keys) {
      if (value && typeof value === "object" && key in value) {
        value = value[key as keyof typeof value]
      } else {
        return path // Fallback to the path if translation not found
      }
    }

    return value as string
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    { id: "home", label: t("nav.home") },
    { id: "programs", label: t("nav.programs") },
    { id: "staff", label: t("nav.staff") },
    { id: "safety", label: t("nav.safety") },
    { id: "gallery", label: t("nav.gallery") },
    { id: "about", label: t("nav.about") },
    { id: "contact", label: t("nav.contact") },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
      setIsMenuOpen(false)
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  // Gallery images
  const galleryImages = {
    facilities: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    activities: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    events: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    playground: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
  }

  // Handle login
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginForm.username === "admin" && loginForm.password === "admin123") {
      setIsAdmin(true)
      setShowLogin(false)
      setLoginError("")
    } else {
      setLoginError(t("admin.login.error"))
    }
  }

  const handleLogout = () => {
    setIsAdmin(false)
  }

  // Admin content state
  const [adminContent, setAdminContent] = useState({
    heroTitle: t("hero.title"),
    heroDescription: t("hero.description"),
    contactPhone: "(123) 456-7890",
    contactEmail: "info@lalysdaycare.com",
  })

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAdminContent({
      ...adminContent,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Admin Login Dialog */}
      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("admin.login.title")}</DialogTitle>
            <DialogDescription>{loginError && <p className="text-red-500">{loginError}</p>}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{t("admin.login.username")}</Label>
              <Input id="username" name="username" value={loginForm.username} onChange={handleLoginChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("admin.login.password")}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 via-pink-500 to-green-500 hover:from-blue-600 hover:via-pink-600 hover:to-green-600"
            >
              {t("admin.login.button")}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Admin Dashboard */}
      {isAdmin && (
        <div className="fixed inset-0 z-50 bg-white overflow-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold">{t("admin.dashboard.title")}</h1>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                {t("admin.dashboard.logout")}
              </Button>
            </div>

            <Tabs defaultValue="general">
              <TabsList className="mb-6">
                <TabsTrigger value="general">{t("admin.sections.general")}</TabsTrigger>
                <TabsTrigger value="programs">{t("admin.sections.programs")}</TabsTrigger>
                <TabsTrigger value="staff">{t("admin.sections.staff")}</TabsTrigger>
                <TabsTrigger value="gallery">{t("admin.sections.gallery")}</TabsTrigger>
                <TabsTrigger value="contact">{t("admin.sections.contact")}</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="heroTitle">Hero Title</Label>
                        <Input
                          id="heroTitle"
                          name="heroTitle"
                          value={adminContent.heroTitle}
                          onChange={handleContentChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="heroDescription">Hero Description</Label>
                        <Textarea
                          id="heroDescription"
                          name="heroDescription"
                          value={adminContent.heroDescription}
                          onChange={handleContentChange}
                          rows={4}
                        />
                      </div>
                      <Button className="bg-gradient-to-r from-blue-500 via-pink-500 to-green-500 hover:from-blue-600 hover:via-pink-600 hover:to-green-600">
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="programs" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Edit Programs</h3>
                    {/* Program editing form would go here */}
                    <p className="text-gray-500 mb-4">
                      Edit program details, add new programs, or remove existing ones.
                    </p>
                    <Button className="bg-gradient-to-r from-blue-500 via-pink-500 to-green-500 hover:from-blue-600 hover:via-pink-600 hover:to-green-600">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="staff" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Edit Staff Information</h3>
                    {/* Staff editing form would go here */}
                    <p className="text-gray-500 mb-4">
                      Update staff information, certifications, and training details.
                    </p>
                    <Button className="bg-gradient-to-r from-blue-500 via-pink-500 to-green-500 hover:from-blue-600 hover:via-pink-600 hover:to-green-600">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gallery" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Manage Gallery</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="galleryUpload">Upload New Images</Label>
                        <Input id="galleryUpload" type="file" multiple className="mt-2" />
                      </div>
                      <div>
                        <Label>Gallery Categories</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Button variant="outline" size="sm">
                            Facilities
                          </Button>
                          <Button variant="outline" size="sm">
                            Activities
                          </Button>
                          <Button variant="outline" size="sm">
                            Events
                          </Button>
                          <Button variant="outline" size="sm">
                            Playground
                          </Button>
                          <Button variant="outline" size="sm" className="bg-pink-100">
                            + Add Category
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Current Images</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {galleryImages.facilities.slice(0, 4).map((src, index) => (
                          <div key={index} className="relative group">
                            <Image
                              src={src || "/placeholder.svg"}
                              alt={`Gallery image ${index + 1}`}
                              width={150}
                              height={100}
                              className="rounded-md object-cover w-full h-24"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-md">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                                <ImageIcon className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button className="mt-6 bg-gradient-to-r from-blue-500 via-pink-500 to-green-500 hover:from-blue-600 hover:via-pink-600 hover:to-green-600">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="contactPhone">Phone Number</Label>
                        <Input
                          id="contactPhone"
                          name="contactPhone"
                          value={adminContent.contactPhone}
                          onChange={handleContentChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactEmail">Email Address</Label>
                        <Input
                          id="contactEmail"
                          name="contactEmail"
                          value={adminContent.contactEmail}
                          onChange={handleContentChange}
                        />
                      </div>
                      <Button className="bg-gradient-to-r from-blue-500 via-pink-500 to-green-500 hover:from-blue-600 hover:via-pink-600 hover:to-green-600">
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Replace the existing logo div in the header with: */}
          <div className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lg2-XG1rQl7r3mifoMe0TwQ3Z6eivF9jFW.png"
              alt="Laly's Family Group Daycare Logo"
              width={180}
              height={80}
              className="h-16 w-auto"
              priority
            />
          </div>

          {/* Language Toggle */}
          <div className="hidden md:flex items-center ml-6">
            <button
              onClick={() => setLanguage("es")}
              className={`px-2 py-1 text-sm font-medium rounded-l-md ${language === "es" ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              ES
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-1 text-sm font-medium rounded-r-md ${language === "en" ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              EN
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium hover:text-pink-500 transition-colors ${
                  activeSection === item.id ? "text-pink-500" : "text-gray-600"
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-to-r from-blue-500 via-pink-500 to-green-500 hover:from-blue-600 hover:via-pink-600 hover:to-green-600 text-white"
            >
              {t("nav.scheduleVisit")}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLogin(true)}
              className="text-gray-500 hover:text-pink-500"
            >
              <Settings className="h-4 w-4 mr-1" />
              {t("nav.admin")}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600 focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t py-4 px-4 shadow-lg">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium hover:text-pink-500 transition-colors ${
                    activeSection === item.id ? "text-pink-500" : "text-gray-600"
                  }`}
                >
                  {t(`nav.${item.id}`)}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-blue-500 via-pink-500 to-green-500 hover:from-blue-600 hover:via-pink-600 hover:to-green-600 text-white w-full mt-2"
              >
                {t("nav.scheduleVisit")}
              </Button>

              <Button variant="outline" onClick={() => setShowLogin(true)} className="w-full mt-2">
                <Settings className="h-4 w-4 mr-2" />
                {t("nav.admin")}
              </Button>

              {/* Mobile Language Toggle */}
              <div className="flex items-center justify-center mt-4">
                <div className="flex items-center">
                  <button
                    onClick={() => setLanguage("es")}
                    className={`px-3 py-1 text-sm font-medium rounded-l-md ${language === "es" ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-700"}`}
                  >
                    ES
                  </button>
                  <button
                    onClick={() => setLanguage("en")}
                    className={`px-3 py-1 text-sm font-medium rounded-r-md ${language === "en" ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-700"}`}
                  >
                    EN
                  </button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Info Bar */}
      <div className="bg-gradient-to-r from-blue-500 via-pink-500 to-green-500 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{t("infoBar.location")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{t("infoBar.hours")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bus className="h-4 w-4" />
              <span>{t("infoBar.transport")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <motion.div
              className="md:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                {isAdmin ? adminContent.heroTitle : t("hero.title")}
              </h2>
              <p className="text-gray-600 mb-6">{isAdmin ? adminContent.heroDescription : t("hero.description")}</p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-gradient-to-r from-blue-500 via-pink-500 to-green-500 hover:from-blue-600 hover:via-pink-600 hover:to-green-600 text-white"
                >
                  {t("hero.scheduleVisit")}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={() => scrollToSection("programs")}
                  variant="outline"
                  className="border-pink-500 text-pink-500 hover:bg-pink-50"
                >
                  {t("hero.explorePrograms")}
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Niños jugando en la guardería"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <p className="text-gray-800 font-medium">{t("hero.quote")}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{t("programs.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("programs.description")}</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {[
              {
                title: t("programs.infants.title"),
                age: t("programs.infants.age"),
                description: t("programs.infants.description"),
                icon: <Heart className="h-10 w-10 text-pink-500" />,
                color: "from-pink-400 to-pink-300",
              },
              {
                title: t("programs.toddlers.title"),
                age: t("programs.toddlers.age"),
                description: t("programs.toddlers.description"),
                icon: <BookOpen className="h-10 w-10 text-blue-500" />,
                color: "from-blue-400 to-blue-300",
              },
              {
                title: t("programs.preschoolers.title"),
                age: t("programs.preschoolers.age"),
                description: t("programs.preschoolers.description"),
                icon: <Users className="h-10 w-10 text-green-500" />,
                color: "from-green-400 to-green-300",
              },
              {
                title: t("programs.schoolAge.title"),
                age: t("programs.schoolAge.age"),
                description: t("programs.schoolAge.description"),
                icon: <Shield className="h-10 w-10 text-pink-500" />,
                color: "from-pink-400 to-pink-300",
              },
            ].map((program, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`h-2 bg-gradient-to-r ${program.color}`}></div>
                  <CardContent className="p-6">
                    <div className="mb-4">{program.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{program.title}</h3>
                    <p className="text-sm text-pink-500 mb-3">{program.age}</p>
                    <p className="text-gray-600">{program.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Staff Section */}
      <section id="staff" className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{t("staff.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("staff.description")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{t("staff.certifications.title")}</h3>
                <ul className="space-y-3">
                  {t("staff.certifications.items").map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-1 h-4 w-4 rounded-full bg-pink-500 flex-shrink-0"></div>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Personal de la guardería"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t("staff.dedicatedTeam.title")}</h3>
                <p className="text-gray-600">{t("staff.dedicatedTeam.description")}</p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{t("staff.continuousTraining.title")}</h3>
                <ul className="space-y-3">
                  {t("staff.continuousTraining.items").map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-1 h-4 w-4 rounded-full bg-green-500 flex-shrink-0"></div>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section id="safety" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{t("safety.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("safety.description")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-blue-50 rounded-xl p-6 shadow-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6 text-blue-500" />
                {t("safety.measures.title")}
              </h3>
              <ul className="space-y-4">
                {t("safety.measures.items").map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 h-5 w-5 rounded-full bg-gradient-to-r from-blue-500 via-pink-500 to-green-500 flex items-center justify-center flex-shrink-0">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="bg-blue-50 rounded-xl p-6 shadow-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Heart className="h-6 w-6 text-pink-500" />
                {t("safety.discipline.title")}
              </h3>
              <p className="text-gray-700 mb-4">{t("safety.discipline.description")}</p>
              <ul className="space-y-4">
                {t("safety.discipline.items").map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 h-5 w-5 rounded-full bg-gradient-to-r from-pink-500 via-green-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{t("gallery.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("gallery.description")}</p>
          </motion.div>

          <Tabs defaultValue="facilities" className="w-full">
            <TabsList className="mb-8 flex flex-wrap justify-center">
              <TabsTrigger value="facilities">{t("gallery.categories.facilities")}</TabsTrigger>
              <TabsTrigger value="activities">{t("gallery.categories.activities")}</TabsTrigger>
              <TabsTrigger value="events">{t("gallery.categories.events")}</TabsTrigger>
              <TabsTrigger value="playground">{t("gallery.categories.playground")}</TabsTrigger>
            </TabsList>

            {Object.entries(galleryImages).map(([category, images]) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {images.map((src, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="relative overflow-hidden rounded-lg shadow-md group"
                    >
                      <Image
                        src={src || "/placeholder.svg"}
                        alt={`${category} image ${index + 1}`}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full">
                          <p className="text-white font-medium">{t(`gallery.categories.${category}`)}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{t("about.title")}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-blue-50 rounded-xl p-6 shadow-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t("about.mission.title")}</h3>
              <p className="text-gray-700 mb-6">{t("about.mission.description")}</p>

              <h3 className="text-xl font-bold text-gray-800 mb-4">{t("about.vision.title")}</h3>
              <p className="text-gray-700">{t("about.vision.description")}</p>
            </motion.div>

            <motion.div
              className="bg-blue-50 rounded-xl p-6 shadow-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t("about.values.title")}</h3>
              <ul className="space-y-3 mb-6">
                {t("about.values.items").map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 h-5 w-5 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-4">{t("about.history.title")}</h3>
              <p className="text-gray-700">{t("about.history.description")}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{t("contact.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("contact.description")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t("contact.info.title")}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">{t("contact.info.address")}</p>
                    <p className="text-gray-600">{t("infoBar.location")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">{t("contact.info.phone")}</p>
                    <p className="text-gray-600">{isAdmin ? adminContent.contactPhone : "(123) 456-7890"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">{t("contact.info.email")}</p>
                    <p className="text-gray-600">{isAdmin ? adminContent.contactEmail : "info@lalysdaycare.com"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">{t("contact.info.hours")}</p>
                    <p className="text-gray-600">{t("contact.info.hoursValue")}</p>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="mt-6 rounded-lg overflow-hidden shadow-md h-[250px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d24142.932263399176!2d-73.92984620043218!3d40.852854017818856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sLaly&#39;s%20Family%20Group%20Daycare!5e0!3m2!1ses-419!2sdo!4v1741434335711!5m2!1ses-419!2sdo"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Laly's Family Group Daycare Location"
                  className="rounded-lg"
                />
              </div>
              <div className="mt-2 text-center">
                <a
                  href="https://maps.app.goo.gl/XGb1y3EtfyPD2gP69"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-pink-500 hover:text-pink-700 transition-colors"
                >
                  {t("contact.map.viewLarger")}
                </a>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-lg p-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t("contact.form.title")}</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.form.name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder={t("contact.form.namePlaceholder")}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.form.phone")}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder={t("contact.form.phonePlaceholder")}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("contact.form.email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder={t("contact.form.emailPlaceholder")}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder={t("contact.form.messagePlaceholder")}
                  ></textarea>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 via-pink-500 to-green-500 hover:from-blue-600 hover:via-pink-600 hover:to-green-600 text-white"
                >
                  {t("contact.form.send")}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-blue-500 via-pink-500 to-green-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("cta.title")}</h2>
            <p className="mb-6 max-w-2xl mx-auto">{t("cta.description")}</p>
            <Button
              onClick={() => scrollToSection("contact")}
              variant="secondary"
              size="lg"
              className="bg-white text-pink-500 hover:bg-gray-100"
            >
              {t("cta.button")}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              {/* And replace the mobile footer logo with: */}
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lg2-XG1rQl7r3mifoMe0TwQ3Z6eivF9jFW.png"
                  alt="Laly's Family Group Daycare Logo"
                  width={150}
                  height={67}
                  className="h-14 w-auto"
                />
              </div>
              <p className="text-gray-400 mb-4">{t("footer.description")}</p>
              <div className="flex gap-4">
                <a href="#" className="text-white hover:text-pink-400 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-pink-400 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-pink-400 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">{t("footer.quickLinks")}</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-400 hover:text-pink-400 transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">{t("footer.hours")}</h3>
              <p className="text-gray-400 mb-2">{t("footer.hoursValue")}</p>
              <p className="text-gray-400 mb-4">{t("footer.closed")}</p>
              <p className="text-gray-400">{t("footer.transport")}</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Laly's Family Group Daycare. {t("footer.rights")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}


import { FirebaseDataProvider } from "@/components/firebase-data-provider"
import { DatabaseInitializer } from "@/components/database-initializer"

export default function DatabaseSetupPage() {
  return (
    <FirebaseDataProvider>
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Database Setup</h1>
        <DatabaseInitializer />
      </div>
    </FirebaseDataProvider>
  )
}


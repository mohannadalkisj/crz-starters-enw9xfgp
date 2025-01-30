"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Home, User, Briefcase, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"

export default function BookingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Header */}
      <header className="bg-[#13357B] text-white p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">حجوزاتي</h1>
            <button className="p-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-center">دعنا نخطط لرحلتك القادمة معنا!!</p>
        </div>
      </header>

      {/* Category Buttons */}
      <div className="container mx-auto px-4 mt-4">
        <div className="grid grid-cols-3 gap-4">
          <Button variant="outline" className="bg-[#0077FF] text-white hover:bg-[#0077FF]/90">
            طيران
          </Button>
          <Button variant="outline" className="bg-white text-gray-400">
            الفنادق
          </Button>
          <Button variant="outline" className="bg-white text-gray-400">
            كروز
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-[#13357B]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <p className="text-gray-600 max-w-md">
            لم تقم بتسجيل الدخول. لعرض حجوزات الطيران والفنادق الخاصة بك، يجب عليك تسجيل الدخول لريزيرفال.
          </p>
          <Link href="/auth" className="w-full max-w-md">
            <Button className="w-full bg-[#0077FF] hover:bg-[#0077FF]/90">تسجيل الدخول</Button>
          </Link>
          <p className="text-[#0077FF]">
            ليس لديك حساب؟{" "}
            <Link href="/auth?tab=signup" className="underline">
              إنشاء هنا
            </Link>
          </p>
        </div>
      </main>

  
    </div>
  )
}


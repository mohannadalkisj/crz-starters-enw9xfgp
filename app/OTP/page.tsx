"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useBooking } from "@/lib/book-context"

export default function OTPPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("bookingId")
  const { getBooking, updateBooking } = useBooking()
  const [otp, setOtp] = useState("")

  useEffect(() => {
    const fetchBookingData = async () => {
      if (bookingId) {
        const booking = await getBooking(bookingId)
        if (booking) {
          console.log("Booking data:", booking)
        }
      }
    }
    fetchBookingData()
  }, [bookingId, getBooking])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (bookingId) {
      try {
        await updateBooking(bookingId, { otpVerified: true })
        // Here you would typically verify the OTP with your backend
        // For this example, we're just marking it as verified in Firestore
        router.push(`/booking-confirmation?bookingId=${bookingId}`)
      } catch (error) {
        console.error("Error updating booking: ", error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 rtl" dir="rtl">
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">التحقق من OTP</h1>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        <Card className="mb-6">
          <form onSubmit={handleSubmit} className="p-4 space-y-6">
            <h2 className="font-bold text-lg">أدخل رمز التحقق</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">رمز التحقق</label>
                <Input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="أدخل رمز التحقق" required />
              </div>
            </div>

            <Button type="submit" className="w-full">
              تأكيد
            </Button>
          </form>
        </Card>
      </main>
    </div>
  )
}


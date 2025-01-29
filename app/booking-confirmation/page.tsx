"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Check } from "lucide-react"
import { useBooking } from "@/lib/book-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("bookingId")
  const { getBooking } = useBooking()
  const [bookingData, setBookingData] = useState<any>(null)

  useEffect(() => {
    const fetchBookingData = async () => {
      if (bookingId) {
        const booking = await getBooking(bookingId)
        if (booking) {
          setBookingData(booking)
        } else {
          console.log("No such booking!")
        }
      }
    }
    fetchBookingData()
  }, [bookingId, getBooking])

  if (!bookingData) {
    return <div>جاري تحميل معلومات الحجز...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 rtl" dir="rtl">
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-4">
            <h1 className="text-xl font-bold">تأكيد الحجز</h1>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        <Card className="mb-6">
          <div className="p-4 space-y-6">
            <div className="flex items-center justify-center text-green-500">
              <Check className="h-16 w-16" />
            </div>
            <h2 className="text-2xl font-bold text-center">تم تأكيد حجزك بنجاح!</h2>
            <div className="space-y-2">
              <p>
                <strong>رقم الحجز:</strong> {bookingId}
              </p>
              <p>
                <strong>نوع الكابينة:</strong> {bookingData.cabin}
              </p>
              <p>
                <strong>اسم المسافر:</strong> {bookingData.passengerInfo.firstName} {bookingData.passengerInfo.lastName}
              </p>
              <p>
                <strong>البريد الإلكتروني:</strong> {bookingData.passengerInfo.email}
              </p>
              <p>
                <strong>رقم الهاتف:</strong> {bookingData.passengerInfo.phone}
              </p>
            </div>
            <Button className="w-full">طباعة تأكيد الحجز</Button>
          </div>
        </Card>
      </main>
    </div>
  )
}


"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useBooking } from "@/lib/book-context"

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("bookingId")
  const { getBooking, updateBooking } = useBooking()
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  useEffect(() => {
    const fetchBookingData = async () => {
      if (bookingId) {
        const booking = await getBooking(bookingId)
        if (booking) {
          setPaymentInfo(booking.paymentInfo)
        }
      }
    }
    fetchBookingData()
  }, [bookingId, getBooking])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (bookingId) {
      try {
        await updateBooking(bookingId, { paymentInfo })
        router.push(`/otp?bookingId=${bookingId}`)
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
            <h1 className="text-xl font-bold">الدفع</h1>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        <Card className="mb-6">
          <form onSubmit={handleSubmit} className="p-4 space-y-6">
            <h2 className="font-bold text-lg">معلومات الدفع</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">رقم البطاقة</label>
                <Input
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handleInputChange}
                  placeholder="رقم البطاقة"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">تاريخ الانتهاء</label>
                <Input
                  name="expiryDate"
                  value={paymentInfo.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">CVV</label>
                <Input
                  name="cvv"
                  value={paymentInfo.cvv}
                  onChange={handleInputChange}
                  type="password"
                  placeholder="CVV"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              إتمام الدفع
            </Button>
          </form>
        </Card>
      </main>
    </div>
  )
}


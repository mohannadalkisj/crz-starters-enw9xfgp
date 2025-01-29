"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, getDocs, doc, getDoc, updateDoc, addDoc } from "firebase/firestore"

type Route = {
  id: number
  title: string
  image: string
}

type Booking = {
  id: string
  cabin: string
  route?: Route
  passengerInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    nationality: string
  }
  paymentInfo: {
    cardNumber: string
    expiryDate: string
    cvv: string
  }
  otpVerified: boolean
}

type BookingContextType = {
  bookings: Booking[]
  loading: boolean
  error: string | null
  addBooking: (booking: Omit<Booking, "id">) => Promise<string>
  updateBooking: (id: string, booking: Partial<Booking>) => Promise<void>
  getBooking: (id: string) => Promise<Booking | null>
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export const useBooking = () => {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bookings"))
        const bookingsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Booking[]
        setBookings(bookingsData)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching bookings: ", err)
        setError("Failed to fetch bookings. Please try again later.")
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  const addBooking = async (booking: Omit<Booking, "id">): Promise<string> => {
    try {
      const docRef = await addDoc(collection(db, "bookings"), booking)
      const newBooking = { id: docRef.id, ...booking }
      setBookings([...bookings, newBooking])
      return docRef.id
    } catch (err) {
      console.error("Error adding booking: ", err)
      throw new Error("Failed to add booking. Please try again later.")
    }
  }

  const updateBooking = async (id: string, updatedFields: Partial<Booking>): Promise<void> => {
    try {
      const bookingRef = doc(db, "bookings", id)
      await updateDoc(bookingRef, updatedFields)
      setBookings(bookings.map((booking) => (booking.id === id ? { ...booking, ...updatedFields } : booking)))
    } catch (err) {
      console.error("Error updating booking: ", err)
      throw new Error("Failed to update booking. Please try again later.")
    }
  }

  const getBooking = async (id: string): Promise<Booking | null> => {
    try {
      const docRef = doc(db, "bookings", id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Booking
      } else {
        return null
      }
    } catch (err) {
      console.error("Error fetching booking: ", err)
      throw new Error("Failed to fetch booking. Please try again later.")
    }
  }

  return (
    <BookingContext.Provider value={{ bookings, loading, error, addBooking, updateBooking, getBooking }}>
      {children}
    </BookingContext.Provider>
  )
}


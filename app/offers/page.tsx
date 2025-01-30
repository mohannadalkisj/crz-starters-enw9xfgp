"use client"

import Image from "next/image"
import Link from "next/link"
import { Home, User, Briefcase, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link href="/auth">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">عروض</h1>
            <Button variant="ghost" size="icon">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Promotional Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-4 mb-6 text-center">
          <p className="text-lg">استمتع بعروض متنوعة على رحلات الطيران والفنادق ووفر حتى 50%</p>
        </div>

        {/* Main Promo Card */}
        <div className="relative rounded-lg overflow-hidden mb-8">
          <Image
            src="/"
            alt="Best Prices Promotion"
            width={600}
            height={300}
            className="w-full"
          />
          <div className="absolute bottom-4 left-4">
            <Button className="bg-white text-blue-600 hover:bg-blue-50">احجز الآن</Button>
          </div>
        </div>

        {/* App Download Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-center mb-4">حمل تطبيق ريزيرفال</h2>
          <p className="text-gray-600 text-center mb-6">
            أكثر من 400 شركة طيران حول العالم في انتظارك من خلال قنوات دفع آمنة وسهلة و عملية حجز سلسة من 4 خطوات.
          </p>

          <div className="text-center mb-6">
            <p className="font-bold mb-4">متاح الآن</p>
            <div className="flex justify-center gap-4">
              <Link href="https://apps.apple.com" target="_blank">
                <Button variant="outline" className="bg-[#1a2b48] text-white hover:bg-[#1a2b48]/90">
                  <Image src="/app-store.png" alt="App Store" width={120} height={40} />
                </Button>
              </Link>
              <Link href="https://play.google.com" target="_blank">
                <Button variant="outline" className="bg-[#1a2b48] text-white hover:bg-[#1a2b48]/90">
                  <Image src="/play-store.png" alt="Play Store" width={120} height={40} />
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src="/"
              alt="App Screenshots"
              width={300}
              height={600}
              className="max-w-[300px]"
            />
          </div>
        </div>
      </main>


    </div>
  )
}


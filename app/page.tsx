'use client';
import Image from 'next/image';
import {
  Ship,
  Plane,
  Building2,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarDialog } from '@/components/calnder';
import { useState } from 'react';

export default function Page() {
  const [ope, setOpen] = useState(false);
  return (
    <div
      className="min-h-screen rtl"
      dir="rtl"
      style={{
        background: 'url(/bbgg.webp) no-repeat ',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height:'140vh',
      }}
    >
      {/* Top Navigation */}
      <header className="p-4 flex justify-between items-center">
        <button className="p-2 rounded-full bg-white/80 backdrop-blur">
          <User className="w-6 h-6" />
        </button>
        <button className="p-2 rounded-full bg-white/80 backdrop-blur">
          <svg
            className="w-6 h-6"
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
        </button>
      </header>

      {/* Cruise Line Selection */}
      <div className="flex justify-center gap-4 p-4">
        {[
          {
            name: 'أرويا',
            image: '/123.webp',
          },
          {
            name: 'رويال كاريبيان',
            image: '/345.webp',
          },
          {
            name: 'ام سي ال',
            image: '/cvc.png',
          },
        ].map((cruise) => (
          <div key={cruise.name} className="text-center">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white mb-2">
              <img
                src={cruise.image || '/placeholder.png'}
                alt={cruise.name}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-sm font-medium text-white">{cruise.name}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <main className="px-4 pt-6">
        <div className=" bg-gradient-to-b from-sky-400 to-blue-900 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-blue-900">أرويا كروز</h1>
            <Image
         src="/next.svg" 
              alt="Aroya Cruises"
              width={100}
              height={40}
              className="h-8 w-auto"
            />
          </div>

          <h2 className="text-lg text-blue-900 mb-4">
            إحجز رحلات أرويا كروز مع ريزيرفال
          </h2>

          <div className="aspect-video rounded-lg overflow-hidden mb-6">
            <img
              src="/cvc.png"
              alt="Cruise Ship"
              width={800}
              height={450}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button
              variant="outline"
              className="h-14"
              onClick={() => {
                setOpen(true);
              }}
            >
              <svg
                className="w-5 h-5 ml-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              التواريخ
              <br />
              جميع التواريخ
            </Button>
            <CalendarDialog open={ope} onOpenChange={setOpen} />
            <Button variant="outline" className="h-14">
              <svg
                className="w-5 h-5 ml-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              مسار الرحلة
              <br />
              مسار الرحلة
            </Button>
          </div>
            <Link href="/trips">          <Button variant="outline" className="w-full">بحث
            </Button>

</Link>
        </div>

        <div className="grid grid-cols-4 gap-4 pt-12">
          <Button
            variant="ghost"
            className="flex flex-col items-center p-4 h-20 w-full bg-gradient-to-b from-sky-400 to-blue-800 mb-2"
          >
            <Image src="/next.svg" alt="logo" height={90} width={120} />
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center p-4 h-full w-full h-20 mb-2"
          >
            <Plane className="w-6 h-6 mb-2" />
            طيران
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center p-4 h-full w-full h-20 mb-2"
          >
            <Building2 className="w-6 h-6 mb-2" />
            فنادق
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center p-4 h-full h-20 w-full mb-2"
          >
            <Ship className="w-6 h-6 mb-2" />
            كروز
          </Button>
        </div>
      </main>

     
    </div>
  );
}

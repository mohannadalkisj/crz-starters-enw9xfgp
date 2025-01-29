'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Ship, Map, Calendar, Upload, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function PassengerInfoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const [passengerInfo, setPassengerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
  });

  useEffect(() => {
    const fetchBookingData = async () => {
      if (bookingId) {
        const docRef = doc(db, 'bookings', bookingId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log('Booking data:', docSnap.data());
        } else {
          console.log('No such document!');
        }
      }
    };
    fetchBookingData();
  }, [bookingId]);

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setPassengerInfo({ ...passengerInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (bookingId) {
      try {
        await updateDoc(doc(db, 'bookings', bookingId), {
          passengerInfo: passengerInfo,
        });
        router.push(`/payment?bookingId=${bookingId}`);
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 rtl" dir="rtl">
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold">بيانات المسافرين</h1>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        <Card className="mb-6">
          <div className="p-4 space-y-4">
            <h2 className="font-bold text-lg">ملخص الحجز</h2>

            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>27 ابريل, 2025 - 1 مايو, 2025</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <Ship className="h-4 w-4" />
              <span>4 ليالي</span>
              <span className="mx-2">•</span>
              <span>كبينة داخلية</span>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between">
                <span>رسوم الكابينة</span>
                <span>ر.س. 2240</span>
              </div>
              <div className="flex justify-between">
                <span>رسوم الميناء</span>
                <span>ر.س. 810</span>
              </div>
              <div className="flex justify-between">
                <span>رسوم الخدمة</span>
                <span>ر.س. 360</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t">
                <span>المبلغ الإجمالي المطلوب دفعه</span>
                <span>ر.س. 3410</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-green-600">
              <Check className="h-4 w-4" />
              <span>أقساط</span>
            </div>
          </div>
        </Card>

        <div className="text-center mb-6">
          <p>قم بتسجيل الدخول لتسهيل عملية الحجز الخاصة بك</p>
          <Button variant="outline" className="mt-2">
            تسجيل الدخول بواسطة ريزيرفال
          </Button>
        </div>

        <Card className="mb-6">
          <form onSubmit={handleSubmit} className="p-4 space-y-6">
            <h2 className="font-bold text-lg">معلومات المسافر</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">الاسم الأول</label>
                <Input
                  name="firstName"
                  value={passengerInfo.firstName}
                  onChange={handleInputChange}
                  placeholder="الاسم الأول"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">اسم العائلة</label>
                <Input
                  name="lastName"
                  value={passengerInfo.lastName}
                  onChange={handleInputChange}
                  placeholder="اسم العائلة"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">البريد الإلكتروني</label>
                <Input
                  name="email"
                  value={passengerInfo.email}
                  onChange={handleInputChange}
                  type="email"
                  placeholder="البريد الإلكتروني"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">رقم الهاتف</label>
                <Input
                  name="phone"
                  value={passengerInfo.phone}
                  onChange={handleInputChange}
                  type="tel"
                  placeholder="رقم الهاتف"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">الجنسية</label>
                <Select
                  name="nationality"
                  value={passengerInfo.nationality}
                  onValueChange={(value) =>
                    setPassengerInfo({ ...passengerInfo, nationality: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الجنسية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sa">سعودي</SelectItem>
                    <SelectItem value="ae">إماراتي</SelectItem>
                    {/* Add more nationalities as needed */}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full">
              متابعة إلى الدفع
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Ship, Map, Calendar, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function CabinSelectionPage() {
  const router = useRouter();
  const [selectedCabin, setSelectedCabin] = useState(null);

  const handleCabinSelection = async (cabin) => {
    setSelectedCabin(cabin);
    try {
      const docRef = await addDoc(collection(db, 'bookings'), {
        cabin: cabin,
        timestamp: new Date(),
      });
      console.log('Booking document written with ID: ', docRef.id);
      router.push(`/passenger-info?bookingId=${docRef.id}`);
    } catch (e) {
      console.error('Error adding document: ', e);
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
              <h1 className="text-xl font-bold">اختر الفئة</h1>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        <Card className="overflow-hidden">
          <div className="space-y-4">
            <div className="flex gap-4 p-4 border-b">
              <Ship className="h-6 w-6 text-blue-600" />
              <Map className="h-6 w-6 text-blue-600" />
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>

            <div className="relative aspect-[2/1] bg-gray-100">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/www.reserval.com_ar%20(3)-n9EAGhWOMaZbpS4Glfcpz2IWWab59S.png"
                alt="Cruise Ship"
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <h2 className="text-xl font-bold mb-6">
                رحلات 4 ليالي جدة | شرم الشيخ | جدة
              </h2>

              <Tabs defaultValue="interior">
                <TabsList className="w-full justify-start mb-6">
                  <TabsTrigger value="interior" className="flex-1">
                    داخلية
                  </TabsTrigger>
                  <TabsTrigger value="oceanview" className="flex-1">
                    مطلة
                  </TabsTrigger>
                  <TabsTrigger value="balcony" className="flex-1">
                    شرفة
                  </TabsTrigger>
                  <TabsTrigger value="suite" className="flex-1">
                    أجنحة فخامى
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="interior" className="space-y-6">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/www.reserval.com_ar%20(3)-n9EAGhWOMaZbpS4Glfcpz2IWWab59S.png"
                      alt="Interior Cabin"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/www.reserval.com_ar%20(3)-n9EAGhWOMaZbpS4Glfcpz2IWWab59S.png"
                        alt="Interior Cabin Thumbnail"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold">كبينة داخلية</h3>
                    <p className="text-gray-600">
                      سرير كوين أو سريرين منفصلين (حسب الطلب) حمام خاص للإستحمام
                      ومجفف للشعر تلفزيون مسطح, خزانة, تليفون, ميني بار, وتكييف
                      هواء للتحكم عن بُعد بعض الكبائن توفر سرير بولمان إضافي
                    </p>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div>
                        <div className="text-sm">
                          الحد الأدنى لسعة الكابينة: 1
                        </div>
                        <div className="text-sm">الحد الأقصى للكابينة: 3</div>
                      </div>
                      <div className="text-left">
                        <div className="text-2xl font-bold text-blue-600">
                          ر.س. 3410
                        </div>
                        <div className="text-sm text-gray-600">
                          شامل الضريبة
                        </div>
                        <div className="flex items-center gap-1 text-green-600">
                          <Check className="h-4 w-4" />
                          <span className="text-sm">أقساط</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => handleCabinSelection('interior')}
                    >
                      اختيار
                    </Button>
                  </div>
                </TabsContent>
                {/* Add similar content for other cabin types */}
              </Tabs>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}

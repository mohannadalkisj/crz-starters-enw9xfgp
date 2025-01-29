'use client';

import Image from 'next/image';
import { ArrowLeft, Ship, Map, Calendar, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 rtl" dir="rtl">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold">معلومات الضيوف</h1>
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
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/www.reserval.com_ar%20(2)-EMTjR2CZP5Ss57xEnRSX1a8GpnFcH3.png"
                alt="Cruise Ship"
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4 space-y-6">
              <h2 className="text-xl font-bold">
                رحلات 4 ليالي جدة | شرم الشيخ | جدة
              </h2>

              <div className="space-y-4">
                <h3 className="font-bold text-lg">:العمر</h3>
                <ul className="space-y-2 text-gray-600 mr-6">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    البالغين من 18 عام أو أكبر
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    الاطفال من 2 الي 17.99 عام
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    الرضع من 6 شهور الي 1.99 عام
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="font-bold">عدد الضيوف</label>
                  <Select defaultValue="2">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="اختر عدد الضيوف" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="font-bold">عمر الضيف 1</label>
                    <Input
                      placeholder="الرجاء ادخال عمر الضيف باللغة الانجليزية"
                      className="text-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold">عمر الضيف 2</label>
                    <Input
                      placeholder="الرجاء ادخال عمر الضيف باللغة الانجليزية"
                      className="text-gray-400"
                    />
                  </div>
                </div>
              </div>

              <Button className="w-full" size="lg">
                متابعة
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}

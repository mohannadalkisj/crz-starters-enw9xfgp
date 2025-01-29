import Image from 'next/image';
import { ArrowLeft, ArrowRight, Calendar, Ship } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';

export default function TripsPage() {
  return (
    <div className="min-h-screen bg-gray-50 rtl" dir="rtl">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Button variant="ghost" size="icon">
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold">الرحلات</h1>
            <Button variant="ghost" size="icon">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 6h18M6 12h12M10 18h4" />
            </svg>
            فلتر
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">:ترتيب حسب</span>
            <Select defaultValue="recommended">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="اختر الترتيب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">الأكثر طلباً</SelectItem>
                <SelectItem value="price-asc">
                  السعر: من الأقل للأعلى
                </SelectItem>
                <SelectItem value="price-desc">
                  السعر: من الأعلى للأقل
                </SelectItem>
                <SelectItem value="duration-asc">
                  المدة: من الأقصر للأطول
                </SelectItem>
                <SelectItem value="duration-desc">
                  المدة: من الأطول للأقصر
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="container mx-auto px-4 py-4">
        <div className="text-sm text-gray-600 mb-4">
          تم العثور على هذه الرحلات
        </div>

        <div className="space-y-4">
          {[
            {
              id: 1,
              title: 'رحلات 3 ليالي جدة | الجزيرة الخاصة | جدة',
              image: '/',
              departure: 'خميس, ٣٠ يناير, ٢٠٢٥',
              arrival: 'أحد, ٢ فبراير, ٢٠٢٥',
              price: 998,
              hasInstallments: true,
            },
            {
              id: 2,
              title: 'رحلات 3 ليالي جدة | الجزيرة الخاصة | جدة',
              image: '/',
              departure: 'خميس, ١ فبراير, ٢٠٢٥',
              arrival: 'أحد, ٩ فبراير, ٢٠٢٥',
              price: 998,
              hasInstallments: true,
            },
            {
              id: 3,
              title: 'رحلات 3 ليالي جدة | الجزيرة الخاصة | جدة',
              image: '/',
              departure: 'خميس, ١٣ فبراير, ٢٠٢٥',
              arrival: 'أحد, ١٦ فبراير, ٢٠٢٥',
              price: 998,
              hasInstallments: true,
            },
          ].map((trip) => (
            <Card key={trip.id} className="overflow-hidden">
              <div className="space-y-4">
                <div className="flex gap-1 py-4 border-b">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 text-blue-600"
                  >
                    <Ship className="h-5 w-5" />
                    معلومات السفينة
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 text-blue-600"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    مسار الرحلة
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 text-blue-600"
                  >
                    <Calendar className="h-5 w-5" />
                    مواعيد أخرى
                  </Button>
                </div>

                <div className="relative aspect-[2/1] bg-gray-100">
                  <img
                    src={trip.image || '/placeholder.png'}
                    alt={trip.title}
                    className="object-cover"
                  />
                </div>

                <div className="p-4 space-y-4">
                  <h2 className="text-xl font-bold">{trip.title}</h2>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>:المغادرة</span>
                    </div>
                    <div>{trip.departure}</div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>:الوصول الى</span>
                    </div>
                    <div>{trip.arrival}</div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      {trip.hasInstallments && (
                        <div className="flex items-center gap-1 text-green-600">
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          <span>أقساط</span>
                        </div>
                      )}
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-gray-600">يبدأ من</div>
                      <div className="text-2xl font-bold text-blue-600">
                        {trip.price} ر.س.
                      </div>
                      <div className="text-sm text-gray-600">
                        للضيف الواحد (شامل الضريبة)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <Button className="flex-1" size="lg">
                      <Link href={
                      '/cabin-selection'
                      }>
                      احجز رحلة بحرية</Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="lg"
                      className="px-4 bg-red-100 hover:bg-red-200 text-red-600"
                    >
                      % Promo
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-6" size="lg">
          عرض المزيد من الرحلات
        </Button>
      </div>
    </div>
  );
}

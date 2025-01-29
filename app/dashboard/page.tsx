'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function DashboardPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<{
    cabin?: ReactNode |undefined;
    otpVerified?: any;id:string,passengerInfo?:any
}[]>([{id:'',passengerInfo:undefined}]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'bookings'));
        const bookingsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching bookings: ', err);
        setError('Failed to fetch bookings. Please try again later.');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.passengerInfo?.firstName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.passengerInfo?.lastName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.passengerInfo?.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        جاري التحميل...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 rtl" dir="rtl">
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">لوحة التحكم</h1>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>ملخص الحجوزات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    إجمالي الحجوزات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{bookings.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    الحجوزات المؤكدة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {bookings.filter((booking) => booking.otpVerified).length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    الحجوزات قيد الانتظار
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {bookings.filter((booking) => !booking.otpVerified).length}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>تفاصيل الحجوزات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Input
                type="text"
                placeholder="البحث عن الحجوزات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Button size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الحجز</TableHead>
                    <TableHead>الاسم</TableHead>
                    <TableHead>البريد الإلكتروني</TableHead>
                    <TableHead>نوع الكابينة</TableHead>
                    <TableHead>الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">
                        {booking.id}
                      </TableCell>
                      <TableCell>{`${booking.passengerInfo?.firstName} ${booking.passengerInfo?.lastName}`}</TableCell>
                      <TableCell>{booking.passengerInfo?.email}</TableCell>
                      <TableCell>{booking.cabin}</TableCell>
                      <TableCell>
                        {booking.otpVerified ? 'مؤكد' : 'قيد الانتظار'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

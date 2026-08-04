import { NextRequest, NextResponse } from 'next/server';
import { Booking } from '@/lib/types';

let bookings: Booking[] = [];

function randomChars(length: number, charset: string): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

export async function GET() {
  return NextResponse.json({ success: true, data: bookings });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const id = 'bk-' + randomChars(8, 'abcdefghijklmnopqrstuvwxyz0123456789');
  const reference = 'RLZ-' + randomChars(6, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');

  const booking: Booking = {
    id,
    reference,
    carId: body.carId,
    pickupLocationId: body.pickupLocationId,
    returnLocationId: body.returnLocationId,
    pickupDate: body.pickupDate,
    returnDate: body.returnDate,
    totalPrice: body.totalPrice,
    status: 'confirmed',
    customerName: body.customerName,
    customerEmail: body.customerEmail,
    customerPhone: body.customerPhone,
    insurancePlanId: body.insurancePlanId,
    createdAt: new Date().toISOString(),
  };

  bookings.push(booking);

  return NextResponse.json({ success: true, data: booking });
}

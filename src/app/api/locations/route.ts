import { NextRequest, NextResponse } from 'next/server';
import { searchLocations, FR_LOCATIONS, locationSubtitle } from '@/lib/locations';
import type { Location } from '@/lib/types';

/** Le front attend un `Location`; on ajoute region/departement en plus. */
function toLocation(l: (typeof FR_LOCATIONS)[number]): Location {
  return {
    id: l.id,
    name: l.name,
    city: l.city,
    type: l.type,
    address: locationSubtitle(l),
    region: l.region,
    department: l.department,
  };
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') ?? '';
  const limit = Number(request.nextUrl.searchParams.get('limit') ?? 8);

  const data = searchLocations(q, Math.min(Math.max(limit, 1), 25)).map(toLocation);

  return NextResponse.json({ success: true, data });
}

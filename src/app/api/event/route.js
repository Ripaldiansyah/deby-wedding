import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request) {
  try {
    const data = await request.json();
    const { type, event_date, start_time, end_time, location_name, address, map_url } = data;

    if (!type) {
      return NextResponse.json({ error: "Type is required (akad/resepsi)" }, { status: 400 });
    }

    await query(
      `INSERT INTO event_details (type, event_date, start_time, end_time, location_name, address, map_url) 
       VALUES (?, ?, ?, ?, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE 
       event_date = ?, start_time = ?, end_time = ?, location_name = ?, address = ?, map_url = ?`,
      [
        type, event_date, start_time, end_time, location_name, address, map_url,
        event_date, start_time, end_time, location_name, address, map_url
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update event error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

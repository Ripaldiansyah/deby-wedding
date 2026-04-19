import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // data is expected to be an object of key-value pairs
    // e.g., { "video_url": "...", "hero_greeting": "..." }
    for (const [key, value] of Object.entries(data)) {
      await query(
        'INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
        [key, value, value]
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

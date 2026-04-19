import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET() {
  try {
    const guests = await query('SELECT * FROM guests ORDER BY created_at DESC');
    return NextResponse.json({ guests });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { guest_name, slug, max_guests } = data;
    
    await query(
      'INSERT INTO guests (guest_name, slug, max_guests) VALUES (?, ?, ?)',
      [guest_name, slug || guest_name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), max_guests || 2]
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (id) {
       await query('DELETE FROM guests WHERE id = ?', [id]);
    } else {
       await query('TRUNCATE TABLE guests');
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

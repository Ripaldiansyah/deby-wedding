import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const stories = await query('SELECT * FROM story_sections ORDER BY story_order ASC');
    return NextResponse.json({ stories });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { id, story_order, story_date, title, description, image_url } = data;
    
    if (id) {
       // Update
       await query(
         'UPDATE story_sections SET story_order=?, story_date=?, title=?, description=?, image_url=? WHERE id=?',
         [story_order || 0, story_date, title, description, image_url, id]
       );
    } else {
       // Insert
       await query(
         'INSERT INTO story_sections (story_order, story_date, title, description, image_url) VALUES (?, ?, ?, ?, ?)',
         [story_order || 0, story_date, title, description, image_url]
       );
    }
    
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
       await query('DELETE FROM story_sections WHERE id = ?', [id]);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

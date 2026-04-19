import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: "No ID provided" }, { status: 400 });
    }

    await query('DELETE FROM gallery_items WHERE id = ?', [id]);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Gallery Delete error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

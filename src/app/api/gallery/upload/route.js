import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { query } from '../../../../lib/db';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const filename = `gallery_${Date.now()}${path.extname(file.name)}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filepath = path.join(uploadDir, filename);

    // Save to public/uploads
    await writeFile(filepath, buffer);
    const fileUrl = `/uploads/${filename}`;

    // Get max order
    const rows = await query('SELECT MAX(image_order) as maxOrder FROM gallery_items');
    const nextOrder = (rows[0]?.maxOrder || 0) + 1;

    // Insert to gallery_items
    await query(
      'INSERT INTO gallery_items (image_url, image_order, span_type) VALUES (?, ?, ?)',
      [fileUrl, nextOrder, 'normal']
    );

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error("Gallery Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

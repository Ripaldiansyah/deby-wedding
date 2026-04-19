import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { query } from '../../../lib/db';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');
    const type = data.get('type'); // e.g., 'photo_hero', 'photo_bride', etc.

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const filename = `${type}_${Date.now()}${path.extname(file.name)}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filepath = path.join(uploadDir, filename);

    // Save to public/uploads
    await writeFile(filepath, buffer);
    const fileUrl = `/uploads/${filename}`;

    // Update DB setting
    await query(
      'INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
      [type, fileUrl, fileUrl]
    );

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

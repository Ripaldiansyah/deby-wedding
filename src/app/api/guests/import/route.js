import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';
import * as xlsx from 'xlsx';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet);

    let importedCount = 0;

    for (const row of rows) {
      // Expecting columns like "Name" and "Max Guests"
      const name = row['Name'] || row['Nama'] || row['guest_name'];
      const maxGuests = row['Max Guests'] || row['Maksimal Tamu'] || row['max_guests'] || 2;
      
      if (name) {
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        try {
          await query(
            'INSERT IGNORE INTO guests (guest_name, slug, max_guests) VALUES (?, ?, ?)',
            [name, slug, maxGuests]
          );
          importedCount++;
        } catch (dbErr) {
          console.error('Row insert error:', dbErr);
        }
      }
    }

    return NextResponse.json({ success: true, count: importedCount });
  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

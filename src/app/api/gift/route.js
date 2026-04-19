import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const gifts = await query('SELECT * FROM gift_accounts');
    return NextResponse.json({ gifts });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { id, bank_name, account_number, account_name, is_address, text_content, logo_url } = data;
    
    if (id) {
       // Update
       await query(
         'UPDATE gift_accounts SET bank_name=?, account_number=?, account_name=?, is_address=?, text_content=?, logo_url=? WHERE id=?',
         [bank_name, account_number, account_name, is_address ? 1 : 0, text_content, logo_url, id]
       );
    } else {
       // Insert
       await query(
         'INSERT INTO gift_accounts (bank_name, account_number, account_name, is_address, text_content, logo_url) VALUES (?, ?, ?, ?, ?, ?)',
         [bank_name, account_number, account_name, is_address ? 1 : 0, text_content, logo_url]
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
       await query('DELETE FROM gift_accounts WHERE id = ?', [id]);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

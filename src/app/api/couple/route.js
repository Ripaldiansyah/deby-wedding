import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // data expects role, full_name, nickname, father_name, mother_name, etc.
    const { role, full_name, nickname, short_profile, father_name, mother_name, instagram_url } = data;
    
    if (!role) {
      return NextResponse.json({ error: "Role (bride/groom) is required." }, { status: 400 });
    }

    await query(
      `UPDATE couple_profiles 
       SET full_name = ?, nickname = ?, short_profile = ?, father_name = ?, mother_name = ?, instagram_url = ? 
       WHERE role = ?`,
      [full_name, nickname, short_profile, father_name, mother_name, instagram_url, role]
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

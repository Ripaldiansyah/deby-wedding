import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ error: 'Fitur import Excel telah dinonaktifkan.' }, { status: 410 });
}

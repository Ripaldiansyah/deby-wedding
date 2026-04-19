import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const messages = await query(
      'SELECT * FROM rsvp_messages ORDER BY created_at DESC LIMIT 50'
    );
    return Response.json({ messages });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { guest_name, attendance, num_guests, message } = body;

    if (!guest_name || !attendance) {
      return Response.json(
        { error: 'Name and attendance are required' },
        { status: 400 }
      );
    }

    await query(
      'INSERT INTO rsvp_messages (guest_name, attendance, num_guests, message) VALUES (?, ?, ?, ?)',
      [guest_name, attendance, num_guests || 1, message || '']
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ error: 'Failed to submit RSVP' }, { status: 500 });
  }
}

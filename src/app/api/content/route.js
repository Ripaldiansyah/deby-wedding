import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [
      settings,
      couples,
      events,
      stories,
      gallery,
      gifts,
    ] = await Promise.all([
      query('SELECT * FROM site_settings'),
      query('SELECT * FROM couple_profiles'),
      query('SELECT * FROM event_details'),
      query('SELECT * FROM story_sections ORDER BY story_order ASC'),
      query('SELECT * FROM gallery_items ORDER BY image_order ASC'),
      query('SELECT * FROM gift_accounts'),
    ]);

    const settingsMap = {};
    settings.forEach((s) => {
      settingsMap[s.setting_key] = s.setting_value;
    });

    return Response.json({
      settings: settingsMap,
      couples,
      events,
      stories,
      gallery,
      gifts,
    });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

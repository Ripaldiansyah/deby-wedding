import WeddingTemplate from '../../components/WeddingTemplate';
import { query } from '../../lib/db';
import { notFound } from 'next/navigation';

export default async function GuestPage({ params }) {
  const { slug } = await params;
  
  if (slug === 'admin' || slug === 'api') {
    return notFound();
  }

  let guestName = null;

  try {
    const guests = await query('SELECT * FROM guests WHERE slug = ? LIMIT 1', [slug]);
    
    // We expect query to return an array of rows
    if (guests && guests.length > 0) {
      const guest = guests[0];
      guestName = guest.guest_name;
      
      // Mark as opened in the background (we can ignore errors if it fails)
      query('UPDATE guests SET has_opened = TRUE, opened_at = CURRENT_TIMESTAMP WHERE id = ?', [guest.id]).catch(() => {});
    }
  } catch (error) {
    console.error('Error fetching guest:', error);
  }

  if (guestName) {
    return <WeddingTemplate guestName={guestName} />;
  }

  // Fallback if not found: Format the slug beautifully
  // Converts "Ripal+dan+partner" -> "Ripal dan partner" or "Ripal-dan-partner" -> "Ripal dan partner"
  let decodedName = decodeURIComponent(slug).replace(/\+/g, ' ').replace(/-/g, ' ');
  decodedName = decodedName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return <WeddingTemplate guestName={decodedName} />;
}

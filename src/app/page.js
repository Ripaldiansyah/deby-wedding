import WeddingTemplate from '../components/WeddingTemplate';

// This is the default page for public access without a specific guest name
export default async function Page({ searchParams }) {
  const params = await searchParams;
  const to = params?.to;

  let guestName = "Tamu Undangan";

  if (to) {
    guestName = decodeURIComponent(to).replace(/\+/g, ' ').replace(/-/g, ' ');
    guestName = guestName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  return <WeddingTemplate guestName={guestName} />;
}

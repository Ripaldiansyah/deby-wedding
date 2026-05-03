import { Playfair_Display, Plus_Jakarta_Sans, Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";
import { query } from "@/lib/db";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export async function generateMetadata() {
  try {
    const couples = await query('SELECT nickname, role FROM couple_profiles');
    if (couples && couples.length > 0) {
      const bride = 'Deby';
      const groom = 'Alam';
      return {
        title: `${bride} & ${groom} — The Wedding`,
        description: `You are cordially invited to the wedding celebration of ${bride} & ${groom}.`
      };
    }
  } catch (error) {
    console.error('Error fetching metadata:', error);
  }
  
  return {
    title: "The Wedding",
    description: "You are cordially invited to the wedding celebration."
  };
}


export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${jakarta.variable} ${cormorant.variable} ${greatVibes.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

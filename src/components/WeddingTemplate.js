"use client";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Music,
  VolumeX,
  MapPin,
  Gift,
  Copy,
  Check,
  Heart,
  X,
  PlayCircle,
  Mail,
} from "lucide-react";
import { weddingData } from "@/data/weddingData";

/* ═══════════ HELPERS ═══════════ */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function OrnamentDivider({ light = false }) {
  const color = light ? "rgba(253,248,243,0.4)" : "rgba(153,44,37,0.4)";
  return (
    <div className="ornament-line" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
        <path
          d="M7 0L8.75 5.25L14 7L8.75 8.75L7 14L5.25 8.75L0 7L5.25 5.25L7 0Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

function BankLogo({ name, url }) {
  if (url)
    return (
      <img
        loading="lazy"
        decoding="async"
        src={url}
        alt={name}
        style={{ width: "80px", height: "80px", objectFit: "contain" }}
      />
    );
  const n = (name || "").toLowerCase();
  if (n.includes("bca"))
    return (
      <svg width="56" height="20" viewBox="0 0 100 32">
        <text
          x="0"
          y="24"
          fontFamily="Arial"
          fontWeight="bold"
          fontSize="22"
          fill="#003594"
        >
          BCA
        </text>
      </svg>
    );
  if (n.includes("mandiri"))
    return (
      <svg width="72" height="20" viewBox="0 0 120 32">
        <text
          x="0"
          y="24"
          fontFamily="Arial"
          fontWeight="bold"
          fontSize="20"
          fill="#003d79"
        >
          mandiri
        </text>
      </svg>
    );
  return <PlayCircle size={22} color="#992c25" opacity={0.4} />;
}

function InstagramIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   HERO LEFT PANEL
   ═══════════════════════════════════════════ */
function HeroLeft({ settings, bride, groom }) {
  const bgStyle = settings.photo_hero
    ? {
        backgroundImage: `url(${settings.photo_hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        background:
          "linear-gradient(135deg, #3D1A18 0%, #7A231E 50%, #3D1A18 100%)",
      };

  const dateFormatted = settings?.hero_date
    ? new Date(settings.hero_date + "T00:00:00")
        .toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        .toUpperCase()
    : "MINGGU, 6 APRIL 2025";

  return (
    <div className="split-left" style={bgStyle}>
      <div className="hero-overlay" />
      <div className="hero-text" style={{ paddingBottom: "80px" }}>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.6rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(253,248,243,0.7)",
            marginBottom: "12px",
          }}
        >
          {settings?.hero_greeting || "THE WEDDING OF"}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="shimmer-text"
          style={{
            fontFamily: "var(--font-script)",
            fontSize: "clamp(3.5rem, 7vw, 5.5rem)",
            fontWeight: 400,
            lineHeight: 1.2,
            textShadow: "2px 4px 12px rgba(0,0,0,0.5)",
            marginBottom: "16px",
          }}
        >
          {bride?.nickname || "Debby"}{" "}
          <span style={{ fontSize: "0.65em", opacity: 0.8, color: "#fff" }}>
            &amp;
          </span>{" "}
          {groom?.nickname || "Alam"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.62rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            color: "rgba(253,248,243,0.75)",
          }}
        >
          {dateFormatted}
        </motion.p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   COVER PANEL (right side, before open)
   ═══════════════════════════════════════════ */
function CoverPanel({ onOpen, guestName, bride, groom, settings }) {
  const dateStr = settings?.hero_date
    ? settings.hero_date.split("-").reverse().join(" . ")
    : "06 . 04 . 2025";

  return (
    <motion.div
      className="cover-panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: 80 }}
      transition={{ duration: 0.1 }}
      style={{
        backgroundImage: "url('/assets/main/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(26, 10, 9, 0.65)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Top decoration */}
        {/* <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, transparent, #992c25, transparent)' }} /> */}

        {/* Oval couple photo */}
        <Reveal>
          <div
            style={{
              width: "200px",
              height: "280px",
              borderRadius: "80px 80px 80px 80px",
              margin: "0 auto 24px",
              border: "3px solid rgba(153,44,37,0.5)",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #3D1A18, #5C2420)",
              boxShadow:
                "0 12px 40px rgba(153,44,37,0.3), 0 0 0 6px rgba(153,44,37,0.1)",
            }}
          >
            {settings?.photo_story ? (
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <Image
                  src={settings.photo_story}
                  alt="Couple Story"
                  fill
                  sizes="200px"
                  priority={false}
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : (
              <Heart size={48} color="#992c25" opacity={0.4} />
            )}
          </div>
        </Reveal>

        {/* Date */}
        <Reveal delay={0.1}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.62rem",
              letterSpacing: "0.25em",
              color: "rgba(253,248,243,0.5)",
              marginBottom: "12px",
            }}
          >
            {dateStr}
          </p>
        </Reveal>

        {/* Names */}
        <Reveal delay={0.2}>
          <h1
            className="shimmer-text"
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "clamp(3rem, 8vw, 3.8rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              marginBottom: "4px",
            }}
          >
            {bride?.nickname || "Debby"}
          </h1>
          <p
            className="shimmer-text"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.4rem",
              fontStyle: "italic",
              margin: "8px 0",
              opacity: 0.9,
            }}
          >
            &amp;
          </p>
          <h1
            className="shimmer-text"
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "clamp(3rem, 8vw, 3.8rem)",
              fontWeight: 400,
              lineHeight: 1.1,
            }}
          >
            {groom?.nickname || "Alam"}
          </h1>
        </Reveal>

        {/* Guest info */}
        <Reveal delay={0.3}>
          <div
            style={{
              marginTop: "32px",
              borderTop: "1px solid rgba(153,44,37,0.3)",
              paddingTop: "24px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(253,248,243,0.45)",
                marginBottom: "6px",
              }}
            >
              Kepada Yth.
            </p>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.05rem",
                fontWeight: 600,
                color: "#FAF6F1",
                marginBottom: "24px",
              }}
            >
              {guestName || "Tamu Undangan"}
            </p>
            <button className="open-btn" onClick={onOpen}>
              <Mail size={13} /> Open Invitation
            </button>
          </div>
        </Reveal>

        {/* Bottom decoration */}
        {/* <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, transparent, #992c25, transparent)' }} /> */}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   HERO VIDEO (right top section after open)
   ═══════════════════════════════════════════ */
function RightHeroVideo({ settings, bride, groom }) {
  const hasVideo = !!settings.video_url;
  const dateFormatted = settings?.hero_date
    ? new Date(settings.hero_date + "T00:00:00").toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "6 April 2025";

  const [showHexagon, setShowHexagon] = useState(false);

  useEffect(() => {
    if (!hasVideo) {
      const t = setTimeout(() => setShowHexagon(true), 4000);
      return () => clearTimeout(t);
    }
  }, [hasVideo]);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#1a0a09",
      }}
    >
      {hasVideo ? (
        <video
          autoPlay
          muted
          playsInline
          preload="auto"
          onTimeUpdate={(e) => {
            if (e.target.currentTime >= 7 && !showHexagon) {
              setShowHexagon(true);
            }
          }}
          onEnded={(e) => {
            e.target.currentTime = 11;
            e.target.play();
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          src={settings.video_url}
        />
      ) : settings.photo_hero ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${settings.photo_hero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ) : null}

      {/* <div style={{ position: 'absolute', inset: 0, background: 'rgba(26, 10, 9, 0.65)', zIndex: 0 }} /> */}

      <AnimatePresence>
        {showHexagon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.5, ease: "backInOut" }}
            style={{
              position: "absolute",
              zIndex: 10,
              width: "100vw",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.36)",
            }}
          >
            <div
              style={{
                position: "relative",
                zIndex: 3,
                textAlign: "center",
                padding: "0 24px",
                width: "100%",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(253,248,243,0.65)",
                    marginBottom: "20px",
                  }}
                >
                  {settings?.hero_greeting || "THE WEDDING OF"}
                </p>
                <h2
                  className="shimmer-text"
                  style={{
                    fontFamily: "var(--font-script)",
                    fontSize: "clamp(4rem, 10vw, 6rem)",
                    fontWeight: 400,
                    lineHeight: 1.3,
                    textShadow: "2px 4px 16px rgba(0,0,0,0.6)",
                    marginBottom: "0",
                  }}
                >
                  {bride?.nickname || "Debby"}
                </h2>
                <br></br>
                <p
                  className="shimmer-text"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.2rem",
                    fontStyle: "italic",
                    margin: "10px 0",
                  }}
                >
                  &amp;
                </p>
                <br></br>{" "}
                <h2
                  className="shimmer-text"
                  style={{
                    fontFamily: "var(--font-script)",
                    fontSize: "clamp(4rem, 10vw, 6rem)",
                    fontWeight: 400,
                    lineHeight: 1.3,
                    textShadow: "2px 4px 16px rgba(0,0,0,0.6)",
                    marginBottom: "0",
                  }}
                >
                  {groom?.nickname || "Alam"}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    color: "rgba(253,248,243,0.7)",
                    marginTop: "24px",
                  }}
                >
                  {dateFormatted.toUpperCase()}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════
   QUOTE SECTION
   ═══════════════════════════════════════════ */
function QuoteSection({ settings }) {
  return (
    <div className="section-frame" style={{ position: "relative" }}>
      <div className="inset-card card-ivory">
        <Reveal>
          <h2
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "3.2rem",
              color: "#FAF6F1",
              marginBottom: "24px",
              fontWeight: 400,
            }}
          >
            We Found Love
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "0.92rem",
              lineHeight: 1.9,
              color: "rgba(253,248,243,0.85)",
              maxWidth: "300px",
              margin: "0 auto 20px",
            }}
          >
            &ldquo;
            {settings?.quote_text ||
              "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu..."}
            &rdquo;
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.7rem",
              color: "rgba(253,248,243,0.6)",
              letterSpacing: "0.15em",
              fontWeight: 600,
            }}
          >
            {settings?.quote_author || "QS AR-RUM : 21"}
          </p>
        </Reveal>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   COUPLE SECTION
   ═══════════════════════════════════════════ */
function PersonCard({ person, photo_url, delay = 0, isBride = false }) {
  if (!person) return null;
  const igHandle = person.instagram_url
    ? person.instagram_url.split("/").filter(Boolean).pop()
    : "";
  return (
    <Reveal delay={delay}>
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
          position: "relative",
        }}
      >
        {/* <motion.img loading="lazy" decoding="async" src="/assets/main/coconut-tree.png"
          initial={{ opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, margin: "0px 0px -50px 0px" }}
          transition={{ duration: 2, ease: [0.45, 0, 0.55, 1], delay: 0.4 }}
          style={{
            // overflow: "hidden",
            position: "absolute",
            top: "-6  0px",
            right: "40%",
            marginLeft: "0px",
            height: "310px",
            width: "420px",
            objectFit: "contain",
            // transformOrigin: ' center',
            zIndex: -1,
            pointerEvents: "none",
          }}
        /> */}
        {/* <motion.img loading="lazy" decoding="async" src="/assets/main/pelepah.png"
            initial={{ opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 2, ease: [0.45, 0, 0.55, 1], delay:  0.4 }}
            style={{ 
              // overflow: "hidden",
              position: 'absolute', 
              top: '-6  0px', 
              right: '40%',
              marginLeft: '0px',
              height: '310px',
              width: '420px',
              objectFit: 'contain',
              // transformOrigin: ' center',
              zIndex: -1, 
              pointerEvents: 'none' 
            }}
          /> */}
        {/* Oval photo */}
        <div
          style={{
            width: "160px",
            height: "220px",
            borderRadius: "80px 80px 80px 80px",
            margin: "0 auto 20px",
            border: "2px solid rgba(253,248,243,0.3)",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #3D1A18, #4D2624)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          {photo_url ? (
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <Image
                src={photo_url}
                alt={person.full_name}
                fill
                sizes="160px"
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : (
            <Heart size={36} color="rgba(253,248,243,0.4)" />
          )}
        </div>
        <br></br>

        <h3
          className="shimmer-text"
          style={{
            fontFamily: "var(--font-script)",
            fontSize: "2.6rem",
            fontWeight: 400,
            lineHeight: 1.2,
            marginBottom: "8px",
          }}
        >
          {person.nickname}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "rgba(253,248,243,0.85)",
            marginBottom: "4px",
          }}
        >
          {person.full_name}
        </p>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.72rem",
            color: "rgba(253,248,243,0.5)",
            marginBottom: "2px",
          }}
        >
          {person.parent_prefix || "Putra/Putri dari"}
        </p>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.78rem",
            color: "rgba(253,248,243,0.7)",
            lineHeight: 1.7,
          }}
        >
          {person.father_name}
          <br />
          &amp; {person.mother_name}
        </p>
        {/* {igHandle && (
          <a href={person.instagram_url} target="_blank" rel="noopener noreferrer" className="ig-btn" style={{ marginTop: '14px', color: '#FAF6F1', borderColor: 'rgba(253,248,243,0.3)', background: 'rgba(253,248,243,0.05)' }}>
            <InstagramIcon /> {igHandle}
          </a>
        )} */}
      </div>
    </Reveal>
  );
}

function MainCoupleSection({ bride, groom, settings }) {
  return (
    <div
      className="section-frame bg-fixed md:bg-scroll "
      style={{
        position: "relative",
        backgroundImage: "url('/assets/main/bg_1.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: " top",
        // backgroundAttachment: "fixed",
        backgroundRepeat: "revert-layer",
      }}
    >
      <div className="inset-card card-dark">
        <Reveal>
          <motion.div
            animate={{
              y: [0, -15, 0],
              x: [0, 8, 0],
              rotate: [0, 4, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 7,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: "5px",
              left: "255px",
              zIndex: 1,
            }}
          >
            <motion.img
              loading="lazy"
              decoding="async"
              src="/assets/main/wayang1.png"
              alt="Ornament Bunga Kiri Atas"
              initial={{ opacity: 0, scale: 0.8, rotate: 180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              style={{ width: "220px", height: "220px", objectFit: "contain" }}
            />
          </motion.div>
          <p
            className="section-label"
            style={{ color: "rgba(253,248,243,0.6)" }}
          >
            Mempelai
          </p>
          <h2
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "3.2rem",
              color: "#FAF6F1",
              marginBottom: "8px",
              fontWeight: 400,
            }}
          >
            We Are Getting Married!
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              color: "rgba(253,248,243,0.8)",
              lineHeight: 1.8,
              maxWidth: "280px",
              margin: "0 auto 48px",
              opacity: 0.85,
            }}
          >
            {settings?.intro_text ||
              "Dengan memohon Rahmat & Ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i."}
          </p>
        </Reveal>

        <PersonCard
          person={bride}
          photo_url={settings?.photo_bride}
          delay={0.2}
          isBride={true}
        />

        <Reveal delay={0.3}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              justifyContent: "center",
              margin: "4px 0 32px",
            }}
          >
            <div
              style={{
                height: "1px",
                width: "60px",
                background: "rgba(253,248,243,0.2)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.4rem",
                color: "rgba(253,248,243,0.8)",
                fontStyle: "italic",
              }}
            >
              &amp;
            </span>
            <div
              style={{
                height: "1px",
                width: "60px",
                background: "rgba(253,248,243,0.2)",
              }}
            />
          </div>
        </Reveal>

        <PersonCard
          person={groom}
          photo_url={settings?.photo_groom}
          delay={0.4}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   COUNTDOWN
   ═══════════════════════════════════════════ */
function CountdownSection({ settings, bride, groom }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const targetDate = settings?.hero_date
      ? new Date(`${settings.hero_date}T08:00:00+07:00`)
      : new Date("2025-04-06T08:00:00+07:00");

    const tick = () => {
      const diff = targetDate - new Date();
      if (diff <= 0) {
        setT({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      setT({
        d: Math.floor(diff / 864e5),
        h: Math.floor((diff / 36e5) % 24),
        m: Math.floor((diff / 6e4) % 60),
        s: Math.floor((diff / 1e3) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [settings?.hero_date]);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="section-frame" style={{ position: "relative" }}>
      {/* Ornamen Bunga Pojok Kiri Atas */}
      <motion.div
        animate={{
          y: [0, 15, 0],
          x: [0, -8, 0],
          rotate: [0, -4, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          bottom: "-105px",
          left: "-150px",
          zIndex: 4,
        }}
      >
        <motion.img
          loading="lazy"
          decoding="async"
          src="/assets/main/bunga.png"
          alt="Ornament Bunga Kiri Atas"
          initial={{ opacity: 0, scale: 0.8, rotate: 180 }}
          whileInView={{ opacity: 0.8, scale: 1, rotate: 60 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          style={{ width: "420px", height: "420px", objectFit: "contain" }}
        />
      </motion.div>

      {/* Ornamen Bunga Pojok Kanan Bawah */}
      <motion.div
        animate={{
          y: [0, 15, 0],
          x: [0, -8, 0],
          rotate: [0, -4, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
          delay: 0.5,
        }}
        style={{
          position: "absolute",
          bottom: "-105px",
          right: "-150px",
          zIndex: 4,
        }}
      >
        <motion.img
          loading="lazy"
          decoding="async"
          src="/assets/main/bunga.png"
          alt="Ornament Bunga Kanan Bawah"
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 0.8, scale: 1, rotate: 30 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          style={{ width: "420px", height: "420px", objectFit: "contain" }}
        />
      </motion.div>

      <div
        className="inset-card card-ivory"
        style={{ position: "relative", zIndex: 6, textAlign: "center" }}
      >
        <Reveal>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(253,248,243,0.6)",
              marginBottom: "16px",
              fontWeight: 600,
            }}
          >
            Menghitung Hari
          </p>
          <h2
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "3.2rem",
              color: "#FAF6F1",
              fontWeight: 400,
              marginBottom: "32px",
            }}
          >
            Save The Date
          </h2>
          <div className="countdown-grid">
            {[
              ["d", "Days"],
              ["h", "Hours"],
              ["m", "Minutes"],
              ["s", "Seconds"],
            ].map(([k, label]) => (
              <div
                key={k}
                className="countdown-box"
                style={{ borderColor: "rgba(253,248,243,0.2)" }}
              >
                <div className="num" style={{ color: "#FAF6F1" }}>
                  {pad(t[k])}
                </div>
                <div
                  className="unit"
                  style={{ color: "rgba(253,248,243,0.7)" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              color: "rgba(253,248,243,0.8)",
              marginTop: "24px",
              fontWeight: 600,
            }}
          >
            {settings?.hero_date
              ? new Date(settings.hero_date + "T00:00:00")
                  .toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                  .toUpperCase()
              : "MINGGU, 6 APRIL 2025"}
          </p>

          <a
            href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+Wedding+of+${encodeURIComponent(bride?.nickname || "Mempelai")}+%26+${encodeURIComponent(groom?.nickname || "Mempelai")}&dates=${settings?.hero_date ? settings.hero_date.replace(/-/g, "") : "20250406"}T010000Z/${settings?.hero_date ? settings.hero_date.replace(/-/g, "") : "20250406"}T050000Z&details=Merupakan+kehormatan+dan+kebahagiaan+bagi+kami+atas+kehadiran+Anda.`}
            target="_blank"
            rel="noopener noreferrer"
            className="open-btn"
            style={{
              marginTop: "24px",
              display: "inline-flex",
              padding: "12px 24px",
              fontSize: "0.8rem",
            }}
          >
            Simpan ke Google Calendar
          </a>
        </Reveal>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   EVENT SECTION
   ═══════════════════════════════════════════ */
function EventCard({ event, delay = 0 }) {
  const dateFormatted = event.date
    ? new Date(event.date + "T00:00:00").toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <Reveal delay={delay}>
      <div
        className="event-arch"
        style={{
          background: "rgba(253,248,243,0.05)",
          borderColor: "rgba(253,248,243,0.15)",
          boxShadow: "none",
        }}
      >
        {/* Icon */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Heart size={32} color="#FAF6F1" style={{ opacity: 0.85 }} />
        </div>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.62rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(253,248,243,0.6)",
            marginBottom: "8px",
          }}
        >
          Insya Allah akan dilaksanakan pada
        </p>
        <h3
          style={{
            fontFamily: "var(--font-script)",
            fontSize: "2.4rem",
            color: "#FAF6F1",
            fontWeight: 400,
            marginBottom: "16px",
          }}
        >
          {event.type}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "0.92rem",
            fontWeight: 700,
            color: "#FAF6F1",
            marginBottom: "4px",
          }}
        >
          {dateFormatted}
        </p>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.8rem",
            color: "rgba(253,248,243,0.8)",
            marginBottom: "20px",
          }}
        >
          {event.start_time} – {event.end_time} WIB
        </p>
        <div
          style={{
            height: "1px",
            background: "rgba(253,248,243,0.1)",
            margin: "0 20px 20px",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "8px",
          }}
        >
          <MapPin size={18} color="#FAF6F1" />
        </div>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.88rem",
            fontWeight: 600,
            color: "#FAF6F1",
            marginBottom: "4px",
          }}
        >
          {event.location_name}
        </p>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.76rem",
            color: "rgba(253,248,243,0.7)",
            lineHeight: 1.6,
            marginBottom: "20px",
          }}
        >
          {event.address}
        </p>
        {event.map_url && (
          <a
            href={event.map_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "9px 22px",
              border: "1.5px solid rgba(253,248,243,0.3)",
              borderRadius: "50px",
              background: "transparent",
              color: "#FAF6F1",
              fontFamily: "var(--font-sans)",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            <MapPin size={12} /> Google Maps
          </a>
        )}
      </div>
    </Reveal>
  );
}

function EventSection({ events }) {
  if (!events || events.length === 0) return null;
  return (
    <div
      className="section-frame bg-fixed md:bg-scroll "
      style={{
        position: "relative",
        // backgroundImage: "url('/assets/main/bg_1.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: " top",
        // backgroundAttachment: "fixed",
        backgroundRepeat: "revert-layer",
      }}
    >
      <div className="inset-card card-dark">
        <Reveal>
          <p
            className="section-label"
            style={{ color: "rgba(253,248,243,0.6)" }}
          >
            Waktu &amp; Tempat
          </p>
          <h2
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "3.2rem",
              color: "#FAF6F1",
              fontWeight: 400,
              marginBottom: "10px",
            }}
          >
            Acara Pernikahan
          </h2>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {events.map((e, i) => (
            <EventCard key={i} event={e} delay={0.1 * i} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   STORY SECTION
   ═══════════════════════════════════════════ */
function StorySection({ stories }) {
  if (!stories || stories.length === 0) return null;
  return (
    <div className="section-frame" style={{ position: "relative" }}>
      <div className="inset-card card-ivory">
        <Reveal>
          <p
            className="section-label"
            style={{ color: "rgba(253,248,243,0.6)" }}
          >
            Kisah Kami
          </p>
          <h2
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "3.2rem",
              color: "#FAF6F1",
              fontWeight: 400,
              marginBottom: "40px",
            }}
          >
            Our Love Story
          </h2>
        </Reveal>
        <div style={{ textAlign: "left" }}>
          {stories.map((s, i) => (
            <Reveal key={i} delay={0.1 * i}>
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  marginBottom: "32px",
                  alignItems: "flex-start",
                }}
              >
                {s.image_url && (
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      flexShrink: 0,
                      borderRadius: "12px",
                      backgroundImage: `url(${s.image_url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      border: "2px solid rgba(253,248,243,0.2)",
                    }}
                  />
                )}
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(253,248,243,0.6)",
                      marginBottom: "4px",
                      fontWeight: 600,
                    }}
                  >
                    {s.date}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "#FAF6F1",
                      marginBottom: "6px",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.8rem",
                      color: "rgba(253,248,243,0.8)",
                      lineHeight: 1.8,
                    }}
                  >
                    {s.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PRAYER SECTION
   ═══════════════════════════════════════════ */
function PrayerSection() {
  return (
    <div
      className="section-frame"
      style={{
        position: "relative",
        backgroundImage: "url('/assets/main/bgg.jpeg')",
      }}
    >
      <div className="inset-card card-dark" style={{ borderRadius: "24px" }}>
        <Reveal>
          <div
            style={{
              background: "rgba(253,248,243,0.05)",
              border: "1px solid rgba(253,248,243,0.1)",
              borderRadius: "16px",
              padding: "40px 24px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                fontWeight: 600,
                color: "#FAF6F1",
                marginBottom: "16px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Doa Pengantin
            </p>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.6rem",
                color: "#FAF6F1",
                marginBottom: "20px",
                direction: "rtl",
                lineHeight: 2,
              }}
            >
              بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي
              خَيْرٍ
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "0.92rem",
                color: "rgba(253,248,243,0.75)",
                lineHeight: 1.9,
              }}
            >
              &ldquo;Semoga Allah memberkahimu dan memberkahi atas kamu, dan
              mengumpulkan kalian berdua dalam kebaikan.&rdquo;
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                color: "rgba(253,248,243,0.45)",
                marginTop: "16px",
                letterSpacing: "0.1em",
              }}
            >
              (HR. Abu Dawud no. 2130)
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
/* GALLERY SECTION */
function GallerySection({ gallery, setLightboxIdx }) {
  const images =
    gallery && gallery.length > 0
      ? gallery
      : Array(6).fill({ image_url: "", span_type: "normal" });

  return (
    <div className="section-frame" style={{ position: "relative" }}>
      <div
        className="inset-card card-ivory"
        style={{ padding: "48px 12px 48px", overflow: "hidden" }}
      >
        <Reveal>
          <div style={{ textAlign: "center", padding: "0 12px 36px" }}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.58rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(253,248,243,0.45)",
                marginBottom: "14px",
                fontWeight: 600,
              }}
            >
              Memories Together
            </p>
            <h2
              style={{
                fontFamily: "var(--font-script)",
                fontSize: "3.4rem",
                color: "#FAF6F1",
                fontWeight: 400,
                lineHeight: 1,
                marginBottom: "20px",
              }}
            >
              Our Gallery
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  height: "1px",
                  width: "48px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(205,175,120,0.7))",
                }}
              />
              <div
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "rgba(205,175,120,0.9)",
                }}
              />
              <div
                style={{
                  height: "1px",
                  width: "48px",
                  background:
                    "linear-gradient(90deg, rgba(205,175,120,0.7), transparent)",
                }}
              />
            </div>
          </div>
        </Reveal>

        <style
          dangerouslySetInnerHTML={{
            __html: `
          .luxury-grid-item img { transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
          @media (hover: hover) { .luxury-grid-item:hover img { transform: scale(1.08); } }
        `,
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
            gridAutoFlow: "dense",
            padding: "0 6px",
          }}
        >
          {images.map((img, i) => {
            let rowSpan = 1;
            let colSpan = 1;
            let aspectRatio = "1/1";

            if (img.span_type === "tall") {
              rowSpan = 2;
              aspectRatio = "1/2.05";
            } else if (img.span_type === "wide") {
              colSpan = 2;
              aspectRatio = "2.1/1";
            } else if (img.span_type === "large") {
              colSpan = 2;
              rowSpan = 2;
              aspectRatio = "1/1";
            }

            return (
              <motion.div
                key={i}
                className="luxury-grid-item"
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.8,
                  delay: (i % 3) * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => setLightboxIdx(i)}
                style={{
                  gridRow: `span ${rowSpan}`,
                  gridColumn: `span ${colSpan}`,
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: "pointer",
                  aspectRatio: aspectRatio,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  border: "1px solid rgba(205,175,120,0.3)",
                  background: "#2B1110",
                }}
              >
                {img.image_url ? (
                  <Image
                    src={img.image_url}
                    alt={`Gallery item ${i}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    style={{
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Heart size={24} color="rgba(253,248,243,0.2)" />
                  </div>
                )}

                {/* Inner gold frame decoration (very thin) */}
                {/* <div style={{ position: 'absolute', inset: '10px', border: '1px solid rgba(205,175,120,0.25)', borderRadius: '8px', zIndex: 1, pointerEvents: 'none' }}></div> */}

                {/* Luxury glass overlay with + icon */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  whileTap={{ opacity: 1 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(26,10,9,0.7) 0%, rgba(26,10,9,0.1) 100%)",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    paddingBottom: "20px",
                    backdropFilter: "blur(3px)",
                    pointerEvents: "none",
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: "1px solid rgba(205,175,120,0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0,0,0,0.4)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                    }}
                  >
                    <span
                      style={{
                        color: "rgba(205,175,120,0.9)",
                        fontSize: "1.2rem",
                        lineHeight: "1",
                        fontWeight: 300,
                      }}
                    >
                      +
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
//     </div>
//   );
// }
// function GallerySection({ gallery }) {
//   const [lightboxIdx, setLightboxIdx] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const carouselRef = useRef(null);

//   const images = gallery && gallery.length > 0 ? gallery : Array(6).fill({ image_url: '', span_type: 'normal' });

//   const closeLightbox = () => setLightboxIdx(null);
//   const prevPhoto = (e) => { e.stopPropagation(); setLightboxIdx(function(i) { return (i - 1 + images.length) % images.length; }); };
//   const nextPhoto = (e) => { e.stopPropagation(); setLightboxIdx(function(i) { return (i + 1) % images.length; }); };

//   const handleScroll = (e) => {
//     if (!carouselRef.current) return;
//     const scrollLeft = e.target.scrollLeft;
//     // Calculate based on first child's width
//     const itemWidth = carouselRef.current.children[1].offsetWidth;
//     const newIndex = Math.round(scrollLeft / itemWidth);
//     if(newIndex !== activeIndex) {
//       setActiveIndex(newIndex);
//     }
//   };

//   const scrollToSlide = (index) => {
//     if (!carouselRef.current) return;
//     const itemWidth = carouselRef.current.children[1].offsetWidth;
//     carouselRef.current.scrollTo({ left: index * itemWidth, behavior: 'smooth' });
//   };

//   return (
//     <div className="section-frame">
//       <div className="inset-card card-ivory" style={{ padding: '48px 0 40px', overflow: 'hidden' }}>
//         <Reveal>
//           <div style={{ textAlign: 'center', padding: '0 24px 32px' }}>
//             <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(253,248,243,0.45)', marginBottom: '14px', fontWeight: 600 }}>Memories Together</p>
//             <h2 style={{ fontFamily: 'var(--font-script)', fontSize: '3.4rem', color: '#FAF6F1', fontWeight: 400, lineHeight: 1, marginBottom: '20px' }}>Our Gallery</h2>
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
//               <div style={{ height: '1px', width: '48px', background: 'linear-gradient(90deg, transparent, rgba(205,175,120,0.7))' }} />
//               <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(205,175,120,0.9)' }} />
//               <div style={{ height: '1px', width: '48px', background: 'linear-gradient(90deg, rgba(205,175,120,0.7), transparent)' }} />
//             </div>
//           </div>
//         </Reveal>

//         <Reveal delay={0.1}>
//           <div style={{ position: 'relative', width: '100%', maxWidth: '100vw' }}>
//             <div
//               ref={carouselRef}
//               onScroll={handleScroll}
//               style={{
//                 display: 'flex',
//                 overflowX: 'auto',
//                 scrollSnapType: 'x mandatory',
//                 scrollBehavior: 'smooth',
//                 padding: '0 8%',
//                 paddingBottom: '32px',
//                 pointerEvents: 'auto'
//               }}
//               className="no-scrollbar"
//             >
//               <style dangerouslySetInnerHTML={{__html: '.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }'}} />

//               {images.map((img, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     minWidth: '100%',
//                     flex: '0 0 100%',
//                     scrollSnapAlign: 'center',
//                     padding: '0 8px'
//                   }}
//                 >
//                   <motion.div
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => setLightboxIdx(i)}
//                     style={{
//                       width: '100%',
//                       aspectRatio: '3/4.2',
//                       borderRadius: '16px',
//                       overflow: 'hidden',
//                       boxShadow: activeIndex === i ? '0 24px 48px rgba(0,0,0,0.4)' : '0 12px 24px rgba(0,0,0,0.15)',
//                       border: '1px solid rgba(205,175,120,0.2)',
//                       position: 'relative',
//                       cursor: 'pointer',
//                       transform: activeIndex === i ? 'scale(1)' : 'scale(0.92)',
//                       opacity: activeIndex === i ? 1 : 0.5,
//                       transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
//                     }}
//                   >
//                     {img.image_url ? (
//                       <img src={img.image_url} alt={"Gallery " + (i+1)} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
//                     ) : (
//                       <div style={{ width: '100%', height: '100%', background: '#3D1A18' }}></div>
//                     )}
//                     <div style={{ position: 'absolute', inset: '16px', border: '1px solid rgba(205,175,120,0.3)', borderRadius: '10px', zIndex: 2, pointerEvents: 'none' }}></div>
//                   </motion.div>
//                 </div>
//               ))}
//             </div>

//             <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '-8px', flexWrap: 'wrap', padding: '0 24px' }}>
//               {images.map((_, i) => (
//                 <div
//                   key={i}
//                   onClick={() => scrollToSlide(i)}
//                   style={{
//                     width: activeIndex === i ? '24px' : '6px',
//                     height: '6px',
//                     borderRadius: '3px',
//                     background: activeIndex === i ? 'rgba(205,175,120,1)' : 'rgba(253,248,243,0.2)',
//                     transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//                     cursor: 'pointer'
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//         </Reveal>

//         <AnimatePresence>
//           {lightboxIdx !== null && (
//              <motion.div className="lightbox-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={closeLightbox}>
//              <motion.button whileTap={{ scale: 0.9 }} onClick={closeLightbox} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(205,175,120,0.4)', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', color: '#FAF6F1', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', zIndex: 10 }}>
//                <X size={16} />
//              </motion.button>
//              <motion.button whileTap={{ scale: 0.9 }} onClick={prevPhoto} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(205,175,120,0.4)', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', color: '#FAF6F1', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', zIndex: 10 }}>‹</motion.button>
//              <motion.button whileTap={{ scale: 0.9 }} onClick={nextPhoto} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(205,175,120,0.4)', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', color: '#FAF6F1', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', zIndex: 10 }}>›</motion.button>
//              <AnimatePresence mode="wait">
//                <motion.div key={lightboxIdx} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.28 }} onClick={function(e) { e.stopPropagation(); }} style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 32px 100px rgba(0,0,0,0.8)', border: '1px solid rgba(205,175,120,0.2)' }}>
//                  {images[lightboxIdx] && images[lightboxIdx].image_url
//                    ? <img loading="lazy" decoding="async" src={images[lightboxIdx].image_url} alt="" style={{ display: 'block', maxWidth: '88vw', maxHeight: '78vh', objectFit: 'contain' }} />
//                    : <div style={{ width: '70vw', height: '70vw', maxWidth: '320px', maxHeight: '320px', background: '#3D1A18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Heart size={48} color="rgba(253,248,243,0.2)" /></div>
//                  }
//                </motion.div>
//              </AnimatePresence>
//              <div style={{ position: 'absolute', bottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                {images.map(function(_, idx) {
//                  return <div key={idx} onClick={function(e) { e.stopPropagation(); setLightboxIdx(idx); }} style={{ width: idx === lightboxIdx ? '18px' : '6px', height: '6px', borderRadius: '3px', background: idx === lightboxIdx ? 'rgba(205,175,120,0.9)' : 'rgba(255,255,255,0.3)', cursor: 'pointer', transition: 'all 0.3s' }} />;
//                })}
//              </div>
//            </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }
/* ═══════════════════════════════════════════
   GIFT SECTION
   ═══════════════════════════════════════════ */
function GiftSection({ gifts }) {
  const [copied, setCopied] = useState(null);
  if (!gifts || gifts.length === 0) return null;

  const doCopy = (text, idx) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ""));
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="section-frame">
      <div className="inset-card card-ivory" style={{ borderRadius: "24px" }}>
        <Reveal>
          <p
            className="section-label"
            style={{ color: "rgba(253,248,243,0.6)" }}
          >
            Wedding Gift
          </p>
          <h2
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "3.2rem",
              color: "#FAF6F1",
              fontWeight: 400,
              marginBottom: "12px",
            }}
          >
            Kirim Kado
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              color: "rgba(253,248,243,0.8)",
              marginBottom: "36px",
              maxWidth: "280px",
              margin: "0 auto 36px",
              lineHeight: 1.8,
              opacity: 0.85,
            }}
          >
            Kehadiran Anda adalah hadiah terbesar bagi kami.
          </p>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {gifts
            .filter((g) => !g.is_address)
            .map((a, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <div
                  style={{
                    background: "rgba(253,248,243,0.05)",
                    borderRadius: "16px",
                    padding: "20px",
                    border: "1px solid rgba(253,248,243,0.1)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "14px",
                    }}
                  >
                    <div style={{ textAlign: "left" }}>
                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: "#FAF6F1",
                          marginBottom: "2px",
                        }}
                      >
                        {a.bank_name}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          color: "#FAF6F1",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {a.account_number}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.75rem",
                          color: "rgba(253,248,243,0.7)",
                        }}
                      >
                        a.n <strong>{a.account_name}</strong>
                      </p>
                    </div>
                    <BankLogo name={a.bank_name} url={a.logo_url} />
                  </div>
                  <button
                    onClick={() => doCopy(a.account_number, i)}
                    className="gift-btn"
                  >
                    {copied === i ? (
                      <>
                        <Check size={15} /> Tersalin!
                      </>
                    ) : (
                      <>
                        <Copy size={15} /> Salin Nomor
                      </>
                    )}
                  </button>
                </div>
              </Reveal>
            ))}

          {gifts
            .filter((g) => g.is_address)
            .map((a, i) => (
              <Reveal key={`addr-${i}`} delay={0.3}>
                <div
                  style={{
                    background: "rgba(253,248,243,0.05)",
                    borderRadius: "16px",
                    padding: "20px",
                    border: "1px solid rgba(253,248,243,0.1)",
                    textAlign: "center",
                  }}
                >
                  <Gift
                    size={32}
                    color="rgba(253,248,243,0.8)"
                    style={{ margin: "0 auto 12px", opacity: 0.7 }}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      color: "#FAF6F1",
                      marginBottom: "8px",
                    }}
                  >
                    Kirim Kado Fisik
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.78rem",
                      color: "rgba(253,248,243,0.7)",
                      lineHeight: 1.7,
                      marginBottom: "16px",
                    }}
                  >
                    {a.text_content}
                  </p>
                  <button
                    onClick={() => doCopy(a.text_content, `addr-${i}`)}
                    className="gift-btn"
                  >
                    {copied === `addr-${i}` ? (
                      <>
                        <Check size={15} /> Tersalin!
                      </>
                    ) : (
                      <>
                        <Copy size={15} /> Salin Alamat
                      </>
                    )}
                  </button>
                </div>
              </Reveal>
            ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   GUESTBOOK / RSVP SECTION
   ═══════════════════════════════════════════ */
function GuestbookSection({ guestName }) {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({
    name: guestName || "",
    attendance: "attending",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await fetch("/api/rsvp");
      const data = await res.json();
      if (data.messages) {
        setComments(data.messages);
      }
    } catch (err) {
      console.error("Failed to load comments", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.message) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guest_name: form.name,
          attendance: form.attendance,
          num_guests: 1,
          message: form.message,
        }),
      });
      setForm({ ...form, message: "" }); // Reset only message to allow multiple messages if needed, or clear UI indication
      await fetchComments(); // Reload latest
    } catch (err) {
      console.error("Failed to submit", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Baru saja";
    return new Date(dateStr).toLocaleString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className="section-frame"
      style={{
        backgroundImage: "url('/assets/main/bg33.jpeg')",
        backgroundPosition: "top",
        backgroundRepeat: "repeat",
        backgroundSize: "100%",
      }}
    >
      <div className="inset-card card-ivory" style={{ borderRadius: "24px" }}>
        <Reveal>
          <p
            className="section-label"
            style={{ color: "rgba(253,248,243,0.6)" }}
          >
            Buku Tamu
          </p>
          <h2
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "3.2rem",
              color: "#FAF6F1",
              fontWeight: 400,
              marginBottom: "12px",
            }}
          >
            Ucapan & Doa
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              color: "rgba(253,248,243,0.8)",
              marginBottom: "32px",
              maxWidth: "280px",
              margin: "0 auto 32px",
              lineHeight: 1.8,
              opacity: 0.85,
            }}
          >
            Tinggalkan pesan dan konfirmasi kehadiran Anda untuk mempelai.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            style={{
              background: "rgba(253,248,243,0.05)",
              borderRadius: "16px",
              padding: "24px 20px",
              border: "1px solid rgba(253,248,243,0.1)",
              textAlign: "left",
              marginBottom: "32px",
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  color: "#FAF6F1",
                  marginBottom: "8px",
                  fontWeight: 600,
                }}
              >
                Nama Anda
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  background: "rgba(26, 10, 9, 0.4)",
                  border: "1px solid rgba(253,248,243,0.2)",
                  color: "#FAF6F1",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                }}
                placeholder="Masukkan nama..."
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  color: "#FAF6F1",
                  marginBottom: "8px",
                  fontWeight: 600,
                }}
              >
                Kehadiran
              </label>
              <select
                value={form.attendance}
                onChange={(e) =>
                  setForm({ ...form, attendance: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  background: "rgba(26, 10, 9, 0.4)",
                  border: "1px solid rgba(253,248,243,0.2)",
                  color: "#FAF6F1",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                }}
              >
                <option value="attending" style={{ color: "#1A0A09" }}>
                  Ya, Saya akan hadir
                </option>
                <option value="not_attending" style={{ color: "#1A0A09" }}>
                  Maaf, tidak bisa hadir
                </option>
              </select>
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  color: "#FAF6F1",
                  marginBottom: "8px",
                  fontWeight: 600,
                }}
              >
                Ucapan & Doa
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={4}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  background: "rgba(26, 10, 9, 0.4)",
                  border: "1px solid rgba(253,248,243,0.2)",
                  color: "#FAF6F1",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  resize: "vertical",
                }}
                placeholder="Tuliskan ucapan dan doa..."
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="open-btn"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "8px",
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? "Mengirim..." : "Kirim Pesan & RSVP"}
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.2}>
          <div
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              paddingRight: "4px",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {comments.map((c, i) => (
              <div
                key={i}
                style={{
                  padding: "16px",
                  borderRadius: "12px",
                  background: "rgba(253,248,243,0.03)",
                  border: "1px solid rgba(253,248,243,0.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "6px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "#FAF6F1",
                      margin: 0,
                    }}
                  >
                    {c.guest_name}
                  </p>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      padding: "2px 8px",
                      borderRadius: "20px",
                      background:
                        c.attendance === "attending"
                          ? "rgba(76, 175, 80, 0.2)"
                          : "rgba(244, 67, 54, 0.2)",
                      color:
                        c.attendance === "attending" ? "#81c784" : "#e57373",
                      border: `1px solid ${c.attendance === "attending" ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)"}`,
                    }}
                  >
                    {c.attendance === "attending" ? "Hadir" : "Tidak Hadir"}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.8rem",
                    color: "rgba(253,248,243,0.8)",
                    margin: "0 0 8px",
                    lineHeight: 1.6,
                  }}
                >
                  {c.message}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.65rem",
                    color: "rgba(253,248,243,0.4)",
                    margin: 0,
                  }}
                >
                  {formatDate(c.created_at)}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CLOSING SECTION
   ═══════════════════════════════════════════ */
function ClosingSection({ bride, groom }) {
  return (
    <div
      className="section-frame"
      style={{
        backgroundImage: "url('/assets/gallery/92.jpg')",
        backgroundPosition: " center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        padding: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "60px 24px",
          background:
            "linear-gradient(to top, rgba(26, 10, 9, 0.95) 0%, rgba(26, 10, 9, 0.3) 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
        }}
      >
        <Reveal>
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.62rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(253,248,243,0.7)",
                marginBottom: "16px",
                fontWeight: 600,
              }}
            >
              Wassalamualaikum Wr. Wb.
            </p>
            <h3
              className="shimmer-text"
              style={{
                fontFamily: "var(--font-script)",
                fontSize: "3.6rem",
                fontWeight: 400,
                marginBottom: "24px",
                lineHeight: 1.1,
              }}
            >
              {bride?.nickname || "Debby"}{" "}
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  color: "#fff",
                  opacity: 0.8,
                  fontSize: "2rem",
                }}
              >
                &amp;
              </span>
              <br />
              {groom?.nickname || "Alam"}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "0.98rem",
                color: "rgba(253,248,243,0.8)",
                maxWidth: "280px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Merupakan kehormatan dan kebahagiaan bagi kami atas kehadiran
              Anda.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN TEMPLATE COMPONENT
   ═══════════════════════════════════════════ */
export default function WeddingTemplate({ guestName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const audioRef = useRef(null);

  const { settings, couples, events, stories, gifts, gallery, rsvp_whatsapp } =
    weddingData;
  const bride = couples.bride;
  const groom = couples.groom;

  useEffect(() => {
    if (audioRef.current) {
      if (musicPlaying) audioRef.current.play().catch(() => {});
      else audioRef.current.pause();
    }
  }, [musicPlaying]);

  useEffect(() => {
    if (bride && groom)
      document.title = `${bride.nickname} & ${groom.nickname} — The Wedding`;
  }, []);

  return (
    <div className="split-layout">
      <HeroLeft settings={settings} bride={bride} groom={groom} />

      <div className="split-right">
        <AnimatePresence>
          {!isOpen ? (
            <CoverPanel
              key="cover"
              onOpen={() => {
                setIsOpen(true);
                setMusicPlaying(true);
              }}
              guestName={guestName || "Tamu Undangan"}
              bride={bride}
              groom={groom}
              settings={settings}
            />
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <RightHeroVideo settings={settings} bride={bride} groom={groom} />
              <QuoteSection settings={settings} />
              <MainCoupleSection
                bride={bride}
                groom={groom}
                settings={settings}
              />
              <CountdownSection
                settings={settings}
                bride={bride}
                groom={groom}
              />
              <EventSection events={events} />
              {/* <StorySection stories={stories} /> */}
              <PrayerSection />
              <GallerySection
                gallery={gallery}
                setLightboxIdx={setLightboxIdx}
              />
              <GiftSection gifts={gifts} />
              <GuestbookSection guestName={guestName} />
              <ClosingSection bride={bride} groom={groom} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isOpen && settings.music_url && (
        <audio ref={audioRef} src={settings.music_url} loop />
      )}

      {isOpen && (
        <button
          className={`music-btn ${musicPlaying ? "playing" : ""}`}
          onClick={() => setMusicPlaying(!musicPlaying)}
          aria-label="Toggle Music"
        >
          {musicPlaying ? <Music size={18} /> : <VolumeX size={18} />}
        </button>
      )}

      {/* Global Lightbox Overlay */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxIdx(null)}
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setLightboxIdx(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(205,175,120,0.4)",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                color: "#FAF6F1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(10px)",
                zIndex: 1001,
              }}
            >
              <X size={16} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx(
                  (i) => (i - 1 + gallery.length) % gallery.length,
                );
              }}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(205,175,120,0.4)",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                cursor: "pointer",
                color: "#FAF6F1",
                fontSize: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(10px)",
                zIndex: 1001,
              }}
            >
              ‹
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx((i) => (i + 1) % gallery.length);
              }}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(205,175,120,0.4)",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                cursor: "pointer",
                color: "#FAF6F1",
                fontSize: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(10px)",
                zIndex: 1001,
              }}
            >
              ›
            </motion.button>

            <AnimatePresence mode="wait">
              <motion.div
                key={lightboxIdx}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.28 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 32px 100px rgba(0,0,0,0.8)",
                  border: "1px solid rgba(205,175,120,0.2)",
                }}
              >
                {gallery[lightboxIdx] && gallery[lightboxIdx].image_url ? (
                  <div
                    style={{
                      position: "relative",
                      width: "88vw",
                      maxWidth: "700px",
                      height: "70vh",
                    }}
                  >
                    <Image
                      src={gallery[lightboxIdx].image_url}
                      alt="Wedding Gallery"
                      fill
                      sizes="88vw"
                      priority
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      width: "70vw",
                      height: "70vw",
                      maxWidth: "320px",
                      maxHeight: "320px",
                      background: "#3D1A18",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Heart size={48} color="rgba(253,248,243,0.2)" />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div
              style={{
                position: "absolute",
                bottom: "24px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {gallery.map((_, idx) => (
                <div
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIdx(idx);
                  }}
                  style={{
                    width: idx === lightboxIdx ? "18px" : "6px",
                    height: "6px",
                    borderRadius: "3px",
                    background:
                      idx === lightboxIdx
                        ? "rgba(205,175,120,0.9)"
                        : "rgba(255,255,255,0.3)",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

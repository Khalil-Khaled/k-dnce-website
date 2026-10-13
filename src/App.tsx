import { useEffect, useState } from 'react'
import Blog from '@/blogs/Blog'
import logoKD from '@/imports/LOGO-KD-1.png'
import heroImg1 from '@/imports/low-angle-view-unrecognizable-muscular-build-man-preparing-lifting-barbell-health-club.jpg'
import heroImg2 from '@/imports/friends-watching-sports-living-room.jpg'

const N = '#1a1464'
const Y = '#f2e94e'
const W = '#ffffff'

/* ─── Micro SVG motifs ─── */

function Triangle({ size = 20, color = Y, rotate = 0 }: { size?: number; color?: string; rotate?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      style={{ transform: `rotate(${rotate}deg)`, display: 'block', flexShrink: 0 }}
    >
      <polygon points="10,1 19,19 1,19" fill={color} />
    </svg>
  )
}

function ArrowRight({ size = 28, color = Y }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size * 0.72} viewBox="0 0 28 20" style={{ display: 'block', flexShrink: 0 }}>
      <polygon points="0,0 18,10 0,20" fill={color} />
    </svg>
  )
}

function Star4({ size = 20, color = Y }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" style={{ display: 'block', flexShrink: 0 }}>
      <path
        d="M10 0 L12.2 7.8 L20 10 L12.2 12.2 L10 20 L7.8 12.2 L0 10 L7.8 7.8 Z"
        fill={color}
      />
    </svg>
  )
}

function DiamondAccent({ size = 14, color = Y }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" style={{ display: 'block', flexShrink: 0 }}>
      <polygon points="7,0 14,7 7,14 0,7" fill={color} />
    </svg>
  )
}

/* ─── Pill Button ─── */

type BtnVariant = 'yellow' | 'navy' | 'white-outline'

function PillBtn({
  children,
  variant = 'yellow',
  size = 'md',
  href,
}: {
  children: React.ReactNode
  variant?: BtnVariant
  size?: 'sm' | 'md' | 'lg'
  href?: string
}) {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    borderRadius: 9999,
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    lineHeight: 1,
  }
  const sizeMap = {
    sm: { padding: '10px 22px', fontSize: '0.85rem' },
    md: { padding: '14px 30px', fontSize: '1rem' },
    lg: { padding: '17px 38px', fontSize: '1.1rem' },
  }
  const variantMap: Record<BtnVariant, React.CSSProperties> = {
    yellow: { background: Y, color: N },
    navy: { background: N, color: Y },
    'white-outline': { background: 'transparent', color: W, border: `2px solid ${W}` },
  }
  const buttonStyle = { ...base, ...sizeMap[size], ...variantMap[variant] }

  if (href) {
    return (
      <a href={href} style={{ ...buttonStyle, textDecoration: 'none' }}>
        {children}
      </a>
    )
  }

  return (
    <button
      style={buttonStyle}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)'
        ;(e.currentTarget as HTMLButtonElement).style.boxShadow =
          variant === 'yellow' ? `0 6px 24px rgba(242,233,78,0.45)` : `0 6px 24px rgba(26,20,100,0.35)`
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'
        ;(e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'
      }}
    >
      {children}
    </button>
  )
}

/* ─── Navbar ─── */

function Navbar() {
  const isBlogPage = window.location.pathname.replace(/\/+$/, '') === '/blog'

  return (
    <nav
      style={{
        background: W,
        padding: '0 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 70,
        marginTop: 10,
        marginBottom: 10,
        position: 'sticky',
        top: 0,
        zIndex: 200,
        borderBottom: `2px solid rgba(26,20,100,0.1)`,
      }}
    >
      <img src={logoKD} alt="K-DNCE" style={{ height: 72, objectFit: 'contain', border: 'none', borderRadius: 100 }} />

      <div
        className="nav-links"
        style={{ display: 'flex', gap: 36, alignItems: 'center' }}
      >
        {[
          { label: 'Accueil', href: '#accueil' },
          { label: 'Services', href: '#services' },
          { label: 'À propos', href: '#a-propos' },
          { label: 'Blog', href: '/blog', blogHref: '#blog-page' },
          { label: 'Contact', href: '#contact' },
        ].map(({ label, href, blogHref }) => (
          <a
            key={label}
            href={isBlogPage ? blogHref ?? `/${href}` : href}
            style={{
              color: 'rgba(26,20,100,0.75)',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '0.95rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = N)}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(26,20,100,0.75)')}
          >
            {label}
          </a>
        ))}
      </div>

      <PillBtn variant="yellow" size="sm">
        <ArrowRight size={14} color={N} />
        Contact
      </PillBtn>
    </nav>
  )
}

/* ─── Hero ─── */

function Hero() {
  return (
    <section
      id="accueil"
      style={{
        background: N,
        position: 'relative',
        minHeight: '88vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      {/* Yellow diagonal right panel */}
      <div
        className="hero-right-panel"
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '48%',
          background: Y,
          clipPath: 'polygon(14% 0%, 100% 0%, 100% 100%, 0% 100%)',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 4 }}>
          <img
            src={heroImg1}
            alt="Coach en salle de sport"
            style={{
              width: '100%',
              height: '50%',
              objectFit: 'cover',
              objectPosition: 'center center',
              mixBlendMode: 'multiply',
              opacity: 0.85,
            }}
          />
          <img
            src={heroImg2}
            alt="Équipe sportive sur le terrain"
            style={{
              width: '100%',
              height: '50%',
              objectFit: 'cover',
              objectPosition: 'center center',
              mixBlendMode: 'multiply',
              opacity: 0.85,
            }}
          />
        </div>
      </div>

      {/* Diagonal edge accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 'calc(48% - 2px)',
          width: 3,
          background: `linear-gradient(to bottom, ${Y}, transparent)`,
          clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 50% 100%)`,
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />

      {/* Arrow pointer at diagonal join */}
      <div
        style={{
          position: 'absolute',
          right: 'calc(48% - 22px)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}
      >
        <ArrowRight size={22} color={W} />
      </div>

      {/* Scattered accents — navy half */}
      <div style={{ position: 'absolute', top: 52, left: 44, opacity: 0.5 }}>
        <Star4 size={22} color={Y} />
      </div>
      <div style={{ position: 'absolute', bottom: 90, left: 220, opacity: 0.45 }}>
        <Triangle size={12} color={Y} rotate={60} />
      </div>
      <div style={{ position: 'absolute', top: 160, left: 380, opacity: 0.3 }}>
        <DiamondAccent size={10} color={W} />
      </div>
      {/* Accents — yellow half */}
      <div style={{ position: 'absolute', top: 80, right: 60, zIndex: 6, opacity: 0.9 }}>
        <Star4 size={30} color={N} />
      </div>
      <div style={{ position: 'absolute', bottom: 60, right: 200, zIndex: 6, opacity: 0.7 }}>
        <DiamondAccent size={16} color={N} />
      </div>

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '80px 64px 80px 64px',
          maxWidth: 620,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 0,
        }}
      >
        {/* Eyebrow tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(242,233,78,0.1)',
            border: `1px solid rgba(242,233,78,0.3)`,
            borderRadius: 9999,
            padding: '7px 16px',
            marginBottom: 28,
            width: 'fit-content',
          }}
        >
          <ArrowRight size={12} color={Y} />
          <span
            style={{
              color: Y,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '0.78rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            Agence marketing sportif
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(3.6rem, 7vw, 5.6rem)',
            lineHeight: 0.9,
            textTransform: 'uppercase',
            color: W,
            marginBottom: 28,
            letterSpacing: '-0.01em',
          }}
        >
          Le marketing
          <br />
          <span style={{ color: Y }}>digital</span>
          <br />
          pensé pour
          <br />
          <span
            style={{
              color: Y,
              WebkitTextStroke: `1px ${Y}`,
              fontStyle: 'italic',
            }}
          >
            le sport
          </span>
        </h1>

        {/* Subheadline */}
        <p
          style={{
            color: 'rgba(255,255,255,0.72)',
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 400,
            fontSize: '1.05rem',
            lineHeight: 1.65,
            marginBottom: 40,
            maxWidth: 400,
          }}
        >
          Coachs, clubs, athlètes — on construit votre présence en ligne avec la même intensité que vous mettez dans votre sport.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <PillBtn variant="yellow" size="lg">
            <ArrowRight size={18} color={N} />
            Réserver un audit gratuit
          </PillBtn>
          <a
            href="#"
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = Y)}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.75)')}
          >
            Nos services <ArrowRight size={13} color={Y} />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── Marquee Banner ─── */

function MarqueeBanner() {
  const chunk = (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 20,
        paddingRight: 52,
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 800,
        fontSize: '1.3rem',
        color: Y,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}
    >
      <Triangle size={12} color={W} rotate={90} />
      On accompagne les passionnés du sport à briller en ligne.
    </span>
  )

  return (
    <div
      className="marquee-wrap"
      style={{
        background: N,
        borderTop: `3px solid ${Y}`,
        borderBottom: `3px solid ${Y}`,
        padding: '16px 0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        cursor: 'default',
      }}
    >
      <div className="marquee-track">
        {Array(8).fill(0).map((_, i) => (
          <span key={i}>{chunk}</span>
        ))}
      </div>
    </div>
  )
}

/* ─── Services (Packs & Tarifs) ─── */

type Pack = {
  name: string
  tagline: string
  bullets: string[]
  price: string
  priceNote: string
  recommended?: boolean
}

type TabData = {
  id: string
  label: string
  emoji: string
  packs: Pack[]
  bonusNote: string
}

const TABS: TabData[] = [
  {
    id: 'athlete',
    label: 'Athlète / Coach Indépendant',
    emoji: '🏃',
    bonusNote: 'Bonus de performance selon les objectifs atteints (croissance abonnés, leads, visibilité sponsoring).',
    packs: [
      {
        name: 'Kick Start',
        tagline: 'Posez les bases de votre image digitale.',
        bullets: [
          'Audit complet de votre présence en ligne',
          'Refonte de votre bio + profil Instagram/LinkedIn',
          'Kit graphique de base (3 templates posts + stories)',
        ],
        price: '650 €',
        priceNote: 'one-shot',
      },
      {
        name: 'Glow Start',
        tagline: 'Lancez votre personal brand avec impact.',
        bullets: [
          'Tout le Kick Start inclus',
          'Stratégie de contenu sur 30 jours + calendrier éditorial',
          '12 visuels personnalisés (posts, reels covers, stories)',
        ],
        price: '1 400 €',
        priceNote: 'one-shot',
      },
      {
        name: 'Drive',
        tagline: 'Restez visible — on gère le quotidien.',
        bullets: [
          '8 contenus/mois (posts + stories)',
          'Planning éditorial mensuel',
          'Reporting mensuel avec recommandations',
        ],
        price: '400 €',
        priceNote: '/mois',
      },
      {
        name: 'Ultra Drive',
        tagline: 'Décollage complet de votre présence.',
        bullets: [
          '16 contenus/mois (posts, reels, stories)',
          'Community management + interactions',
          'Campagnes sponsorisées (budget ads inclus)',
        ],
        price: '650 €',
        priceNote: '/mois',
        recommended: true,
      },
    ],
  },
  {
    id: 'fitness',
    label: 'Clubs de Fitness',
    emoji: '🏋️',
    bonusNote: 'Bonus de performance selon les objectifs atteints (nouveaux adhérents, taux de remplissage, leads qualifiés).',
    packs: [
      {
        name: 'Kick Start',
        tagline: 'Bâtissez votre vitrine digitale.',
        bullets: [
          'Audit de vos réseaux et fiche Google My Business',
          'Mise à jour de tous vos profils (Google, Insta, Facebook)',
          'Kit visuel complet aux couleurs de votre salle',
        ],
        price: '900 €',
        priceNote: 'one-shot',
      },
      {
        name: 'Glow Start',
        tagline: 'Lancez ou relancez votre salle avec force.',
        bullets: [
          'Tout le Kick Start inclus',
          'Shooting photo/vidéo de votre salle (demi-journée)',
          'Campagne de lancement géolocalisée sur 30 jours',
        ],
        price: 'dès 1 800 €',
        priceNote: 'one-shot',
      },
      {
        name: 'Drive',
        tagline: 'Remplissez vos créneaux chaque mois.',
        bullets: [
          '12 contenus/mois adaptés à votre offre',
          'Stories interactives + mise en avant des offres',
          'Rapport mensuel performances + recommandations',
        ],
        price: '850 €',
        priceNote: '/mois',
      },
      {
        name: 'Ultra Drive',
        tagline: 'Croissance maîtrisée, communauté fidèle.',
        bullets: [
          '20 contenus/mois (posts, reels, stories)',
          'Gestion complète des ads (Google + Meta)',
          'Community management 5j/7 + gestion des avis',
        ],
        price: 'dès 1 200 €',
        priceNote: '/mois',
        recommended: true,
      },
    ],
  },
  {
    id: 'pro',
    label: 'Clubs Sportifs Pro',
    emoji: '🏆',
    bonusNote: 'Bonus de performance selon les objectifs atteints (audience, activation partenaires, billetterie, engagement fan).',
    packs: [
      {
        name: 'Kick Start',
        tagline: 'Professionnalisez l\'image de votre club.',
        bullets: [
          'Audit complet de votre stratégie digitale',
          'Refonte de tous vos profils et pages officielles',
          'Kit presse digital (templates communiqués, banners)',
        ],
        price: '1 600 €',
        priceNote: 'one-shot',
      },
      {
        name: 'Glow Start',
        tagline: 'Lancez votre saison avec une stratégie complète.',
        bullets: [
          'Tout le Kick Start inclus',
          'Production de 30 contenus premium (photos, vidéos, motion)',
          'Mise en place de la newsletter club + base contacts',
        ],
        price: '4 500 €',
        priceNote: 'one-shot',
      },
      {
        name: 'Drive',
        tagline: 'Votre club au cœur de l\'actualité sportive.',
        bullets: [
          '16 contenus/mois (résultats, coulisses, partenaires)',
          'Gestion de la communication matchday',
          'Suivi des KPIs + reporting hebdomadaire',
        ],
        price: '1 400 €',
        priceNote: '/mois',
      },
      {
        name: 'Ultra Drive',
        tagline: 'Développez votre audience et vos partenariats.',
        bullets: [
          '30 contenus/mois + vidéos courtes format reels',
          'Gestion ads avancée (acquisition abonnés + sponsors)',
          'Relations partenaires et activation marques',
        ],
        price: '2 600 €',
        priceNote: '/mois',
        recommended: true,
      },
    ],
  },
]

function PackCard({ pack, tabIndex }: { pack: Pack; tabIndex: number }) {
  const isRec = pack.recommended
  const bg = isRec ? N : W
  const titleColor = isRec ? Y : N
  const textColor = isRec ? 'rgba(255,255,255,0.75)' : 'rgba(26,20,100,0.7)'
  const bulletColor = isRec ? 'rgba(255,255,255,0.9)' : N
  const borderColor = isRec ? N : 'rgba(26,20,100,0.12)'

  return (
    <div
      style={{
        background: bg,
        border: `2px solid ${borderColor}`,
        borderRadius: 20,
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        flex: 1,
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = isRec
          ? `0 24px 56px rgba(26,20,100,0.45)`
          : `0 16px 40px rgba(26,20,100,0.12)`
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
      }}
    >
      {/* Corner geometric */}
      <div
        style={{
          position: 'absolute',
          top: -24,
          right: -24,
          width: 72,
          height: 72,
          background: isRec ? 'rgba(242,233,78,0.1)' : 'rgba(26,20,100,0.05)',
          borderRadius: 14,
          transform: 'rotate(28deg)',
          pointerEvents: 'none',
        }}
      />

      {/* Recommended badge */}
      {isRec && (
        <div
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            background: Y,
            color: N,
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '4px 12px',
            borderRadius: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <Star4 size={10} color={N} />
          Recommandé
        </div>
      )}

      {/* Pack name */}
      <div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 6,
          }}
        >
          <Triangle size={9} color={isRec ? Y : N} rotate={90} />
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: isRec ? 'rgba(242,233,78,0.7)' : 'rgba(26,20,100,0.45)',
            }}
          >
            Pack
          </span>
        </div>
        <h3
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: '1.75rem',
            textTransform: 'uppercase',
            color: titleColor,
            lineHeight: 1,
            letterSpacing: '0.01em',
          }}
        >
          {pack.name}
        </h3>
      </div>

      {/* Tagline */}
      <p
        style={{
          color: textColor,
          fontFamily: "'Barlow', sans-serif",
          fontSize: '0.88rem',
          lineHeight: 1.55,
          fontStyle: 'italic',
        }}
      >
        {pack.tagline}
      </p>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: isRec ? 'rgba(255,255,255,0.12)' : 'rgba(26,20,100,0.08)',
        }}
      />

      {/* Bullet points */}
      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          flex: 1,
        }}
      >
        {pack.bullets.map((b, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              color: bulletColor,
              fontFamily: "'Barlow', sans-serif",
              fontSize: '0.88rem',
              lineHeight: 1.5,
            }}
          >
            <span style={{ flexShrink: 0, marginTop: 4 }}>
              <ArrowRight size={11} color={isRec ? Y : N} />
            </span>
            {b}
          </li>
        ))}
      </ul>

      {/* Price */}
      <div
        style={{
          marginTop: 4,
          display: 'flex',
          alignItems: 'baseline',
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: '2rem',
            color: isRec ? Y : N,
            lineHeight: 1,
            letterSpacing: '-0.01em',
          }}
        >
          {pack.price}
        </span>
        <span
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 500,
            fontSize: '0.85rem',
            color: textColor,
          }}
        >
          {pack.priceNote}
        </span>
      </div>

      {/* CTA */}
      <PillBtn variant={isRec ? 'yellow' : 'navy'} size="sm">
        <ArrowRight size={12} color={isRec ? N : Y} />
        Demander un devis
      </PillBtn>
    </div>
  )
}

function Services() {
  const [activeTab, setActiveTab] = useState(0)
  const tab = TABS[activeTab]

  return (
    <section id="services" style={{ background: '#f6f5f1', padding: '88px 48px' }}>
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 14,
          }}
        >
          <Triangle size={12} color={N} rotate={90} />
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '0.82rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: N,
              opacity: 0.5,
            }}
          >
            Ce qu'on fait pour vous
          </span>
          <Triangle size={12} color={N} rotate={270} />
        </div>
        <h2
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(2.8rem, 5.5vw, 4.2rem)',
            textTransform: 'uppercase',
            color: N,
            lineHeight: 0.92,
            letterSpacing: '-0.01em',
            marginBottom: 16,
          }}
        >
          Nos Packs{' '}
          <span style={{ color: Y, WebkitTextStroke: `2px ${N}` }}>&amp; Tarifs</span>
        </h2>
        <p
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: '1rem',
            color: 'rgba(26,20,100,0.6)',
            lineHeight: 1.65,
            maxWidth: 480,
            margin: '0 auto',
          }}
        >
          Notre offre s'adapte à 3 profils différents. Sélectionnez le vôtre pour découvrir les formules qui vous correspondent.
        </p>
      </div>

      {/* Tab selector */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 10,
          marginBottom: 48,
          flexWrap: 'wrap',
        }}
      >
        {TABS.map((t, i) => {
          const active = i === activeTab
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(i)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                borderRadius: 9999,
                border: `2px solid ${active ? N : 'rgba(26,20,100,0.2)'}`,
                background: active ? N : 'transparent',
                color: active ? Y : N,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: '0.95rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                opacity: active ? 1 : 0.65,
              }}
              onMouseEnter={e => {
                if (!active) {
                  ;(e.currentTarget as HTMLButtonElement).style.opacity = '1'
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = N
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  ;(e.currentTarget as HTMLButtonElement).style.opacity = '0.65'
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(26,20,100,0.2)'
                }
              }}
            >
              {active && <Triangle size={10} color={Y} rotate={90} />}
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Pack cards grid */}
      <div
        className="packs-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
          maxWidth: 1200,
          margin: '0 auto',
          alignItems: 'stretch',
        }}
      >
        {tab.packs.map((pack, i) => (
          <PackCard key={`${tab.id}-${i}`} pack={pack} tabIndex={activeTab} />
        ))}
      </div>

      {/* Bonus note */}
      <div
        style={{
          maxWidth: 1200,
          margin: '28px auto 0',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '16px 24px',
          background: N,
          borderRadius: 14,
          border: `1.5px solid rgba(242,233,78,0.2)`,
        }}
      >
        <Star4 size={16} color={Y} />
        <span
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: '0.88rem',
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.5,
          }}
        >
          <strong style={{ color: Y, fontWeight: 700 }}>Success Fee — </strong>
          {tab.bonusNote}
        </span>
      </div>
    </section>
  )
}

/* ─── À propos ─── */

const STATS = [
  { value: '+50', label: 'Clients accompagnés' },
  { value: '8', label: 'Secteurs sportifs couverts' },
  { value: '+200K€', label: 'Budgets publicitaires pilotés' },
  { value: '+180K', label: 'Communautés développées' },
]

const VALEURS = [
  {
    icon: (
      <svg width={22} height={22} viewBox="0 0 22 22">
        <polygon points="11,1 13.5,8 21,8 15,13 17,20 11,16 5,20 7,13 1,8 8.5,8" fill={Y} />
      </svg>
    ),
    label: 'Expertise sport',
  },
  {
    icon: (
      <svg width={22} height={22} viewBox="0 0 22 22">
        <polygon points="1,11 11,1 21,11 11,21" fill="none" stroke={Y} strokeWidth={2.5} strokeLinejoin="round" />
        <polygon points="6,11 11,6 16,11 11,16" fill={Y} />
      </svg>
    ),
    label: 'Résultats concrets',
  },
  {
    icon: (
      <svg width={22} height={22} viewBox="0 0 22 22">
        <polygon points="1,21 1,1 21,11" fill={Y} />
      </svg>
    ),
    label: 'Accompagnement sur-mesure',
  },
]

function AboutSection() {
  return (
    <section
      id="a-propos"
      style={{
        background: N,
        padding: '96px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background geometric accents */}
      <div style={{ position: 'absolute', top: -60, right: -60, opacity: 0.04, pointerEvents: 'none' }}>
        <Triangle size={260} color={Y} rotate={210} />
      </div>
      <div style={{ position: 'absolute', bottom: -30, left: -30, opacity: 0.05, pointerEvents: 'none' }}>
        <Star4 size={180} color={Y} />
      </div>
      <div style={{ position: 'absolute', top: 80, left: '50%', opacity: 0.03, pointerEvents: 'none' }}>
        <DiamondAccent size={120} color={W} />
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Top grid: text + photo */}
        <div
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 72,
            alignItems: 'center',
            marginBottom: 72,
          }}
        >
          {/* Left: text content */}
          <div>
            {/* Eyebrow */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 22 }}>
              <Triangle size={11} color={Y} rotate={90} />
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  color: Y,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  opacity: 0.75,
                }}
              >
                Qui sommes-nous ?
              </span>
            </div>

            {/* Main heading */}
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(2.6rem, 5vw, 3.8rem)',
                textTransform: 'uppercase',
                color: W,
                lineHeight: 0.92,
                letterSpacing: '-0.01em',
                marginBottom: 28,
              }}
            >
              Le sport, on le{' '}
              <span style={{ color: Y }}>connaît.</span>
              <br />
              Le digital, on le{' '}
              <span style={{ color: Y, fontStyle: 'italic' }}>maîtrise.</span>
            </h2>

            {/* Body text */}
            <p
              style={{
                color: 'rgba(255,255,255,0.72)',
                fontFamily: "'Barlow', sans-serif",
                fontSize: '1.05rem',
                lineHeight: 1.75,
                marginBottom: 36,
              }}
            >
              K-DNCE est une agence de marketing digital spécialisée dans l'univers du sport. Nous accompagnons athlètes, coachs, salles de fitness et clubs sportifs pour développer leur visibilité, fidéliser leur communauté et transformer leur audience en résultats concrets.
            </p>

            {/* Valeurs pills */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {VALEURS.map((v, i) => (
                <div
                  key={i}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 9,
                    background: 'rgba(242,233,78,0.08)',
                    border: `1.5px solid rgba(242,233,78,0.22)`,
                    borderRadius: 9999,
                    padding: '9px 18px',
                  }}
                >
                  {v.icon}
                  <span
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: W,
                      opacity: 0.9,
                    }}
                  >
                    {v.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: photo in angular frame */}
          <div style={{ position: 'relative' }}>
            {/* Offset frame accent */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                border: `3px solid ${Y}`,
                borderRadius: 20,
                transform: 'translate(12px, 12px)',
                opacity: 0.35,
                pointerEvents: 'none',
              }}
            />
            {/* Photo */}
            <div
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                clipPath: 'polygon(0% 3%, 3% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%)',
                position: 'relative',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=700&h=520&fit=crop&auto=format"
                alt="L'équipe K-DNCE au travail"
                style={{ width: '100%', height: 420, objectFit: 'cover', display: 'block' }}
              />
              {/* Subtle navy tint */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(135deg, rgba(26,20,100,0.35) 0%, transparent 55%)`,
                  pointerEvents: 'none',
                }}
              />
            </div>
            {/* Star badge */}
            <div
              style={{
                position: 'absolute',
                bottom: -14,
                left: -14,
                width: 48,
                height: 48,
                background: Y,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'rotate(-10deg)',
                boxShadow: `4px 4px 0 rgba(26,20,100,0.4)`,
              }}
            >
              <Star4 size={24} color={N} />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            borderTop: `2px solid rgba(242,233,78,0.15)`,
            paddingTop: 56,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
          }}
          className="stats-row"
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                padding: '0 32px',
                borderLeft: i > 0 ? `1px solid rgba(242,233,78,0.15)` : 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
                  color: Y,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Blog / Coulisses ─── */

function BlogSection() {
  return (
    <section
      id="blog"
      style={{
        background: Y,
        padding: '88px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Large background accents */}
      <div style={{ position: 'absolute', top: -40, left: -40, opacity: 0.1, pointerEvents: 'none' }}>
        <Triangle size={160} color={N} rotate={180} />
      </div>
      <div style={{ position: 'absolute', bottom: -24, right: 32, opacity: 0.08, pointerEvents: 'none' }}>
        <Star4 size={110} color={N} />
      </div>
      <div style={{ position: 'absolute', top: 24, right: 280, opacity: 0.15, pointerEvents: 'none' }}>
        <DiamondAccent size={28} color={N} />
      </div>

      <div
        className="blog-grid"
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left: text */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <Triangle size={11} color={N} rotate={90} />
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: '0.78rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: N,
                opacity: 0.65,
              }}
            >
              Blog &amp; contenus
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(3.5rem, 6.5vw, 5rem)',
              textTransform: 'uppercase',
              color: N,
              lineHeight: 0.88,
              letterSpacing: '-0.01em',
              marginBottom: 20,
            }}
          >
            Nos
            <br />
            Coulisses
          </h2>

          {/* Oversized ghost text */}
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              textTransform: 'uppercase',
              color: N,
              opacity: 0.12,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              marginBottom: 28,
              fontStyle: 'italic',
              userSelect: 'none',
            }}
          >
            Trouve
            <br />
            ton élan
          </div>

          <p
            style={{
              color: N,
              opacity: 0.78,
              fontFamily: "'Barlow', sans-serif",
              fontSize: '1.05rem',
              lineHeight: 1.65,
              marginBottom: 36,
              maxWidth: 380,
            }}
          >
            Stratégies, retours d'expérience, et conseils concrets tirés de nos missions avec des passionnés du sport comme vous.
          </p>

          <PillBtn variant="navy" href="/blog">
            <ArrowRight size={16} color={Y} />
            Voir le blog
          </PillBtn>
        </div>

        {/* Right: photo + oversized text accent */}
        <div style={{ position: 'relative' }}>
          {/* Ghost "trouve ton élan" behind photo */}
          <div
            style={{
              position: 'absolute',
              bottom: -14,
              left: -20,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: '4.5rem',
              textTransform: 'uppercase',
              color: N,
              opacity: 0.07,
              lineHeight: 0.9,
              whiteSpace: 'nowrap',
              zIndex: 0,
              letterSpacing: '-0.02em',
              fontStyle: 'italic',
              userSelect: 'none',
            }}
          >
            Trouve ton élan
          </div>

          {/* Photo frame */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              clipPath: 'polygon(0% 4%, 4% 0%, 96% 0%, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0% 96%)',
              boxShadow: `10px 10px 0 ${N}`,
              borderRadius: 4,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1529932398402-e0b30f66a559?w=620&h=460&fit=crop&auto=format"
              alt="Coach et athlète en séance"
              style={{ width: '100%', height: 380, objectFit: 'cover', display: 'block' }}
            />
            {/* Navy overlay tint */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(135deg, rgba(26,20,100,0.18) 0%, transparent 60%)`,
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Star badge top-right */}
          <div
            style={{
              position: 'absolute',
              top: -14,
              right: -14,
              width: 50,
              height: 50,
              background: N,
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(12deg)',
              zIndex: 2,
              boxShadow: `3px 3px 0 rgba(26,20,100,0.3)`,
            }}
          >
            <Star4 size={24} color={Y} />
          </div>

          {/* Arrow accent bottom-left */}
          <div
            style={{
              position: 'absolute',
              bottom: 20,
              left: -24,
              zIndex: 2,
            }}
          >
            <Triangle size={30} color={N} rotate={90} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─── */

const SOCIAL_ICONS = [
  {
    name: 'Instagram',
    d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    name: 'LinkedIn',
    d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    name: 'X / Twitter',
    d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 5.838 5.45-5.838zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    name: 'YouTube',
    d: 'M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z',
  },
]

function FooterSection() {
  return (
    <footer>
      <div
        className="footer-grid"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}
        id="contact"
      >
        {/* ── Left: Navy — Suivez-nous ── */}
        <div
          style={{
            background: N,
            padding: '72px 64px',
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Ghost logo watermark */}
          <div
            style={{
              position: 'absolute',
              bottom: -40,
              left: -20,
              opacity: 0.04,
              pointerEvents: 'none',
            }}
          >
            <img src={logoKD} alt="" style={{ width: 260, filter: 'invert(1) sepia(1) saturate(0) brightness(10)' }} />
          </div>

          {/* Label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Triangle size={11} color={Y} rotate={90} />
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: '0.78rem',
                color: Y,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                opacity: 0.8,
              }}
            >
              Retrouvez-nous
            </span>
          </div>

          <h3
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.4rem, 4vw, 3.2rem)',
              textTransform: 'uppercase',
              color: W,
              lineHeight: 0.92,
              letterSpacing: '-0.01em',
            }}
          >
            Suivez-nous
          </h3>

          <p
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontFamily: "'Barlow', sans-serif",
              fontSize: '0.95rem',
              lineHeight: 1.65,
              maxWidth: 320,
            }}
          >
            Contenu quotidien, coulisses et inspirations sport. On est là où vous êtes.
          </p>

          {/* Social badges */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {SOCIAL_ICONS.map(s => (
              <a
                key={s.name}
                href="#"
                title={s.name}
                style={{
                  width: 52,
                  height: 52,
                  background: 'rgba(242,233,78,0.08)',
                  border: `1.5px solid rgba(242,233,78,0.22)`,
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s, transform 0.15s, border-color 0.2s',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.background = Y
                  el.style.borderColor = Y
                  el.style.transform = 'translateY(-3px) scale(1.05)'
                  const svg = el.querySelector('path') as SVGPathElement
                  if (svg) svg.style.fill = N
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.background = 'rgba(242,233,78,0.08)'
                  el.style.borderColor = 'rgba(242,233,78,0.22)'
                  el.style.transform = 'none'
                  const svg = el.querySelector('path') as SVGPathElement
                  if (svg) svg.style.fill = 'rgba(242,233,78,0.9)'
                }}
              >
                <svg viewBox="0 0 24 24" width={20} height={20}>
                  <path d={s.d} fill="rgba(242,233,78,0.9)" style={{ transition: 'fill 0.15s' }} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* ── Right: Yellow — Communauté ── */}
        <div
          style={{
            background: Y,
            padding: '72px 64px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 24,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Corner shapes */}
          <div style={{ position: 'absolute', top: -30, right: -30, opacity: 0.1, pointerEvents: 'none' }}>
            <Triangle size={140} color={N} rotate={180} />
          </div>
          <div style={{ position: 'absolute', bottom: 24, right: 50, opacity: 0.08, pointerEvents: 'none' }}>
            <Star4 size={80} color={N} />
          </div>

          {/* Label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'relative', zIndex: 1 }}>
            <Triangle size={11} color={N} rotate={90} />
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: '0.78rem',
                color: N,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                opacity: 0.65,
              }}
            >
              Communauté K-DNCE
            </span>
          </div>

          <h3
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2rem, 3.8vw, 3rem)',
              textTransform: 'uppercase',
              color: N,
              lineHeight: 0.92,
              letterSpacing: '-0.01em',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Rejoignez la
            <br />
            communauté
            <br />
            <span style={{ color: N, fontStyle: 'italic' }}>K-DNCE</span>
          </h3>

          <p
            style={{
              color: N,
              opacity: 0.72,
              fontFamily: "'Barlow', sans-serif",
              fontSize: '0.95rem',
              lineHeight: 1.65,
              maxWidth: 340,
              position: 'relative',
              zIndex: 1,
            }}
          >
            Des ressources exclusives, des échanges entre passionnés, et un réseau qui pousse à aller plus loin.
          </p>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <PillBtn variant="navy">
              <ArrowRight size={16} color={Y} />
              Rejoindre maintenant
            </PillBtn>
          </div>

          {/* Copyright */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              marginTop: 16,
              paddingTop: 20,
              borderTop: `1.5px solid rgba(26,20,100,0.18)`,
              fontFamily: "'Barlow', sans-serif",
              fontSize: '0.78rem',
              color: N,
              opacity: 0.5,
            }}
          >
            © 2025 K-DNCE Agency. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── App ─── */

export default function App() {
  const isBlogPage = window.location.pathname.replace(/\/+$/, '') === '/blog'

  useEffect(() => {
    if (isBlogPage || !window.location.hash) return

    const sectionId = decodeURIComponent(window.location.hash.slice(1))
    const frame = window.requestAnimationFrame(() => {
      const section = document.getElementById(sectionId)
      if (!section) return

      const headerOffset = 90
      const sectionTop = section.getBoundingClientRect().top + window.scrollY - headerOffset
      window.scrollTo({ top: sectionTop, behavior: 'smooth' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [isBlogPage])

  return (
    <div style={{ fontFamily: "'Barlow', sans-serif", background: W }}>
      <Navbar />
      {isBlogPage ? (
        <Blog />
      ) : (
        <>
          <Hero />
          <MarqueeBanner />
          <Services />
          <AboutSection />
          <BlogSection />
        </>
      )}
      <FooterSection />
    </div>
  )
}

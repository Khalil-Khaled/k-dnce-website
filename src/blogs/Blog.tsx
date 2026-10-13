import { useEffect, useState } from "react";
import './index.css'

type ArticleData = {
  id: string;
  category: string;
  title: string;
  intro: string;
  image: string;
  alt: string;
  heading: string;
  paragraphs: string[];
  bullets: string[];
  quote: string;
};

const articles: ArticleData[] = [
  {
    id: "athletes",
    category: "Athlètes & Coachs",
    title: "Coach ou athlète indépendant : comment construire sa marque personnelle sur les réseaux",
    intro:
      "Votre notoriété est votre premier outil de vente. Découvrez comment structurer votre image et attirer vos premiers clients en ligne.",
    image:
      "https://images.unsplash.com/photo-1605296867724-fa87a8ef53fd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1400",
    alt: "Athlète concentré près d'une barre dans une salle de sport",
    heading: "Construire une identité qui vous ressemble",
    paragraphs: [
      "Votre marque personnelle ne se résume pas à un logo. Elle repose sur une promesse claire : le résultat que vous aidez votre audience à atteindre, avec une méthode et une personnalité qui vous appartiennent.",
      "Choisissez deux réseaux prioritaires et publiez avec régularité. Chaque contenu doit informer, prouver votre expertise ou créer une connexion avec votre communauté.",
    ],
    bullets: [
      "Définissez une cible et une promesse précises.",
      "Créez trois piliers de contenus faciles à tenir.",
      "Montrez des preuves : résultats, méthode et témoignages.",
    ],
    quote: "Une audience engagée de 1 000 personnes vaut mieux que 10 000 abonnés passifs.",
  },
  {
    id: "fitness",
    category: "Clubs de Fitness",
    title: "Salle de sport et box CrossFit : attirer de nouveaux membres grâce au digital",
    intro:
      "Entre visibilité locale et publicité ciblée, les leviers pour remplir vos cours existent. Voici ceux qui fonctionnent vraiment.",
    image:
      "https://images.unsplash.com/photo-1547226238-e53e98a8e59d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1400",
    alt: "Groupe de sportifs pendant un entraînement collectif en salle",
    heading: "Transformer la visibilité locale en inscriptions",
    paragraphs: [
      "Vos futurs membres cherchent d'abord une salle proche, accessible et rassurante. Une fiche Google optimisée, des avis récents et des contenus locaux constituent votre premier avantage.",
      "La publicité devient performante lorsqu'elle prolonge une offre claire. Mettez en avant une séance d'essai, ciblez votre zone de chalandise et simplifiez au maximum la prise de rendez-vous.",
    ],
    bullets: [
      "Optimisez votre présence Google et vos avis clients.",
      "Montrez l'énergie réelle des cours et de vos coachs.",
      "Relancez chaque prospect avec un parcours automatisé.",
    ],
    quote: "Le meilleur coût par clic ne sert à rien si le parcours d'inscription crée de la friction.",
  },
  {
    id: "clubs",
    category: "Clubs Sportifs Pro",
    title: "Club sportif : engager vos supporters et convaincre vos sponsors",
    intro:
      "Une communauté active et un kit média solide font la différence face aux partenaires. Découvrez comment les construire.",
    image:
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1400",
    alt: "Équipe de football professionnel en action sur le terrain",
    heading: "Faire de votre communauté un actif média",
    paragraphs: [
      "Les sponsors n'achètent plus seulement de la visibilité. Ils recherchent une audience identifiable, active et capable de se mobiliser autour d'histoires fortes.",
      "Structurez vos statistiques, vos formats et vos temps forts dans un kit média lisible. Reliez chaque proposition à un objectif concret de marque pour passer du sponsoring au partenariat.",
    ],
    bullets: [
      "Mesurez l'engagement au-delà du nombre d'abonnés.",
      "Créez des formats récurrents que les partenaires peuvent incarner.",
      "Présentez des activations chiffrées et personnalisées.",
    ],
    quote: "Votre communauté est une force sportive, mais aussi un média à part entière.",
  },
];

function ArrowIcon({ up = false }: { up?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={`icon ${up ? "rotate" : ""}`}>
      <path d="m4 7 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function Bolt() {
  return (
    <svg aria-hidden="true" viewBox="0 0 30 50" className="bolt">
      <path d="M18 0 2 29h11L9 50l19-29H17L18 0Z" fill="currentColor" />
    </svg>
  );
}

function Article({ data, index }: { data: ArticleData; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <section id={data.id} className={`article-section ${index === 1 ? "dark" : ""}`}>
      <div className={`article-lead ${index % 2 ? "reverse" : ""}`}>
        <div className="article-copy">
          <span className="badge">{data.category}</span>
          <h2>{data.title}</h2>
          <p className="intro">{data.intro}</p>
          <button
            className={`btn ${index === 1 ? "btn-yellow" : "btn-navy"}`}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls={`${data.id}-content`}
          >
            {open ? "Réduire" : "Lire l'article"} <ArrowIcon up={open} />
          </button>
        </div>
        <div className="image-frame">
          <img src={data.image} alt={data.alt} />
          <div className="image-overlay" />
          <span className="image-index">0{index + 1}</span>
        </div>
      </div>
      <div id={`${data.id}-content`} className={`accordion ${open ? "expanded" : ""}`}>
        <div className="article-body">
          <h3>{data.heading}</h3>
          <p>{data.paragraphs[0]}</p>
          <p>
            Pour poser les bonnes bases, commencez par clarifier vos objectifs avec une{" "}
            <a href="/#services">stratégie digitale sur mesure</a>.
          </p>
          <ul>
            {data.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <blockquote>“{data.quote}”</blockquote>
          <h3>Passer de l'intention aux résultats</h3>
          <p>{data.paragraphs[1]}</p>
          <p>
            Besoin d'un regard extérieur ? <a href="/#contact">Parlez-nous de votre projet</a> ou
            découvrez directement nos <a href="/#services">offres adaptées au sport</a>.
          </p>
          <div className="article-cta">
            <div>
              <span>ACCÉLÉREZ VOTRE CROISSANCE</span>
              <strong>Besoin d'aide ? Découvrez nos packs</strong>
            </div>
            <a className="btn btn-navy" href="/#services">
              Voir les tarifs <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Blog() {
  const [active, setActive] = useState("athletes");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    articles.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main id="blog-page">
        <section className="hero">
          <div className="speed-lines" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="hero-inner">
            <div>
              <p className="eyebrow">EXPERTISE · TERRAIN · PERFORMANCE</p>
              <h1>
                Le Blog K-DNCE :<br />
                le marketing digital <em>version sport</em>
              </h1>
              <p className="hero-subtitle">
                Conseils et stratégies pour développer votre visibilité sportive, selon votre
                profil.
              </p>
            </div>
            <div className="hero-mark" aria-hidden="true">
              <span>+</span>
              <Bolt />
            </div>
          </div>
        </section>

        <nav className="category-nav" aria-label="Catégories du blog">
          <div className="category-inner">
            {articles.map((article, index) => (
              <a
                key={article.id}
                href={`#${article.id}`}
                className={active === article.id ? "selected" : ""}
              >
                <span>0{index + 1}</span> {article.category}
              </a>
            ))}
          </div>
        </nav>

        {articles.map((article, index) => (
          <Article key={article.id} data={article} index={index} />
        ))}

        <section className="final-cta">
          <span className="star" aria-hidden="true">✦</span>
          <p>VOTRE PROCHAIN OBJECTIF COMMENCE ICI</p>
          <h2>Prêt à passer à la vitesse supérieure ?</h2>
          <a className="btn btn-yellow" href="/#contact">
            Demander un devis <span aria-hidden="true">→</span>
          </a>
        </section>
    </main>
  );
}

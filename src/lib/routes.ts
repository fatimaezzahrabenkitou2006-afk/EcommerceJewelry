export type PageKind =
  | "catalog"
  | "collections"
  | "gifts"
  | "editorial"
  | "inspiration"
  | "faq"
  | "service"
  | "contact"
  | "account"
  | "cookies";
export type PageDefinition = {
  title: string;
  eyebrow: string;
  description: string;
  kind: PageKind;
  image: string;
  category?: string;
};
export const pages: Record<string, PageDefinition> = {
  collections: {
    title: "Nos Collections",
    eyebrow: "Les univers Éclat",
    description:
      "Des lignes intemporelles, des pierres lumineuses. Trouvez la création qui raconte votre histoire.",
    kind: "collections",
    image: "seasonal",
  },
  bagues: {
    title: "Bagues",
    eyebrow: "Un symbole, une émotion",
    description:
      "Solitaires délicats et éclats de diamants. Des bagues pensées pour célébrer chaque instant.",
    kind: "catalog",
    image: "category-rings",
    category: "Bagues",
  },
  colliers: {
    title: "Colliers",
    eyebrow: "La lumière au plus près de vous",
    description:
      "Une fleur, une goutte, un éclat. Des colliers précieux qui se portent comme une seconde peau.",
    kind: "catalog",
    image: "category-necklaces",
    category: "Colliers",
  },
  "boucles-oreilles": {
    title: "Boucles d’oreilles",
    eyebrow: "Le mouvement de la lumière",
    description:
      "Des créations délicates qui illuminent le visage et accompagnent chacun de vos mouvements.",
    kind: "catalog",
    image: "category-earrings",
    category: "Boucles d’oreilles",
  },
  bracelets: {
    title: "Bracelets",
    eyebrow: "L’élégance au poignet",
    description:
      "La finesse de l’or, la lumière du diamant. Des liens précieux à garder tout près de soi.",
    kind: "catalog",
    image: "category-bracelets",
    category: "Bracelets",
  },
  nouveautes: {
    title: "Nos Nouveautés",
    eyebrow: "Le nouveau chapitre",
    description:
      "Découvrez les dernières créations de notre Maison. Une nouvelle façon de faire rayonner votre style.",
    kind: "catalog",
    image: "necklace-clover",
  },
  "lumiere-eternelle": {
    title: "Lumière Éternelle",
    eyebrow: "Collection signature",
    description:
      "Une collection lumineuse et sophistiquée, inspirée par la beauté des instants précieux.",
    kind: "catalog",
    image: "seasonal",
  },
  "idees-cadeaux": {
    title: "L’Art d’Offrir",
    eyebrow: "Les attentions précieuses",
    description:
      "Un bijou pour dire merci, pour dire toujours, pour dire je t’aime. À chaque occasion, son éclat.",
    kind: "gifts",
    image: "gift",
  },
  fiancailles: {
    title: "Fiançailles",
    eyebrow: "Le début d’un toujours",
    description:
      "Un solitaire pour une promesse. Découvrez les bagues qui célèbrent votre histoire.",
    kind: "catalog",
    image: "ring-solitaire",
    category: "Bagues",
  },
  mariage: {
    title: "Mariage",
    eyebrow: "Un amour qui traverse le temps",
    description:
      "Des lignes d’or et de lumière pour accompagner le plus beau des engagements.",
    kind: "catalog",
    image: "category-collections",
    category: "Bagues",
  },
  anniversaire: {
    title: "Anniversaire",
    eyebrow: "Les beaux instants se célèbrent",
    description:
      "Une attention choisie avec le cœur, un souvenir qui se porte chaque jour.",
    kind: "catalog",
    image: "bracelet-river",
  },
  declaration: {
    title: "Déclaration",
    eyebrow: "L’essentiel, avec éclat",
    description:
      "Les mots ne suffisent pas toujours. Laissez parler une création précieuse.",
    kind: "catalog",
    image: "necklace-flower",
  },
  "notre-maison": {
    title: "Notre Maison",
    eyebrow: "La passion du beau",
    description:
      "La beauté d’une pierre. La justesse d’un geste. L’émotion d’une création qui vous ressemble.",
    kind: "editorial",
    image: "artisan",
  },
  "notre-histoire": {
    title: "Notre Histoire",
    eyebrow: "L’esprit Éclat",
    description:
      "Une Maison animée par une idée simple : donner forme aux émotions et de la lumière aux souvenirs.",
    kind: "editorial",
    image: "inspiration-7",
  },
  "savoir-faire": {
    title: "Notre Savoir-faire",
    eyebrow: "L’excellence artisanale",
    description:
      "Du dessin au dernier poli, chaque détail compte. Découvrez les gestes qui donnent vie à nos bijoux.",
    kind: "editorial",
    image: "artisan",
  },
  engagements: {
    title: "Nos Engagements",
    eyebrow: "La beauté a du sens",
    description:
      "Des créations pensées pour durer, un accompagnement attentif et le respect du travail bien fait.",
    kind: "editorial",
    image: "inspiration-2",
  },
  "pierres-et-materiaux": {
    title: "Pierres et Matériaux",
    eyebrow: "La matière et la lumière",
    description:
      "L’éclat des diamants et la chaleur de l’or se rencontrent dans des créations d’une grande finesse.",
    kind: "editorial",
    image: "category-earrings",
  },
  presse: {
    title: "Presse",
    eyebrow: "Regards sur la Maison",
    description:
      "L’univers Éclat, ses inspirations et ses créations. Pour toute demande éditoriale, notre équipe vous accompagne.",
    kind: "service",
    image: "inspiration-7",
  },
  inspiration: {
    title: "Inspiration Éclat",
    eyebrow: "Le journal de la Maison",
    description:
      "Des détails qui inspirent, des instants qui restent. Entrez dans notre univers de lumière.",
    kind: "inspiration",
    image: "inspiration-6",
  },
  faq: {
    title: "Vos Questions, Nos Réponses",
    eyebrow: "À votre écoute",
    description:
      "Livraison, taille, authenticité, entretien : notre Maison vous accompagne à chaque étape.",
    kind: "faq",
    image: "diamond-decoration",
  },
  "livraison-retours": {
    title: "Livraison & Retours",
    eyebrow: "Vos créations, en toute sérénité",
    description:
      "Une attention particulière, de la préparation de votre écrin à la réception de votre création.",
    kind: "service",
    image: "gift",
  },
  entretien: {
    title: "Prendre Soin de vos Bijoux",
    eyebrow: "Préserver leur éclat",
    description:
      "Quelques gestes délicats pour conserver la beauté de vos créations au fil du temps.",
    kind: "service",
    image: "inspiration-5",
  },
  authenticite: {
    title: "Certificat d’Authenticité",
    eyebrow: "Une création, une signature",
    description:
      "Chaque bijou est accompagné de son certificat d’authenticité. Une attention qui suit votre création.",
    kind: "service",
    image: "ring-eternity",
  },
  contact: {
    title: "Contactez la Maison",
    eyebrow: "Une attention personnelle",
    description:
      "Un conseil, une question, un moment à célébrer. Nous sommes à votre écoute.",
    kind: "contact",
    image: "inspiration-7",
  },
  compte: {
    title: "Votre Espace Éclat",
    eyebrow: "Un lien privilégié",
    description:
      "Notre conciergerie vous accompagne pour vos commandes, vos envies et vos prochaines créations.",
    kind: "account",
    image: "gift",
  },
  "conditions-generales": {
    title: "Conditions Générales de Vente",
    eyebrow: "Informations de la Maison",
    description:
      "Retrouvez les informations relatives à votre sélection et à l’accompagnement de votre commande.",
    kind: "service",
    image: "gift",
  },
  confidentialite: {
    title: "Politique de Confidentialité",
    eyebrow: "La confiance avant tout",
    description:
      "Pour toute question relative à vos données personnelles, notre Maison est à votre écoute.",
    kind: "service",
    image: "inspiration-2",
  },
  "mentions-legales": {
    title: "Mentions Légales",
    eyebrow: "Informations de la Maison",
    description:
      "Pour toute demande concernant ce site et la Maison Éclat Joaillerie, contactez notre équipe.",
    kind: "service",
    image: "inspiration-7",
  },
  cookies: {
    title: "Vos Préférences de Cookies",
    eyebrow: "Votre expérience, vos choix",
    description:
      "Choisissez les préférences que vous souhaitez conserver pour votre navigation.",
    kind: "cookies",
    image: "inspiration-2",
  },
};
const links: Record<string, string> = {
  Accueil: "/",
  Collections: "/collections",
  Bagues: "/bagues",
  Colliers: "/colliers",
  "Boucles d’oreilles": "/boucles-oreilles",
  Bracelets: "/bracelets",
  Nouveautés: "/nouveautes",
  "Idées Cadeaux": "/idees-cadeaux",
  "Lumière Éternelle": "/lumiere-eternelle",
  Fiançailles: "/fiancailles",
  Mariage: "/mariage",
  Anniversaire: "/anniversaire",
  Déclaration: "/declaration",
  "Notre Histoire": "/notre-histoire",
  "Savoir-faire": "/savoir-faire",
  Engagements: "/engagements",
  "Pierres et matériaux": "/pierres-et-materiaux",
  Presse: "/presse",
  FAQ: "/faq",
  "Livraison & retours": "/livraison-retours",
  "Entretien de vos bijoux": "/entretien",
  "Certificat d’authenticité": "/authenticite",
  Contact: "/contact",
  "Conditions générales de vente": "/conditions-generales",
  "Politique de confidentialité": "/confidentialite",
  "Mentions légales": "/mentions-legales",
  "Gestion des cookies": "/cookies",
};
export function routeFor(label: string): string {
  return links[label] ?? "/inspiration";
}

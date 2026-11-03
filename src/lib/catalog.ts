export type Product = {
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
};
export const products: Product[] = [
  {
    name: "Bague Éternité",
    price: 3490,
    image: "ring-eternity",
    category: "Bagues",
  },
  {
    name: "Collier Fleur de Diamant",
    price: 2890,
    image: "necklace-flower",
    category: "Colliers",
  },
  {
    name: "Boucles Lumière",
    price: 1790,
    image: "earrings-light",
    category: "Boucles d’oreilles",
  },
  {
    name: "Bracelet Élégance",
    price: 2490,
    image: "bracelet-elegance",
    category: "Bracelets",
  },
  {
    name: "Bague Solitaire Classique",
    price: 3190,
    image: "ring-solitaire",
    category: "Bagues",
  },
  {
    name: "Bague Poire Essentielle",
    price: 3290,
    image: "ring-pear",
    category: "Bagues",
    isNew: true,
  },
  {
    name: "Collier Trèfle de Lumière",
    price: 2690,
    image: "necklace-clover",
    category: "Colliers",
    isNew: true,
  },
  {
    name: "Boucles Goutte Royale",
    price: 1990,
    image: "earrings-royal",
    category: "Boucles d’oreilles",
    isNew: true,
  },
  {
    name: "Bracelet Rivière de Diamants",
    price: 3490,
    image: "bracelet-river",
    category: "Bracelets",
    isNew: true,
  },
];
export const categories = [
  {
    name: "Bagues",
    description: "Symbole d’amour et d’éternité",
    image: "category-rings",
  },
  {
    name: "Colliers",
    description: "L’éclat au plus près de vous",
    image: "category-necklaces",
  },
  {
    name: "Boucles d’oreilles",
    description: "La touche d’éclat parfaite",
    image: "category-earrings",
  },
  {
    name: "Bracelets",
    description: "Élégance et finesse au poignet",
    image: "category-bracelets",
  },
  {
    name: "Collections",
    description: "Nos univers d’exception",
    image: "category-collections",
  },
];
export const faqs = [
  [
    "Quels sont les délais de livraison ?",
    "Votre création est préparée avec soin et expédiée sous 3 à 5 jours ouvrés. La livraison est offerte dès 150 € d’achat en France métropolitaine.",
  ],
  [
    "Puis-je faire ajuster la taille d’une bague ?",
    "Notre atelier vous accompagne pour une mise à taille. Contactez notre Maison afin de connaître les possibilités d’ajustement de votre modèle.",
  ],
  [
    "Les bijoux sont-ils certifiés ?",
    "Chaque création est accompagnée de son certificat d’authenticité précisant ses matériaux et les caractéristiques de ses pierres.",
  ],
  [
    "Puis-je retourner ou échanger un bijou ?",
    "Notre Maison vous accompagne pour tout retour ou échange. Contactez notre équipe pour connaître les modalités applicables à votre création.",
  ],
];
export const price = (value: number) => `${value.toLocaleString("fr-FR")} €`;

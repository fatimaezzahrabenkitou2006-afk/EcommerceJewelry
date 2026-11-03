"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { products, categories, faqs, price, type Product } from "@/lib/catalog";
import { routeFor } from "@/lib/routes";
import { useShopping } from "./shopping-provider";
import { HeroSlider } from "./hero-slider";
import { InnerPage } from "./inner-page";
import {
  ArrowRight,
  Award,
  Gem,
  Gift,
  Heart,
  Infinity as InfinityIcon,
  LockKeyhole,
  Mail,
  Menu,
  Plus,
  Search,
  ShoppingBag,
  Star,
  Truck,
  UserRound,
  Scissors,
  Circle,
  Check,
} from "lucide-react";
import Instagram from "@icons-pack/react-simple-icons/icons/SiInstagram";
import Facebook from "@icons-pack/react-simple-icons/icons/SiFacebook";
import Youtube from "@icons-pack/react-simple-icons/icons/SiYoutube";
import Pinterest from "@icons-pack/react-simple-icons/icons/SiPinterest";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.email("Veuillez saisir une adresse e-mail valide."),
});
function Photo({
  name,
  alt,
  priority = false,
}: {
  name: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={`/images/eclat/${name}.webp`}
      alt={alt}
      fill
      sizes={
        name === "hero" || name === "seasonal"
          ? "(max-width: 600px) 100vw, 65vw"
          : "(max-width: 600px) 50vw, 35vw"
      }
      quality={95}
      priority={priority}
    />
  );
}
function Heading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="section-heading">
      <h2>
        <span>{title}</span>
      </h2>
      <p>{subtitle}</p>
    </div>
  );
}

export default function Storefront({ pageSlug }: { pageSlug?: string }) {
  const router = useRouter();
  const { ready, favorites, setFavorites, cart, setCart } = useShopping();
  const [panel, setPanel] = useState<"cart" | "favorites" | "menu" | null>(
    null,
  );
  const [modal, setModal] = useState<"search" | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [query, setQuery] = useState("");
  const newsletterForm = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });
  const [subscribed, setSubscribed] = useState(false);
  const toggleFavorite = (product: Product) =>
    setFavorites((current) =>
      current.includes(product.name)
        ? current.filter((name) => name !== product.name)
        : [...current, product.name],
    );
  const openCollection = (name: string) => {
    setPanel(null);
    router.push(routeFor(name));
  };
  const showInformation = (name: string) => router.push(routeFor(name));
  const addToCart = (product: Product) => {
    setCart((current) => [...current, product]);
    setSelectedProduct(null);
    setModal(null);
    toast.success(`${product.name} ajouté à votre panier`);
  };
  function ProductCard({ product }: { product: Product }) {
    return (
      <article className={`product-card ${product.isNew ? "new-product" : ""}`}>
        {product.isNew && <span className="new-badge">Nouveauté</span>}
        <Button
          variant="ghost"
          size="icon"
          className={`favorite-button ${favorites.includes(product.name) ? "is-favorite" : ""}`}
          disabled={!ready}
          onClick={() => toggleFavorite(product)}
          aria-label={`${favorites.includes(product.name) ? "Retirer" : "Ajouter"} ${product.name} ${favorites.includes(product.name) ? "des" : "aux"} favoris`}
        >
          <Heart aria-hidden="true" />
        </Button>
        <Button
          variant="ghost"
          className="product-open"
          onClick={() => {
            setModal(null);
            setSelectedProduct(product);
          }}
        >
          <span className="product-photo">
            <Photo name={product.image} alt={product.name} />
          </span>
          <span className="product-name">{product.name}</span>
          <span className="product-price">{price(product.price)}</span>
        </Button>
      </article>
    );
  }
  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLocaleLowerCase("fr")
      .includes(query.toLocaleLowerCase("fr")),
  );
  return (
    <div className="page-shell">
      <div className="storefront">
        <div className="announcement">
          <Gem aria-hidden="true" />
          <span>Livraison offerte dès 150 € d’achat</span>
          <i />
          <span>Nouvelle Collection « Lumière Éternelle »</span>
          <i />
          <span>Paiement 100% sécurisé</span>
        </div>
        <header className="site-header">
          <Link
            href="/"
            className="brand"
            aria-label="Éclat Joaillerie — Accueil"
          >
            <Gem aria-hidden="true" />
            <span>Éclat Joaillerie</span>
          </Link>
          <nav aria-label="Navigation principale">
            {[
              "Accueil",
              "Collections",
              "Bagues",
              "Colliers",
              "Boucles d’oreilles",
              "Bracelets",
              "Nouveautés",
              "Idées Cadeaux",
            ].map((name) => (
              <Link
                key={name}
                href={routeFor(name)}
                className={
                  (pageSlug ? "/" + pageSlug : "/") === routeFor(name)
                    ? "active"
                    : ""
                }
                aria-current={
                  (pageSlug ? "/" + pageSlug : "/") === routeFor(name)
                    ? "page"
                    : undefined
                }
              >
                {name}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Button
              size="icon"
              variant="ghost"
              aria-label="Rechercher"
              onClick={() => setModal("search")}
            >
              <Search />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              aria-label="Mon compte"
              nativeButton={false}
              role="link"
              render={<Link href="/compte" />}
            >
              <UserRound />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              aria-label="Mes favoris"
              onClick={() => setPanel("favorites")}
            >
              <Heart />
              {favorites.length > 0 && (
                <span className="count">{favorites.length}</span>
              )}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              aria-label="Mon panier"
              onClick={() => setPanel("cart")}
            >
              <ShoppingBag />
              <span className="count">{cart.length}</span>
            </Button>
            <Button
              className="mobile-menu"
              size="icon"
              variant="ghost"
              aria-label="Ouvrir le menu"
              onClick={() => setPanel("menu")}
            >
              <Menu />
            </Button>
          </div>
        </header>
        <main>
          {pageSlug ? (
            <InnerPage
              key={pageSlug}
              slug={pageSlug}
              renderProduct={(product) => (
                <ProductCard key={product.name} product={product} />
              )}
            />
          ) : (
            <>
              <HeroSlider />
              <section className="collections section-wrap" id="collections">
                <Heading
                  title="Nos Collections Iconiques"
                  subtitle="Des pièces uniques pour révéler toutes les facettes de votre élégance."
                />
                <div className="category-grid">
                  {categories.map((category) => (
                    <Button
                      variant="ghost"
                      className="category-card"
                      key={category.name}
                      nativeButton={false}
                      role="link"
                      render={<Link href={routeFor(category.name)} />}
                    >
                      <span className="category-photo">
                        <Photo name={category.image} alt={category.name} />
                      </span>
                      <span className="category-name">{category.name}</span>
                      <span className="category-description">
                        {category.description}
                      </span>
                      <ArrowRight aria-hidden="true" />
                    </Button>
                  ))}
                </div>
              </section>
              <section className="bestsellers section-wrap" id="creations">
                <Heading
                  title="Nos Pièces Prisées"
                  subtitle="Les créations les plus iconiques, plébiscitées par nos clientes."
                />
                <div className="product-grid">
                  {products.slice(0, 5).map((product) => (
                    <ProductCard key={product.name} product={product} />
                  ))}
                </div>
              </section>
              <section className="new-arrivals section-wrap" id="nouveautes">
                <Heading
                  title="Nos Nouveautés"
                  subtitle="Découvrez nos dernières créations, pensées pour illuminer votre style."
                />
                <div className="product-grid new-grid">
                  {products.slice(5).map((product) => (
                    <ProductCard key={product.name} product={product} />
                  ))}
                </div>
              </section>
              <section className="maison" id="maison">
                <div className="artisan-photo">
                  <Photo
                    name="artisan"
                    alt="Un artisan joaillier sertit un diamant dans une bague en or"
                  />
                </div>
                <div className="maison-copy">
                  <span className="eyebrow">Notre Maison</span>
                  <h2>L’Excellence Artisanale</h2>
                  <p>
                    Chez Éclat Joaillerie, chaque pièce est le fruit d’un
                    savoir-faire artisanal d’exception. Des matériaux rares, des
                    pierres rigoureusement sélectionnées et une exigence absolue
                    du détail, pour des créations qui traversent le temps.
                  </p>
                  <div className="maison-values">
                    {[
                      {
                        icon: Gem,
                        text: (
                          <>
                            Pierres rares
                            <br />
                            et certifiées
                          </>
                        ),
                      },
                      {
                        icon: Scissors,
                        text: (
                          <>
                            Savoir-faire
                            <br />
                            artisanal
                          </>
                        ),
                      },
                      {
                        icon: InfinityIcon,
                        text: (
                          <>
                            Créations
                            <br />
                            intemporelles
                          </>
                        ),
                      },
                    ].map(({ icon: Icon, text }, index) => (
                      <div key={index}>
                        <Icon aria-hidden="true" />
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="outline-cta light-cta"
                    nativeButton={false}
                    role="link"
                    render={<Link href="/notre-maison" />}
                  >
                    Découvrir notre univers <ArrowRight aria-hidden="true" />
                  </Button>
                </div>
                <div className="maison-diamond">
                  <Photo name="diamond-decoration" alt="" />
                </div>
              </section>
              <section className="benefits" aria-label="Nos engagements">
                {[
                  {
                    icon: Truck,
                    title: "Livraison offerte",
                    text: "dès 150 € d’achat",
                  },
                  {
                    icon: Award,
                    title: "Certificat d’authenticité",
                    text: "pour chaque création",
                  },
                  {
                    icon: Gift,
                    title: "Écrin signature",
                    text: "un écrin élégant et raffiné",
                  },
                  {
                    icon: LockKeyhole,
                    title: "Paiement sécurisé",
                    text: "par carte et solutions fiables",
                  },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title}>
                    <Icon aria-hidden="true" />
                    <p>
                      <strong>{title}</strong>
                      <span>{text}</span>
                    </p>
                  </div>
                ))}
              </section>
              <section className="seasonal">
                <div className="seasonal-texture" />
                <div className="seasonal-photo">
                  <Photo
                    name="seasonal"
                    alt="Collier et boucles d’oreilles en diamants sur une pierre naturelle"
                  />
                </div>
                <div className="seasonal-copy">
                  <span className="eyebrow">Collection Saisonnière</span>
                  <h2>Lumière Éternelle</h2>
                  <p>
                    Une collection lumineuse et sophistiquée, inspirée
                    <br />
                    par la beauté des instants précieux.
                  </p>
                  <Button
                    className="outline-cta dark-cta"
                    onClick={() => openCollection("Lumière Éternelle")}
                  >
                    Découvrir la collection <ArrowRight aria-hidden="true" />
                  </Button>
                </div>
              </section>
              <section className="gift-guide section-wrap" id="cadeaux">
                <Heading
                  title="Guide Cadeaux"
                  subtitle="Des idées précieuses pour célébrer chaque occasion."
                />
                <div className="gift-grid">
                  <div className="gift-photo">
                    <Photo
                      name="gift"
                      alt="Écrin cadeau Éclat Joaillerie, ruban de satin doré"
                    />
                  </div>
                  {[
                    {
                      title: "Fiançailles",
                      text: (
                        <>
                          Célébrer votre histoire
                          <br />
                          avec une création d’exception
                        </>
                      ),
                      icon: Circle,
                    },
                    {
                      title: "Mariage",
                      text: <>Des alliances pour la vie</>,
                      icon: InfinityIcon,
                    },
                    {
                      title: "Anniversaire",
                      text: (
                        <>
                          Un bijou pour marquer
                          <br />
                          un moment unique
                        </>
                      ),
                      icon: Gift,
                    },
                    {
                      title: "Déclaration",
                      text: <>Dites l’essentiel avec éclat</>,
                      icon: Heart,
                    },
                  ].map(({ title, text, icon: Icon }) => (
                    <Button
                      variant="ghost"
                      className="gift-card"
                      key={title}
                      nativeButton={false}
                      role="link"
                      render={<Link href={routeFor(title)} />}
                    >
                      <Icon className="occasion-icon" aria-hidden="true" />
                      <span className="gift-title">{title}</span>
                      <span className="gift-description">{text}</span>
                      <ArrowRight aria-hidden="true" />
                    </Button>
                  ))}
                </div>
              </section>
              <section className="testimonials">
                <div className="flowers flowers-left">
                  <Photo name="flowers-left" alt="" />
                </div>
                <div className="flowers flowers-right">
                  <Photo name="flowers-right" alt="" />
                </div>
                <Heading
                  title="Elles Parlent d’Éclat Joaillerie"
                  subtitle="La confiance et l’émotion de nos clientes sont notre plus belle récompense."
                />
                <div className="review-grid">
                  {[
                    {
                      quote: (
                        <>
                          « Une pièce absolument sublime, encore
                          <br />
                          plus belle en vrai. Un service attentionné
                          <br />
                          et une expérience d’achat d’une grande maison. »
                        </>
                      ),
                      name: "Sophie L.",
                    },
                    {
                      quote: (
                        <>
                          « Le collier est de qualité, le raffinement et le sens
                          du détail
                          <br />
                          sont exceptionnels. Ma bague Éternité
                          <br />
                          est devenue mon bijou préféré. »
                        </>
                      ),
                      name: "Camille R.",
                    },
                    {
                      quote: (
                        <>
                          « La rapidité, une délicate attention,
                          <br />
                          Des créations élégantes, intemporelles
                          <br />
                          et d’une grande finesse. »
                        </>
                      ),
                      name: "Élise M.",
                    },
                  ].map(({ quote, name }) => (
                    <figure key={name}>
                      <span className="quote-mark">“</span>
                      <blockquote>{quote}</blockquote>
                      <div className="stars" aria-label="5 étoiles sur 5">
                        {[0, 1, 2, 3, 4].map((star) => (
                          <Star key={star} aria-hidden="true" />
                        ))}
                      </div>
                      <figcaption>{name}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
              <section className="inspiration section-wrap" id="inspiration">
                <Heading
                  title="Inspiration Éclat"
                  subtitle="Suivez-nous sur Instagram @eclatjoaillerie"
                />
                <p className="inspiration-description">
                  et découvrez nos dernières créations, coulisses et
                  inspirations.
                </p>
                <div className="inspiration-grid">
                  {Array.from({ length: 7 }, (_, index) => (
                    <Button
                      variant="ghost"
                      className="inspiration-photo"
                      key={index}
                      onClick={() => showInformation("Inspiration Éclat")}
                      aria-label={`Découvrir l’inspiration ${index + 1}`}
                    >
                      <Photo
                        name={`inspiration-${index + 1}`}
                        alt={
                          [
                            "Boucles d’oreilles en diamants portées",
                            "Alliances en or et diamants",
                            "Collier délicat porté",
                            "Bracelets en diamants",
                            "Bague en or sur un tissu de soie",
                            "Portrait et bague solitaire",
                            "Le dôme des Invalides à Paris",
                          ][index]
                        }
                      />
                    </Button>
                  ))}
                </div>
              </section>
              <section className="faq" id="faq">
                <Heading
                  title="Vos Questions, Nos Réponses"
                  subtitle="Retrouvez ici les réponses aux questions les plus fréquentes."
                />
                <div className="faq-diamond">
                  <Photo name="diamond-decoration" alt="" />
                </div>
                <Accordion className="faq-list">
                  {faqs.map(([question, answer], index) => (
                    <AccordionItem value={`faq-${index}`} key={question}>
                      <AccordionTrigger>
                        {question}
                        <Plus className="faq-plus" aria-hidden="true" />
                      </AccordionTrigger>
                      <AccordionContent>{answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </>
          )}
          <section className="newsletter">
            <div className="newsletter-decoration newsletter-left">
              <Photo name="newsletter-left" alt="" />
            </div>
            <div className="newsletter-decoration newsletter-right">
              <Photo name="newsletter-right" alt="" />
            </div>
            <div className="newsletter-copy">
              <span className="eyebrow">Le Club Éclat</span>
              <h2>Rejoignez notre Cercle Privé</h2>
              <p>
                Recevez en avant-première nos nouvelles collections, des
                invitations
                <br />à nos événements exclusifs et des offres réservées à nos
                membres.
              </p>
            </div>
            <form
              className="newsletter-form"
              onSubmit={newsletterForm.handleSubmit(() => {
                setSubscribed(true);
                toast.success("Bienvenue dans le Cercle Privé Éclat !");
              })}
            >
              <Mail aria-hidden="true" />
              <Input
                type="email"
                required
                aria-label="Votre adresse e-mail"
                placeholder="Votre adresse e-mail"
                {...newsletterForm.register("email", {
                  onChange: () => setSubscribed(false),
                })}
              />
              <Button type="submit">
                {subscribed ? "Inscrit" : "S’inscrire"}
                {subscribed ? (
                  <Check aria-hidden="true" />
                ) : (
                  <ArrowRight aria-hidden="true" />
                )}
              </Button>
            </form>
          </section>
        </main>
        <footer className="site-footer">
          <div className="footer-main">
            <div className="footer-brand">
              <Link className="brand" href="/">
                <Gem aria-hidden="true" />
                <span>Éclat Joaillerie</span>
              </Link>
              <p>
                Maison de joaillerie française, créatrice
                <br />
                de pièces d’exception pour les moments
                <br />
                les plus précieux.
              </p>
            </div>
            <div>
              <h3>Nos Univers</h3>
              {[
                "Accueil",
                "Collections",
                "Bagues",
                "Colliers",
                "Boucles d’oreilles",
                "Bracelets",
                "Nouveautés",
                "Idées Cadeaux",
              ].map((name) => (
                <Button
                  variant="link"
                  key={name}
                  nativeButton={false}
                  role="link"
                  render={<Link href={routeFor(name)} />}
                >
                  {name}
                </Button>
              ))}
            </div>
            <div>
              <h3>La Maison</h3>
              {[
                "Notre Histoire",
                "Savoir-faire",
                "Engagements",
                "Pierres et matériaux",
                "Presse",
              ].map((name) => (
                <Button
                  variant="link"
                  key={name}
                  nativeButton={false}
                  role="link"
                  render={<Link href={routeFor(name)} />}
                >
                  {name}
                </Button>
              ))}
            </div>
            <div>
              <h3>Aide & Services</h3>
              {[
                "FAQ",
                "Livraison & retours",
                "Entretien de vos bijoux",
                "Certificat d’authenticité",
                "Contact",
              ].map((name) => (
                <Button
                  variant="link"
                  key={name}
                  nativeButton={false}
                  role="link"
                  render={<Link href={routeFor(name)} />}
                >
                  {name}
                </Button>
              ))}
            </div>
            <div className="social-links">
              <h3>Suivez-nous</h3>
              <div>
                {[
                  { icon: Instagram, name: "Instagram" },
                  { icon: Facebook, name: "Facebook" },
                  { icon: Pinterest, name: "Pinterest" },
                  { icon: Youtube, name: "YouTube" },
                ].map(({ icon: Icon, name }) => (
                  <Button
                    variant="ghost"
                    size="icon"
                    key={name}
                    aria-label={name}
                    onClick={() => showInformation(`Éclat sur ${name}`)}
                  >
                    <Icon />
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2025 Éclat Joaillerie. Tous droits réservés.</span>
            <div>
              {[
                "Conditions générales de vente",
                "Politique de confidentialité",
                "Mentions légales",
                "Gestion des cookies",
              ].map((name) => (
                <Button
                  variant="link"
                  key={name}
                  nativeButton={false}
                  role="link"
                  render={<Link href={routeFor(name)} />}
                >
                  {name}
                </Button>
              ))}
            </div>
          </div>
        </footer>
        <Sheet
          open={panel !== null}
          onOpenChange={(open) => !open && setPanel(null)}
        >
          <SheetContent className="boutique-sheet">
            <SheetHeader>
              <SheetTitle>
                {panel === "cart"
                  ? "Votre panier"
                  : panel === "favorites"
                    ? "Vos favoris"
                    : "Nos univers"}
              </SheetTitle>
              <SheetDescription>
                {panel === "cart"
                  ? "Vos créations précieuses, réunies avec soin."
                  : panel === "favorites"
                    ? "Les créations qui vous font rêver."
                    : "Découvrez la Maison Éclat."}
              </SheetDescription>
            </SheetHeader>
            <div className="sheet-body">
              {panel === "menu"
                ? [
                    ...categories.map((category) => category.name),
                    "Nouveautés",
                    "Idées Cadeaux",
                  ].map((name) => (
                    <Button
                      key={name}
                      variant="ghost"
                      nativeButton={false}
                      role="link"
                      render={
                        <Link
                          href={routeFor(name)}
                          onClick={() => setPanel(null)}
                        />
                      }
                    >
                      {name}
                      <ArrowRight />
                    </Button>
                  ))
                : (panel === "cart"
                    ? cart
                    : products.filter((product) =>
                        favorites.includes(product.name),
                      )
                  ).map((product, index) => (
                    <div className="bag-item" key={`${product.name}-${index}`}>
                      <div className="bag-photo">
                        <Photo name={product.image} alt={product.name} />
                      </div>
                      <div>
                        <h3>{product.name}</h3>
                        <p>{price(product.price)}</p>
                        <Button
                          variant="link"
                          onClick={() =>
                            panel === "cart"
                              ? setCart((current) =>
                                  current.filter(
                                    (_, itemIndex) => index !== itemIndex,
                                  ),
                                )
                              : toggleFavorite(product)
                          }
                        >
                          Retirer
                        </Button>
                        {panel === "favorites" && (
                          <Button
                            variant="link"
                            onClick={() => addToCart(product)}
                          >
                            Ajouter au panier
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
              {panel !== "menu" &&
                (panel === "cart"
                  ? cart.length === 0
                  : favorites.length === 0) && (
                  <p className="empty-message">
                    {panel === "cart"
                      ? "Votre panier attend votre première création."
                      : "Touchez le cœur d’un bijou pour le retrouver ici."}
                  </p>
                )}
              {panel === "cart" && cart.length > 0 && (
                <div className="cart-total">
                  <span>Total</span>
                  <strong>
                    {price(
                      cart.reduce((total, product) => total + product.price, 0),
                    )}
                  </strong>
                  <p>Livraison offerte · Écrin signature inclus</p>
                  <Button
                    className="gold-button"
                    onClick={() =>
                      toast.info(
                        "Contactez notre Maison à contact@eclatjoaillerie.fr pour finaliser votre sélection.",
                      )
                    }
                  >
                    Contacter la Maison
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
        <Dialog
          open={modal !== null}
          onOpenChange={(open) => !open && setModal(null)}
        >
          <DialogContent className="boutique-dialog wide-dialog">
            <DialogHeader>
              <DialogTitle>Trouvez votre éclat</DialogTitle>
              <DialogDescription>
                Recherchez une création, une pierre, une envie.
              </DialogDescription>
            </DialogHeader>
            <Input
              autoFocus
              placeholder="Rechercher une bague, un collier…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Rechercher un bijou"
            />
            <div className="modal-product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <p>Aucune création trouvée. Essayez « bague » ou « collier ».</p>
            )}
          </DialogContent>
        </Dialog>
        <Dialog
          open={selectedProduct !== null}
          onOpenChange={(open) => !open && setSelectedProduct(null)}
        >
          <DialogContent className="boutique-dialog product-dialog">
            {selectedProduct && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedProduct.name}</DialogTitle>
                  <DialogDescription>
                    Une création précieuse de la Maison Éclat.
                  </DialogDescription>
                </DialogHeader>
                <div className="detail-photo">
                  <Photo
                    name={selectedProduct.image}
                    alt={selectedProduct.name}
                  />
                </div>
                <p className="detail-price">{price(selectedProduct.price)}</p>
                <p>
                  Livraison offerte · Certificat d’authenticité · Écrin
                  signature
                </p>
                <Button
                  className="gold-button"
                  onClick={() => addToCart(selectedProduct)}
                >
                  Ajouter au panier <ShoppingBag />
                </Button>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

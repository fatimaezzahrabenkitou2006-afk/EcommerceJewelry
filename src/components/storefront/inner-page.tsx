"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Gem,
  Grid2X2,
  LayoutGrid,
  List,
  Mail,
  Plus,
  ShieldCheck,
  Sparkles,
  Gift,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { products, categories, faqs, type Product } from "@/lib/catalog";
import { pages, routeFor } from "@/lib/routes";
import { useShopping } from "./shopping-provider";

function Picture({ name, alt }: { name: string; alt: string }) {
  return (
    <Image
      src={`/images/eclat/${name}.webp`}
      alt={alt}
      fill
      sizes="(max-width: 600px) 100vw, 50vw"
      quality={95}
    />
  );
}
const contactSchema = z.object({
  name: z.string().min(2, "Indiquez votre nom."),
  email: z.email("Indiquez une adresse e-mail valide."),
  message: z
    .string()
    .min(10, "Votre message doit contenir au moins 10 caractères."),
});
function ContactForm() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });
  return (
    <form
      className="contact-form"
      onSubmit={form.handleSubmit((values) => {
        window.location.assign(
          `mailto:contact@eclatjoaillerie.fr?subject=${encodeURIComponent(`Demande de ${values.name}`)}&body=${encodeURIComponent(`${values.message}\n\n${values.name}\n${values.email}`)}`,
        );
      })}
    >
      <h2>Écrivez-nous</h2>
      <p>Nous prendrons le temps de vous conseiller.</p>
      <Label htmlFor="contact-name">Votre nom</Label>
      <Input
        id="contact-name"
        autoComplete="name"
        {...form.register("name")}
        aria-invalid={!!form.formState.errors.name}
      />
      {form.formState.errors.name && (
        <p className="field-error" role="alert">
          {form.formState.errors.name.message}
        </p>
      )}
      <Label htmlFor="contact-email">Votre adresse e-mail</Label>
      <Input
        id="contact-email"
        type="email"
        autoComplete="email"
        {...form.register("email")}
        aria-invalid={!!form.formState.errors.email}
      />
      {form.formState.errors.email && (
        <p className="field-error" role="alert">
          {form.formState.errors.email.message}
        </p>
      )}
      <Label htmlFor="contact-message">Votre message</Label>
      <Textarea
        id="contact-message"
        rows={5}
        {...form.register("message")}
        aria-invalid={!!form.formState.errors.message}
      />
      {form.formState.errors.message && (
        <p className="field-error" role="alert">
          {form.formState.errors.message.message}
        </p>
      )}
      <Button type="submit" className="gold-button">
        Préparer mon e-mail <ArrowRight aria-hidden="true" />
      </Button>
      <small>
        Votre messagerie s’ouvrira avec votre message prêt à envoyer.
      </small>
    </form>
  );
}
const serviceTexts: Record<string, { title: string; text: string }[]> = {
  "livraison-retours": [
    {
      title: "Un écrin préparé avec soin",
      text: "Votre création vous est présentée dans son écrin signature et accompagnée de son certificat d’authenticité. La livraison est offerte dès 150 € d’achat.",
    },
    {
      title: "Suivre votre commande",
      text: "Notre conciergerie vous renseigne sur la préparation de votre création et les modalités de sa livraison. Pour connaître le délai de votre sélection, contactez la Maison.",
    },
    {
      title: "Retours et échanges",
      text: "Contactez notre équipe avant de nous retourner un bijou. Nous vous accompagnerons dans les démarches et vous préciserons les conditions applicables à votre création.",
    },
  ],
  entretien: [
    {
      title: "Les gestes du quotidien",
      text: "Retirez vos bijoux avant une activité sportive, la baignade ou l’utilisation de produits ménagers. Évitez le contact direct avec les parfums et les cosmétiques.",
    },
    {
      title: "Une attention délicate",
      text: "Essuyez délicatement votre création avec un chiffon doux. Pour un nettoyage adapté à sa pierre et à son sertissage, demandez conseil à notre Maison.",
    },
    {
      title: "Le repos des créations",
      text: "Rangez chaque bijou séparément dans son écrin pour éviter les frottements. Faites contrôler régulièrement son sertissage par un professionnel.",
    },
  ],
  authenticite: [
    {
      title: "La signature de votre création",
      text: "Votre certificat accompagne votre bijou et précise les caractéristiques de sa matière et de ses pierres. Conservez-le avec votre écrin.",
    },
    {
      title: "Un accompagnement dans le temps",
      text: "Une question concernant les caractéristiques de votre bijou ou son certificat ? Notre Maison vous accompagne à partir des références de votre création.",
    },
  ],
  presse: [
    {
      title: "Demandes éditoriales",
      text: "Journalistes, stylistes et créateurs de contenus : contactez la Maison en précisant votre publication, votre projet et les créations qui vous intéressent.",
    },
    {
      title: "L’univers Éclat",
      text: "Découvrez nos collections, nos inspirations et le savoir-faire de l’atelier. Notre équipe vous accompagne pour présenter la Maison et ses créations.",
    },
  ],
  "conditions-generales": [
    {
      title: "Votre sélection",
      text: "Les prix des créations sont affichés en euros. Notre Maison vous accompagne pour confirmer les disponibilités, la taille et les caractéristiques de votre bijou avant toute commande.",
    },
    {
      title: "Un accompagnement personnel",
      text: "Pour recevoir les conditions de vente applicables à votre commande, notamment les modalités de règlement, de livraison et de retour, contactez notre conciergerie avant de finaliser votre sélection.",
    },
  ],
  confidentialite: [
    {
      title: "Vos échanges avec la Maison",
      text: "Lorsque vous nous contactez par e-mail, les informations que vous choisissez de partager nous permettent de répondre à votre demande. Évitez de communiquer des données sensibles par messagerie.",
    },
    {
      title: "Vos questions et vos droits",
      text: "Pour toute demande concernant vos informations personnelles, leur consultation ou leur suppression, contactez la Maison en précisant l’objet de votre demande.",
    },
  ],
  "mentions-legales": [
    {
      title: "Éclat Joaillerie",
      text: "Ce site présente l’univers de la Maison et ses créations. Pour toute question concernant le contenu du site, les visuels ou une demande de contact, écrivez à notre équipe.",
    },
    {
      title: "Informations et disponibilité",
      text: "Notre conciergerie vous confirme les caractéristiques, la disponibilité et les informations relatives à chaque création avant votre commande.",
    },
  ],
};
export function InnerPage({
  slug,
  renderProduct,
}: {
  slug: string;
  renderProduct: (product: Product) => ReactNode;
}) {
  const definition = pages[slug];
  const [display, setDisplay] = useState("classic");
  const [sort, setSort] = useState("selection");
  const [category, setCategory] = useState("Toutes");
  const [analytics, setAnalytics] = useState(false);
  const motionPreference = useReducedMotion();
  const { ready } = useShopping();
  const reducedMotion = ready && motionPreference;
  if (!definition) return null;
  const isCatalog = definition.kind === "catalog";
  let selection = products.filter(
    (product) =>
      (!definition.category || product.category === definition.category) &&
      (slug !== "nouveautes" || product.isNew) &&
      (category === "Toutes" || product.category === category),
  );
  if (sort === "ascending")
    selection = [...selection].sort((a, b) => a.price - b.price);
  if (sort === "descending")
    selection = [...selection].sort((a, b) => b.price - a.price);
  const editorialParagraphs =
    slug === "savoir-faire"
      ? [
          "Tout commence par une intention et un dessin. Les proportions se précisent, la lumière se cherche et la matière prend forme entre les mains de l’artisan.",
          "Le sertissage révèle la pierre sans jamais lui voler la lumière. Le poli, la finesse d’une attache, l’équilibre d’une ligne : autant de détails qui donnent à chaque création son caractère.",
        ]
      : slug === "engagements"
        ? [
            "Nous aimons les bijoux que l’on porte longtemps, ceux qui accompagnent les jours heureux et se transmettent avec une histoire. Notre exigence se porte sur la qualité des matières et la justesse des finitions.",
            "Notre conciergerie vous aide à choisir votre création, à en prendre soin et à préserver son éclat. Une relation attentive, au-delà du premier regard.",
          ]
        : slug === "pierres-et-materiaux"
          ? [
              "Chaque pierre possède une personnalité : une nuance, un feu, une façon de capter la lumière. Nous cherchons l’équilibre entre son éclat et la délicatesse du dessin.",
              "L’or dessine des lignes chaleureuses et accompagne la lumière des diamants. Le certificat de votre création vous renseigne sur ses caractéristiques précises.",
            ]
          : [
              "Chez Éclat Joaillerie, nous croyons au pouvoir des détails. Une pierre choisie, un dessin délicat, un geste précis : la beauté naît de cette rencontre entre matière et émotion.",
              "Nos créations accompagnent les moments que l’on souhaite garder. Une promesse, une célébration, une attention à soi. Des bijoux pensés pour devenir une part de votre histoire.",
            ];
  return (
    <div className={`inner-page inner-${definition.kind}`}>
      <nav className="breadcrumbs" aria-label="Fil d’Ariane">
        <Link href="/">Accueil</Link>
        <span>/</span>
        <span aria-current="page">{definition.title}</span>
      </nav>
      <section className={`inner-hero ${isCatalog ? "catalog-hero" : ""}`}>
        <motion.div
          className="inner-hero-copy"
          initial={{
            opacity: reducedMotion ? 1 : 0,
            y: reducedMotion ? 0 : 15,
          }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <span className="inner-eyebrow">{definition.eyebrow}</span>
          <h1>{definition.title}</h1>
          <span className="gold-rule" />
          <p>{definition.description}</p>
        </motion.div>
        <div className="inner-hero-photo">
          <Picture name={definition.image} alt={definition.title} />
          <span className="image-corner" />
        </div>
      </section>
      {isCatalog && (
        <section
          className="catalog-section"
          aria-label={`Catalogue ${definition.title}`}
        >
          <div className="catalog-toolbar">
            <span>
              {selection.length} créations{" "}
              <SlidersHorizontal aria-hidden="true" />
            </span>
            <div className="catalog-controls">
              {!definition.category && (
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value ?? "Toutes")}
                >
                  <SelectTrigger aria-label="Filtrer par catégorie">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Toutes",
                      "Bagues",
                      "Colliers",
                      "Boucles d’oreilles",
                      "Bracelets",
                    ].map((name) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Select
                value={sort}
                items={[
                  { value: "selection", label: "Notre sélection" },
                  { value: "ascending", label: "Prix croissant" },
                  { value: "descending", label: "Prix décroissant" },
                ]}
                onValueChange={(value) => setSort(value ?? "selection")}
              >
                <SelectTrigger aria-label="Trier les créations">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="selection">Notre sélection</SelectItem>
                  <SelectItem value="ascending">Prix croissant</SelectItem>
                  <SelectItem value="descending">Prix décroissant</SelectItem>
                </SelectContent>
              </Select>
              <div
                className="display-options"
                aria-label="Affichage du catalogue"
              >
                {[
                  {
                    value: "classic",
                    label: "Grille classique",
                    icon: LayoutGrid,
                  },
                  { value: "airy", label: "Grille aérée", icon: Grid2X2 },
                  { value: "list", label: "Liste détaillée", icon: List },
                ].map(({ value, label, icon: Icon }) => (
                  <Button
                    key={value}
                    variant="ghost"
                    size="icon"
                    aria-label={label}
                    aria-pressed={display === value}
                    onClick={() => setDisplay(value)}
                  >
                    <Icon />
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className={`catalog-products display-${display}`}>
            {selection.map((product) => renderProduct(product))}
          </div>
          {selection.length === 0 && (
            <div className="catalog-empty">
              <Gem />
              <p>Aucune création dans cette sélection.</p>
              <Button variant="link" onClick={() => setCategory("Toutes")}>
                Voir toutes les créations
              </Button>
            </div>
          )}
          <div className="catalog-note">
            <Gem />
            <p>
              Chaque création est accompagnée de son écrin signature
              <br />
              et de son certificat d’authenticité.
            </p>
          </div>
        </section>
      )}
      {definition.kind === "collections" && (
        <section className="collection-stories">
          <Link href="/lumiere-eternelle" className="collection-feature">
            <div className="story-image">
              <Picture name="seasonal" alt="Collection Lumière Éternelle" />
            </div>
            <div>
              <span className="inner-eyebrow">Collection signature</span>
              <h2>Lumière Éternelle</h2>
              <p>Une ode à la lumière, une invitation à célébrer l’instant.</p>
              <span className="text-link">
                Explorer la collection <ArrowRight />
              </span>
            </div>
          </Link>
          <div className="collection-category-grid">
            {categories
              .filter((item) => item.name !== "Collections")
              .map((item) => (
                <Link key={item.name} href={routeFor(item.name)}>
                  <div className="story-image">
                    <Picture name={item.image} alt={item.name} />
                  </div>
                  <div className="story-caption">
                    <h2>{item.name}</h2>
                    <ArrowRight />
                  </div>
                  <p>{item.description}</p>
                </Link>
              ))}
          </div>
        </section>
      )}
      {definition.kind === "gifts" && (
        <section className="occasion-stories">
          {[
            {
              name: "Fiançailles",
              image: "ring-solitaire",
              subtitle: "Le début d’un toujours",
            },
            {
              name: "Mariage",
              image: "category-collections",
              subtitle: "Une promesse à porter",
            },
            {
              name: "Anniversaire",
              image: "bracelet-river",
              subtitle: "Célébrer un instant unique",
            },
            {
              name: "Déclaration",
              image: "necklace-flower",
              subtitle: "Laisser parler le cœur",
            },
          ].map((occasion, index) => (
            <Link
              className={`occasion-story occasion-${index}`}
              key={occasion.name}
              href={routeFor(occasion.name)}
            >
              <div className="story-image">
                <Picture name={occasion.image} alt={occasion.name} />
              </div>
              <div>
                <span className="inner-eyebrow">{occasion.subtitle}</span>
                <h2>{occasion.name}</h2>
                <span className="text-link">
                  Trouver le cadeau parfait <ArrowRight />
                </span>
              </div>
            </Link>
          ))}
          <aside className="gift-signature">
            <Gift />
            <h2>L’art du détail</h2>
            <p>
              Un écrin signature, une création précieuse,
              <br />
              une émotion à offrir.
            </p>
            <Button
              className="gold-button"
              nativeButton={false}
              role="link"
              render={<Link href="/contact" />}
            >
              Être accompagné <ArrowRight />
            </Button>
          </aside>
        </section>
      )}
      {definition.kind === "editorial" && (
        <>
          <section className="editorial-story">
            <div className="editorial-quote">
              <span>“</span>
              <blockquote>
                La beauté d’un bijou
                <br />
                se mesure à l’émotion
                <br />
                <em>qu’il fait naître.</em>
              </blockquote>
              <span className="inner-eyebrow">L’esprit Éclat</span>
            </div>
            <div className="editorial-prose">
              <span className="inner-eyebrow">
                Un savoir-faire, une signature
              </span>
              <h2>L’exception, dans chaque détail.</h2>
              {editorialParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <Button
                className="outline-cta light-cta"
                nativeButton={false}
                role="link"
                render={<Link href="/collections" />}
              >
                Découvrir les créations <ArrowRight />
              </Button>
            </div>
          </section>
          <section className="editorial-values">
            {[
              {
                icon: Gem,
                title: "La beauté des matières",
                text: "Des pierres lumineuses, des lignes d’or délicates.",
              },
              {
                icon: Sparkles,
                title: "La précision du geste",
                text: "Une attention particulière, jusqu’au dernier détail.",
              },
              {
                icon: ShieldCheck,
                title: "Une relation de confiance",
                text: "Un accompagnement personnel, au fil du temps.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </section>
          <div className="editorial-navigation">
            <Link href="/notre-histoire">
              Notre histoire <ArrowRight />
            </Link>
            <Link href="/savoir-faire">
              Notre savoir-faire <ArrowRight />
            </Link>
            <Link href="/engagements">
              Nos engagements <ArrowRight />
            </Link>
          </div>
        </>
      )}
      {definition.kind === "inspiration" && (
        <section className="journal-grid">
          {[
            "La lumière en mouvement",
            "Les liens précieux",
            "L’élégance au quotidien",
            "Un éclat à votre poignet",
            "L’art de la délicatesse",
            "Les instants qui restent",
            "Paris, notre inspiration",
          ].map((title, index) => (
            <article key={title}>
              <div className="story-image">
                <Picture name={`inspiration-${index + 1}`} alt={title} />
              </div>
              <span className="inner-eyebrow">
                {index % 2 === 0 ? "Carnet d’inspiration" : "Les détails Éclat"}
              </span>
              <h2>{title}</h2>
              <p>
                Une nouvelle façon de regarder la beauté, au plus près de nos
                créations.
              </p>
              <Link
                className="text-link"
                href={
                  index === 6
                    ? "/notre-histoire"
                    : routeFor(categories[index % 4].name)
                }
              >
                Découvrir <ArrowRight />
              </Link>
            </article>
          ))}
        </section>
      )}
      {definition.kind === "faq" && (
        <section className="inner-faq">
          <Accordion>
            {[
              ...faqs,
              [
                "Comment prendre soin de mes bijoux ?",
                "Conservez vos créations séparément dans leur écrin et évitez les produits chimiques. Découvrez tous nos conseils sur la page Entretien de vos bijoux.",
              ],
              [
                "Comment contacter la Maison ?",
                "Écrivez à contact@eclatjoaillerie.fr. Notre conciergerie vous accompagne pour vos créations, vos commandes et vos demandes de conseil.",
              ],
            ].map(([question, answer], index) => (
              <AccordionItem key={question} value={index}>
                <AccordionTrigger>
                  {question}
                  <Plus aria-hidden="true" />
                </AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <aside>
            <Mail />
            <h2>Une autre question ?</h2>
            <p>Notre Maison est à votre écoute.</p>
            <Button
              className="gold-button"
              nativeButton={false}
              role="link"
              render={<Link href="/contact" />}
            >
              Contactez-nous <ArrowRight />
            </Button>
          </aside>
        </section>
      )}
      {(definition.kind === "contact" || definition.kind === "account") && (
        <section className="contact-layout">
          <aside>
            <Gem />
            <span className="inner-eyebrow">La conciergerie Éclat</span>
            <h2>Le plaisir de vous accompagner.</h2>
            <p>
              Un conseil pour choisir votre bijou, une question sur votre
              commande ou une attention particulière : prenons le temps d’en
              parler.
            </p>
            <a
              className="contact-email"
              href="mailto:contact@eclatjoaillerie.fr"
            >
              contact@eclatjoaillerie.fr
            </a>
            <Link className="text-link" href="/faq">
              Consulter les questions fréquentes <ArrowRight />
            </Link>
          </aside>
          <ContactForm />
        </section>
      )}
      {definition.kind === "service" && (
        <section className="service-layout">
          <aside>
            <span className="inner-eyebrow">Aide & Services</span>
            {[
              "FAQ",
              "Livraison & retours",
              "Entretien de vos bijoux",
              "Certificat d’authenticité",
              "Contact",
            ].map((name) => (
              <Link
                key={name}
                href={routeFor(name)}
                className={routeFor(name) === `/${slug}` ? "active" : ""}
              >
                {name}
                <ArrowRight />
              </Link>
            ))}
          </aside>
          <div className="service-articles">
            {(serviceTexts[slug] ?? []).map((item) => (
              <article key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </article>
            ))}
            <div className="service-contact">
              <Mail />
              <div>
                <h3>Une attention personnelle</h3>
                <p>Notre équipe est à votre écoute.</p>
                <Link href="/contact">
                  Contacter la Maison <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
      {definition.kind === "cookies" && (
        <section className="cookie-settings">
          <article>
            <div>
              <h2>Cookies essentiels</h2>
              <p>
                Indispensables à la navigation et au fonctionnement du site.
              </p>
            </div>
            <Switch
              checked
              disabled
              aria-label="Cookies essentiels toujours activés"
            />
          </article>
          <article>
            <div>
              <h2>Préférence de mesure d’audience</h2>
              <p>
                Enregistrez votre choix concernant la mesure d’audience
                facultative.
              </p>
            </div>
            <Switch
              checked={analytics}
              onCheckedChange={setAnalytics}
              aria-label="Autoriser la mesure d’audience"
            />
          </article>
          <Button
            className="gold-button"
            onClick={() => {
              localStorage.setItem(
                "eclat-cookie-preferences",
                JSON.stringify({ analytics, essential: true }),
              );
              toast.success("Vos préférences ont été enregistrées.");
            }}
          >
            Enregistrer mes préférences <ArrowRight />
          </Button>
          <p className="cookie-footnote">
            Aucun outil de mesure d’audience facultatif n’est actuellement
            activé sur ce site.
          </p>
        </section>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Storefront from "@/components/storefront/storefront";
import { pages } from "@/lib/routes";
import { Skeleton } from "@/components/ui/skeleton";

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  return {
    title: page
      ? `${page.title} — Éclat Joaillerie`
      : "Page introuvable — Éclat Joaillerie",
    description: page?.description,
  };
}
async function ResolvedBoutiquePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!Object.hasOwn(pages, slug)) notFound();
  return <Storefront pageSlug={slug} />;
}

export default function BoutiquePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen bg-[#f7f1eb] p-8"
          role="status"
          aria-label="Chargement de la page"
        >
          <Skeleton className="mb-8 h-12 w-full" />
          <Skeleton className="mb-8 h-80 w-full" />
          <div className="grid grid-cols-2 gap-6">
            <Skeleton className="h-60" />
            <Skeleton className="h-60" />
          </div>
          <span className="sr-only">Chargement de votre univers Éclat…</span>
        </div>
      }
    >
      <ResolvedBoutiquePage params={params} />
    </Suspense>
  );
}

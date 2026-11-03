import { expect, test } from "@playwright/test";
import { pages } from "../src/lib/routes";

test("every destination supports a direct visit with its own metadata", async ({
  request,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  test.setTimeout(180_000);
  const entries = Object.entries(pages);
  for (let index = 0; index < entries.length; index += 4) {
    await Promise.all(
      entries.slice(index, index + 4).map(async ([slug, definition]) => {
        const response = await request.get(`/${slug}`);
        expect(response.status(), slug).toBe(200);
        expect((await response.text()).replaceAll("&amp;", "&")).toContain(
          `${definition.title} — Éclat Joaillerie`,
        );
      }),
    );
  }
  const missing = await request.get("/une-page-inconnue");
  // Once Suspense has streamed the shell, Next.js signals notFound in the
  // response body and noindex metadata rather than changing the HTTP status.
  expect([200, 404]).toContain(missing.status());
  expect(await missing.text()).toContain('name="robots" content="noindex"');
});

test("menus navigate to real pages and shopping selections survive navigation", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await page
    .getByRole("button", {
      name: "Ajouter Bague Éternité aux favoris",
      exact: true,
    })
    .click();
  await expect(
    page.getByRole("button", {
      name: "Retirer Bague Éternité des favoris",
      exact: true,
    }),
  ).toBeVisible();
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Ouvrir le menu" }).click();
    await page
      .getByRole("dialog")
      .getByRole("link", { name: "Bagues", exact: true })
      .click();
  } else {
    await page
      .getByRole("navigation", { name: "Navigation principale" })
      .getByRole("link", { name: "Bagues", exact: true })
      .click();
  }
  await expect(page).toHaveURL(/\/bagues$/, { timeout: 20_000 });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Bagues");
  await expect(page.locator(".catalog-products .product-card")).toHaveCount(3);
  await page.getByRole("button", { name: "Mes favoris", exact: true }).click();
  await expect(page.locator(".bag-item")).toContainText("Bague Éternité");
  await page.keyboard.press("Escape");
  await page
    .locator("footer")
    .getByRole("link", { name: "Savoir-faire", exact: true })
    .click();
  await expect(page).toHaveURL(/\/savoir-faire$/);
  await expect(page.locator(".editorial-story")).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/bagues$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/savoir-faire$/);
});

test("catalog display choices, filters, and price sorting work", async ({
  page,
}) => {
  await page.goto("/nouveautes");
  await expect(page.locator(".catalog-products .product-card")).toHaveCount(4);
  await page.getByRole("button", { name: "Grille aérée" }).click();
  await expect(page.locator(".catalog-products")).toHaveClass(/display-airy/);
  await page.getByRole("button", { name: "Liste détaillée" }).click();
  await expect(page.locator(".catalog-products")).toHaveClass(/display-list/);
  await page.getByRole("combobox", { name: "Trier les créations" }).click();
  await page.getByRole("option", { name: "Prix croissant" }).click();
  await expect(
    page.locator(".catalog-products .product-name").first(),
  ).toHaveText("Boucles Goutte Royale");
  await page.getByRole("combobox", { name: "Filtrer par catégorie" }).click();
  await page.getByRole("option", { name: "Colliers", exact: true }).click();
  await expect(page.locator(".catalog-products .product-card")).toHaveCount(1);
  await expect(page.locator(".catalog-products")).toContainText(
    "Collier Trèfle de Lumière",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("destination page layouts remain responsive and render without client errors", async ({
  page,
}, testInfo) => {
  test.setTimeout(150_000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const slug of [
    "collections",
    "bagues",
    "idees-cadeaux",
    "savoir-faire",
    "inspiration",
    "faq",
    "contact",
    "livraison-retours",
    "cookies",
  ]) {
    await page.goto(`/${slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      pages[slug].title,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      slug,
    ).toBe(true);
    if (["collections", "bagues", "savoir-faire"].includes(slug)) {
      await expect(page.locator(".inner-hero-copy")).toHaveCSS("opacity", "1");
      await page.screenshot({
        path: `artifacts/${testInfo.project.name}-${slug}.png`,
        fullPage: true,
      });
    }
  }
  expect(errors).toEqual([]);
});

test("two-slide carousel changes automatically, pauses, and respects reduced motion", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/");
  await expect(page.locator(".hero .slide-dots button")).toHaveCount(2);
  await expect(
    page.getByRole("button", { name: "Afficher la diapositive 1" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.clock.runFor(12_500);
  await expect(
    page.getByRole("button", { name: "Afficher la diapositive 2" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.locator('.hero .hero-photo img[alt*="pierre naturelle"]'),
  ).toHaveCount(1);
  await page
    .getByRole("button", { name: "Mettre le défilement en pause" })
    .click();
  await page.clock.runFor(22_000);
  await expect(
    page.getByRole("button", { name: "Afficher la diapositive 2" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await page.clock.runFor(22_000);
  await expect(
    page.getByRole("button", { name: "Afficher la diapositive 1" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Afficher la diapositive 2" }).click();
  await expect(
    page.getByRole("button", { name: "Afficher la diapositive 2" }),
  ).toHaveAttribute("aria-pressed", "true");
});

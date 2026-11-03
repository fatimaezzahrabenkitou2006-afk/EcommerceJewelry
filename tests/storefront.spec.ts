import { expect, test } from "@playwright/test";

test("reference sections, local photographs, and responsive layout", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "La joaillerie qui",
  );
  await expect(page.locator("main > section")).toHaveCount(12);
  for (
    let y = 0;
    y < (await page.locator("body").evaluate((body) => body.scrollHeight));
    y += 600
  ) {
    await page.evaluate((offset) => window.scrollTo(0, offset), y);
    await page.waitForTimeout(80);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect
    .poll(() =>
      page
        .locator("main img")
        .evaluateAll((images) =>
          images
            .filter((image) => image.getClientRects().length > 0)
            .every(
              (image) =>
                (image as HTMLImageElement).complete &&
                (image as HTMLImageElement).naturalWidth > 0,
            ),
        ),
    )
    .toBe(true);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  if (testInfo.project.name === "reference") {
    expect(
      await page
        .locator(".hero")
        .evaluate((element) =>
          Math.round(element.getBoundingClientRect().height),
        ),
    ).toBe(222);
    expect(
      await page
        .locator("body")
        .evaluate((element) => Math.round(element.scrollHeight)),
    ).toBe(1860);
  }
  await page.screenshot({
    path: `artifacts/${testInfo.project.name}.png`,
    fullPage: true,
  });
  expect(errors).toEqual([]);
});

test("search, product preview, favorites, and shopping bag", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Rechercher", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Rechercher un bijou" })
    .fill("solitaire");
  await expect(page.locator("[role='dialog'] .product-card")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Bague Solitaire Classique 3" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Bague Solitaire Classique" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Ajouter au panier", exact: true })
    .click();
  await page.getByRole("button", { name: "Mon panier", exact: true }).click();
  await expect(page.locator(".bag-item")).toContainText(
    "Bague Solitaire Classique",
  );
  await page.getByRole("button", { name: "Retirer", exact: true }).click();
  await expect(page.locator(".empty-message")).toContainText(
    "Votre panier attend",
  );
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", {
      name: "Ajouter Bague Éternité aux favoris",
      exact: true,
    })
    .click();
  await page.getByRole("button", { name: "Mes favoris", exact: true }).click();
  await expect(page.locator(".bag-item")).toContainText("Bague Éternité");
});

test("FAQ, newsletter validation, and hero navigation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Afficher la diapositive 2" }).click();
  await expect(
    page.getByRole("heading", { level: 1, name: /Lumière/ }),
  ).toContainText("Lumière");
  const question = page.getByRole("button", {
    name: "Quels sont les délais de livraison ?",
  });
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator(".faq-list")).toContainText("3 à 5 jours ouvrés");
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "false");
  await page
    .getByRole("textbox", { name: "Votre adresse e-mail", exact: true })
    .fill("client@example.com");
  await page.getByRole("button", { name: "S’inscrire", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Inscrit", exact: true }),
  ).toBeVisible();
});

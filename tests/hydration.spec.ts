import { expect, test } from "@playwright/test";

test("dynamic pages and reduced-motion preferences hydrate without errors", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of ["/", "/bagues", "/savoir-faire"]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Rechercher", exact: true }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Rechercher", exact: true }).click();
    await expect(
      page.getByRole("textbox", { name: "Rechercher un bijou" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
  }
  await page.goto("/une-page-inconnue");
  await expect(page.getByRole("heading", { name: "404", exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

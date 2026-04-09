import { test, expect } from "@playwright/test";

const ACTION =
  "E2E: closed ticket #99999 and sent the required confirmation email.";
const GUIDELINE =
  "E2E: all closed tickets must include a confirmation email to the requester.";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());

  await page.route("**/api/analyze", async (route) => {
    if (route.request().method() !== "POST") {
      await route.continue();
      return;
    }
    const body = route.request().postDataJSON() as {
      action: string;
      guideline: string;
    };
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        id: "e2e-analysis-record",
        action: body.action,
        guideline: body.guideline,
        result: "COMPLIES",
        confidence: 0.92,
        timestamp: "2026-04-09T12:00:00.000Z",
      }),
    });
  });
});

test("analyze flow adds the result to the history list", async ({ page }) => {
  await page.goto("/");

  await page.locator("#action").fill(ACTION);
  await page.locator("#guideline").fill(GUIDELINE);
  await expect(
    page.getByRole("button", { name: "Analyze Compliance" }),
  ).toBeEnabled();
  await page.getByRole("button", { name: "Analyze Compliance" }).click();

  const historySection = page.getByRole("region", { name: "Analysis history" });
  await expect(historySection.getByText("History", { exact: true })).toBeVisible();

  await expect(historySection).toContainText(ACTION);
  await expect(historySection).toContainText(GUIDELINE);
  await expect(historySection.getByText("COMPLIES")).toBeVisible();
});

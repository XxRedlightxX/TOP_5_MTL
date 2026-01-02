import { test, expect } from '@playwright/test';



test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});



test('test input par ID', async ({ page, baseURL }) => {
  await page.goto('/Profile');
  await page.locator('#input-v-16').waitFor();
  // Méthode 1: Sélecteur CSS par ID
  await page.locator('#input-v-16').fill('example value');
  await page.locator('#input-v-18').waitFor();
  await page.locator('#input-v-18').fill('example value');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText('The email field must be a valid email address').first()).toContainClass('error');

  
  console.log('Testing on:', baseURL);
});

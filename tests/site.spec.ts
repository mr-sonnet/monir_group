import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const core = [
  '/',
  '/about/',
  '/sister-concerns/',
  '/monir-poultry-feed-industries-limited/',
  '/products/',
  '/contact/',
  '/privacy-policy/',
];
test('core pages render without overflow, broken images or console errors', async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  for (const route of core) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      /noindex/,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      ),
    ).toBe(true);
    for (const img of await page.locator('img:visible').all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
  }
  expect(errors).toEqual([]);
  await page.goto('/');
  await page.screenshot({
    path: `audit/home-${info.project.name}.png`,
    fullPage: true,
  });
});
test('catalog has 55 entries; search aliases, categories and empty state work', async ({
  page,
}) => {
  await page.goto('/products/');
  await expect(page.locator('[data-product]')).toHaveCount(55);
  for (const [query, name] of [
    ['maize', 'Maize'],
    ['fish meal', 'Fish Meal'],
    ['soya meal', 'Soybean Meal (High Protein)'],
    ['DCP', 'Dicalcium Phosphate (DCP)'],
  ]) {
    await page.getByLabel('Search products').fill(query);
    await expect(
      page
        .locator('[data-product]:visible')
        .filter({ has: page.getByRole('heading', { name, exact: true }) }),
    ).toBeVisible();
  }
  await page.getByLabel('Search products').fill('unlisted testing requirement');
  await expect(
    page.getByRole('heading', { name: 'No matching products.' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await page.getByLabel('Category', { exact: true }).selectOption('pulses');
  await expect(page.locator('[data-product]:visible')).toHaveCount(10);
  await page.reload();
  await expect(page.getByLabel('Category', { exact: true })).toHaveValue(
    'pulses',
  );
});
test('product quote carries selection and completes only as an explicit demo', async ({
  page,
}) => {
  await page.goto('/products/?q=DCP');
  await page.getByRole('link', { name: 'Ask about this product' }).click();
  await expect(page.getByLabel('Product', { exact: true })).toHaveValue(
    'Dicalcium Phosphate (DCP)',
  );
  await expect(page.locator('#selected-product')).toContainText(
    'Dicalcium Phosphate',
  );
  await page.getByRole('button', { name: 'Test inquiry' }).click();
  await expect(page.getByLabel('Contact name')).toHaveAttribute(
    'aria-invalid',
    'true',
  );
  await page.getByLabel('Contact name').fill('Test Buyer');
  await page.getByLabel('Email', { exact: true }).fill('buyer@example.com');
  await page.locator('#consent').check();
  await page.getByRole('button', { name: 'Test inquiry' }).click();
  await expect(page.locator('#form-status')).toContainText('has not been sent');
  await expect(page.locator('#inquiry-summary')).toContainText(
    'Dicalcium Phosphate (DCP)',
  );
  await expect(page.locator('#inquiry-summary')).toContainText(
    'buyer@example.com',
  );
});
test('phone-only general inquiry works; offline failure retains entries', async ({
  page,
  context,
}) => {
  await page.goto('/contact/?type=company');
  await expect(page.locator('#inquiryType')).toHaveValue('company');
  await page.getByLabel('Contact name').fill('Sample Buyer');
  await page.getByLabel('Phone', { exact: true }).fill('+8801711223344');
  await page
    .getByLabel('Requirements or specification')
    .fill('Question about a group concern');
  await page.locator('#consent').check();
  await context.setOffline(true);
  await page.getByRole('button', { name: 'Test inquiry' }).click();
  await expect(page.locator('#form-status')).toContainText('offline');
  await expect(page.getByLabel('Contact name')).toHaveValue('Sample Buyer');
  await context.setOffline(false);
  await page.getByRole('button', { name: 'Test inquiry' }).click();
  await expect(page.locator('#form-status')).toContainText('Demo complete');
});
test('invalid contact and missing product/message are blocked; honeypot rejects', async ({
  page,
}) => {
  await page.goto('/contact/');
  await page.getByLabel('Contact name').fill('Test');
  await page.getByLabel('Email', { exact: true }).fill('bad-address');
  await page.locator('#consent').check();
  await page.getByRole('button', { name: 'Test inquiry' }).click();
  await expect(page.locator('#email')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#product')).toHaveAttribute(
    'aria-invalid',
    'true',
  );
  await page.locator('#email').fill('test@example.com');
  await page.locator('#product').fill('<script>alert(1)</script>');
  await page.locator('#website').evaluate((el: HTMLInputElement) => {
    el.value = 'spam.example';
  });
  await page.getByRole('button', { name: 'Test inquiry' }).click();
  await expect(page.locator('#form-status')).toContainText(
    'could not be processed',
  );
});
test('keyboard navigation, mobile menu and WCAG automated checks', async ({
  page,
}, info) => {
  for (const route of ['/', '/products/', '/contact/']) {
    await page.goto(route);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  }
  if (info.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Menu' }).click();
    await expect(page.locator('#main-nav')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  } else {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('link', { name: 'Skip to content' }),
    ).toBeFocused();
  }
});
test('priority routes, legacy equivalents and missing pages', async ({
  page,
}) => {
  for (const slug of [
    'maize',
    'soybean-meal',
    'full-fat-soybean',
    'fish-meal',
    'rice-polish',
    'wheat',
    'ddgs',
    'corn-gluten-meal',
    'dicalcium-phosphate',
    'monocalcium-phosphate',
  ]) {
    const r = await page.goto(`/products/${slug}/`);
    expect(r?.status()).toBe(200);
    await expect(
      page.getByRole('link', { name: /Request a Quote for/ }),
    ).toBeVisible();
  }
  for (const [old, target] of [
    ['/about-2/', '/about/'],
    ['/contact-2/', '/contact/'],
    ['/about-us/', '/about/'],
    ['/contact-us/', '/contact/'],
  ]) {
    await page.goto(old);
    await expect(page).toHaveURL(new RegExp(target + '$'));
  }
  const missing = await page.goto('/not-a-page/');
  expect(missing?.status()).toBe(404);
  await expect(
    page.getByRole('heading', { name: /back on track/ }),
  ).toBeVisible();
});
test('tablet and enlarged text do not overflow', async ({ page }) => {
  await page.setViewportSize({ width: 820, height: 1180 });
  for (const route of core) {
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/contact/');
  await page.addStyleTag({ content: 'html {font-size:200%}' });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
});

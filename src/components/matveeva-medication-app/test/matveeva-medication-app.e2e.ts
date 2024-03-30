import { newE2EPage } from '@stencil/core/testing';

describe('matveeva-medication-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<matveeva-medication-app></matveeva-medication-app>');

    const element = await page.find('matveeva-medication-app');
    expect(element).toHaveClass('hydrated');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('matveeva-medication-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<matveeva-medication-list></matveeva-medication-list>');

    const element = await page.find('matveeva-medication-list');
    expect(element).toHaveClass('hydrated');
  });
});

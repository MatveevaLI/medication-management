import { newE2EPage } from '@stencil/core/testing';

describe('matveeva-medication-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<matveeva-medication-editor></matveeva-medication-editor>');

    const element = await page.find('matveeva-medication-editor');
    expect(element).toHaveClass('hydrated');
  });
});

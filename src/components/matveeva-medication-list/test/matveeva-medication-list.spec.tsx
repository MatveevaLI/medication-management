import { newSpecPage } from '@stencil/core/testing';
import { MatveevaMedicationList } from '../matveeva-medication-list';

describe('matveeva-medication-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MatveevaMedicationList],
      html: `<matveeva-medication-list></matveeva-medication-list>`,
    });
    expect(page.root).toEqualHtml(`
      <matveeva-medication-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </matveeva-medication-list>
    `);
  });
});

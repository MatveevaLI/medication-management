import { newSpecPage } from '@stencil/core/testing';
import { MatveevaMedicationEditor } from '../matveeva-medication-editor';

describe('matveeva-medication-editor', () => {
  it('buttons shall be of different type', async () => {
    const page = await newSpecPage({
      components: [MatveevaMedicationEditor],
      html: `<matveeva-medication-editor entry-id="@new"></matveeva-medication-editor>`,
    });
    let items: any = await page.root.shadowRoot.querySelectorAll("md-filled-button");
    expect(items.length).toEqual(1);
    items = await page.root.shadowRoot.querySelectorAll("md-outlined-button");
    expect(items.length).toEqual(1);
    
    items = await page.root.shadowRoot.querySelectorAll("md-filled-tonal-button");
    expect(items.length).toEqual(1);
  });
});

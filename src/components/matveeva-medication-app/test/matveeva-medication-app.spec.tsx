import { newSpecPage } from '@stencil/core/testing';
import { MatveevaMedicationApp } from '../matveeva-medication-app';

describe('matveeva-medication-app', () => {

  it('renders editor', async () => {
    const page = await newSpecPage({
      url: `http://localhost/entry/@new`,
      components: [MatveevaMedicationApp],
      html: `<matveeva-medication-app base-path="/"></matveeva-medication-app>`,
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual ("matveeva-medication-editor");

  });

  it('renders list', async () => {
    const page = await newSpecPage({
      url: `http://localhost/medication/`,
      components: [MatveevaMedicationApp],
      html: `<matveeva-medication-app base-path="/medication/"></matveeva-medication-app>`,
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual ("matveeva-medication-list");
  });
});

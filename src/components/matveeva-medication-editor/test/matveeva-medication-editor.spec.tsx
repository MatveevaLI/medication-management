import { newSpecPage } from '@stencil/core/testing';
import { MatveevaMedicationEditor } from '../matveeva-medication-editor';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MedicationListEntry } from '../../../api/medication';

describe('matveeva-medication-editor', () => {

  const sampleEntry: MedicationListEntry = {
    id: "med12345",
    dosage: "500mg",
    name: "Paracetamol",
    frequencyPerDay: 3,
    expirationDate: "2024-05-01"
  };

  let delay = async (miliseconds: number) => await new Promise<void>(resolve => {
    setTimeout(() => resolve(), miliseconds);
  })

  let mock: MockAdapter;

  beforeAll(() => { mock = new MockAdapter(axios); });
  afterEach(() => { mock.reset(); });

  it('buttons shall be of different type', async () => {

    mock.onGet(/^.*\/entries\/.+/).reply(200, sampleEntry);

    const page = await newSpecPage({
      components: [MatveevaMedicationEditor],
      html: `<matveeva-medication-editor entry-id="test-entry" ambulance-id="test-ambulance" api-base="http://sample.test/api"></matveeva-medication-editor>`,
    });
    await delay(300);
    await page.waitForChanges();

    let items: any = await page.root.shadowRoot.querySelectorAll("md-filled-button");
    expect(items.length).toEqual(1);
    
    items = await page.root.shadowRoot.querySelectorAll("md-outlined-button");
    expect(items.length).toEqual(1);

    items = await page.root.shadowRoot.querySelectorAll("md-filled-tonal-button");
    expect(items.length).toEqual(1);
  });

  it('first text field is medication name', async () => {
    mock.onGet(/^.*\/entries\/.+/).reply(200, sampleEntry);

    const page = await newSpecPage({
       components: [MatveevaMedicationEditor],
       html: `<matveeva-medication-editor entry-id="test-entry" ambulance-id="test-ambulance" api-base="http://sample.test/api"></matveeva-medication-editor>`,
    });
    let items: any = await page.root.shadowRoot.querySelectorAll("md-filled-text-field");

    await delay(300);
    await page.waitForChanges();

    expect(items.length).toBeGreaterThanOrEqual(1);
    expect(items[0].getAttribute("value")).toEqual(sampleEntry.name);
 });
});

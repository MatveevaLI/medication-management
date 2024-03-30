import { newSpecPage } from '@stencil/core/testing';
import { MatveevaMedicationList } from '../matveeva-medication-list';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MedicationListEntry } from '../../../api/medication';

describe('matveeva-medication-list', () => {
  const sampleEntries: MedicationListEntry[] = [
    {
      id: "med12345",
      name: "Paracetamol",
      dosage: "500mg",
      frequencyPerDay: 3,
      expirationDate: "2024-05-01"
    }, {
      id: "med67890",
      name: "Ibuprofen",
      dosage: "200mg",
      frequencyPerDay: 4,
      expirationDate: "2025-08-15"
    }];

  let mock: MockAdapter;

  beforeAll(() => { mock = new MockAdapter(axios); });
  afterEach(() => { mock.reset(); });

  it('renders sample entries', async () => {
    // simulate API response using sampleEntries
    mock.onGet().reply(200, sampleEntries);

    // set proper attributes

    const page = await newSpecPage({
      components: [MatveevaMedicationList],
      html: `<matveeva-medication-list ambulance-id="test-ambulance" api-base="http://test/api"></matveeva-medication-list>`,
    });
    
    const medicationList = page.rootInstance as MatveevaMedicationList;
    const expectedMedications = medicationList?.medications?.length;

    const items = page.root.shadowRoot.querySelectorAll("md-list-item");
    // use sample entries as expectation
    expect(expectedMedications).toEqual(sampleEntries.length);
    expect(items.length).toEqual(expectedMedications);
  });

  it('renders error message on network issues', async () => {
    mock.onGet().networkError();
    const page = await newSpecPage({
      components: [MatveevaMedicationList],  //
      html: `<matveeva-medication-list ambulance-id="test-ambulance" api-base="http://test/api"></matveeva-medication-list>`,  //
    });

    const medicationList = page.rootInstance as MatveevaMedicationList; //
    const expectedMedications = medicationList?.medications?.length

    const errorMessage =  page.root.shadowRoot.querySelectorAll(".error");
    const items = page.root.shadowRoot.querySelectorAll("md-list-item");

    expect(errorMessage.length).toBeGreaterThanOrEqual(1)
    expect(expectedMedications).toEqual(0);
    expect(items.length).toEqual(expectedMedications);
  });
});

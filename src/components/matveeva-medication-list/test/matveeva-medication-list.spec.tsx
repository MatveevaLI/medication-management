import { newSpecPage } from '@stencil/core/testing';
import { MatveevaMedicationList } from '../matveeva-medication-list';

describe('matveeva-medication-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MatveevaMedicationList],
      html: `<matveeva-medication-list></matveeva-medication-list>`,
    });
    const medicationList = page.rootInstance as MatveevaMedicationList;
    // await medicationList.componentWillLoad(); // Make sure the component loads data
    const expectedMedications = medicationList?.medications?.length;

    const items = page.root.shadowRoot.querySelectorAll("md-list-item");
    expect(items.length).toEqual(expectedMedications);
  });
});

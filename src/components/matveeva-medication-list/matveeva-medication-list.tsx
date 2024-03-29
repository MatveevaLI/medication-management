import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'matveeva-medication-list',
  styleUrl: 'matveeva-medication-list.css',
  shadow: true,
})
export class MatveevaMedicationList {

  medications: any[];

  private async getMedicationsAsync() {
    return await Promise.resolve([
      {
        medicationName: 'Paracetamol',
        medicationId: '1001',
        quantityAvailable: 500,
        dosage: '500mg',
        frequency: 'Every 4 hours',
        forCondition: 'Pain relief'
      }, {
        medicationName: 'Amoxicillin',
        medicationId: '1002',
        quantityAvailable: 200,
        dosage: '250mg',
        frequency: 'Every 8 hours',
        forCondition: 'Bacterial Infection'
      }, {
        medicationName: 'Ibuprofen',
        medicationId: '1003',
        quantityAvailable: 300,
        dosage: '400mg',
        frequency: 'Every 6 hours',
        forCondition: 'Inflammation'
      }
    ]);
  }

  async componentWillLoad() {
    this.medications = await this.getMedicationsAsync();
  }
  render() {
    return (
      <Host>
        <md-list>
          {this.medications.map(medication =>
            <md-list-item>
              <div slot="headline">{medication.medicationName}</div>
              <div slot="supporting-text">
                {"Dose: " + medication.dosage + "  " + "Frequency: " + medication.frequency}
              </div>
              <div slot="secondary-text">
                {"For: " + medication.forCondition}
              </div>
              <md-icon slot="start">local_pharmacy</md-icon>
            </md-list-item>
          )}
        </md-list>
      </Host>
    );
  }

}

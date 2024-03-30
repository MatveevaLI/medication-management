import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import { MedicationListApiFactory, MedicationListEntry } from '../../api/medication';

@Component({
  tag: 'matveeva-medication-list',
  styleUrl: 'matveeva-medication-list.css',
  shadow: true,
})

export class MatveevaMedicationList {
  @Event({ eventName: "entry-clicked" }) entryClicked: EventEmitter<string>;
  @Prop() apiBase: string;
  @Prop() ambulanceId: string;
  @State() errorMessage: string;

  medications: MedicationListEntry[];

  private async getMedicationsAsync(): Promise<MedicationListEntry[]> {
    try {
      const response = await
        MedicationListApiFactory(undefined, this.apiBase).
          getMedicationListEntries(this.ambulanceId)
      if (response.status < 299) {
        return response.data;
      } else {
        this.errorMessage = `Cannot retrieve list of medications: ${response.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve list of medications: ${err.message || "unknown"}`
    }
    return [];
  }

  async componentWillLoad() {
    this.medications = await this.getMedicationsAsync();
  }

  render() {
    return (
      <Host>
        {this.errorMessage
          ? <div class="error">{this.errorMessage}</div>
          :
          <md-list>
            {this.medications.map((medication, index) =>
              <md-list-item onClick={() => this.entryClicked.emit(index.toString())}>
                <div slot="headline">{medication.name}</div>
                <div slot="supporting-text">
                  {"Dose: " + medication.dosage + "  " + "Frequency: " + medication.frequencyPerDay}
                </div>
                {/* <div slot="secondary-text">
                  {"For: " + medication.forCondition}
                </div> */}
                <md-icon slot="start">local_pharmacy</md-icon>
              </md-list-item>
            )}
          </md-list>
        }
      </Host>
    );
  }
}

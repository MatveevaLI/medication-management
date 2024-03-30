import { Component, Host, Prop, h, EventEmitter, Event, State } from '@stencil/core';
import { MedicationListApiFactory, MedicationListEntry } from '../../api/medication';

@Component({
  tag: 'matveeva-medication-editor',
  styleUrl: 'matveeva-medication-editor.css',
  shadow: true,
})
export class MatveevaMedicationEditor {
  @Prop() entryId: string;
  @Prop() ambulanceId: string;
  @Prop() apiBase: string;
  @Event({ eventName: "editor-closed" }) editorClosed: EventEmitter<string>;
  @State() entry: MedicationListEntry;
  @State() errorMessage: string;
  @State() isValid: boolean;

  private formElement: HTMLFormElement;

  private async getMedicationEntryAsync(): Promise<MedicationListEntry> {
    if (this.entryId === "@new") {
      this.isValid = false;
      this.entry = {
        id: "@new",
        dosage: "",
        name: "",
        frequencyPerDay: 2,
        expirationDate: ""
      };
      return this.entry;
    }

    if (!this.entryId) {
      this.isValid = false;
      return undefined
    }
    try {
      const response = await MedicationListApiFactory(undefined, this.apiBase).getMedicationListEntry(this.ambulanceId, this.entryId)
      if (response.status < 299) {
        this.entry = response.data;
        this.isValid = true;
      } else {
        this.errorMessage = `Cannot retrieve list of medications: ${response.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve list of medications: ${err.message || "unknown"}`
    }
    return undefined;
  }

  async componentWillLoad() {
    this.getMedicationEntryAsync();
  }

  render() {

    if (this.errorMessage) {
      return (
        <Host>
          <div class="error">{this.errorMessage}</div>
        </Host>
      )
    }

    return (
      <Host>
        <form ref={el => this.formElement = el}>
          <md-filled-text-field label="Medication Name"
            required value={this.entry?.name}
            oninput={(ev: InputEvent) => {
              if (this.entry) { this.entry.name = this.handleInputEvent(ev) }
            }}>
            <md-icon slot="leading-icon">healing</md-icon>
          </md-filled-text-field>

          <md-filled-text-field label="Dosage"

            required value={this.entry?.dosage}
            oninput={(ev: InputEvent) => {
              if (this.entry) { this.entry.dosage = this.handleInputEvent(ev) }
            }}>
            <md-icon slot="leading-icon">format_list_numbered</md-icon>
          </md-filled-text-field>

          <md-filled-text-field label="Frequency"
            required value={this.entry?.frequencyPerDay}
            oninput={(ev: InputEvent) => {
              if (this.entry) { this.entry.frequencyPerDay = this.handleInputNumberEvent(ev) }
            }}>
            <md-icon slot="leading-icon">update</md-icon>
          </md-filled-text-field>

          <md-filled-text-field label="Expiration Date"
            required value={this.entry?.expirationDate}
            oninput={(ev: InputEvent) => {
              if (this.entry) { this.entry.expirationDate = this.handleInputEvent(ev) }
            }}>
            <md-icon slot="leading-icon">watch_later</md-icon>
          </md-filled-text-field>
        </form>

        <md-divider></md-divider>

        <div class="actions">

          <md-filled-tonal-button id="delete" disabled={!this.entry || this.entry?.id === "@new"}
            onClick={() => this.deleteEntry()}>
            <md-icon slot="icon">Delete</md-icon>
            Zmazať
          </md-filled-tonal-button>
          
          <span class="stretch-fill"></span>
          <md-outlined-button id="cancel"
            onClick={() => this.editorClosed.emit("cancel")}>
            Zrušiť
          </md-outlined-button>

          <md-filled-button id="confirm" disabled={!this.isValid}
            onClick={() => this.updateEntry()}>
            <md-icon slot="icon">save</md-icon>
            Uložiť
          </md-filled-button>
        </div>
      </Host>
    );
  }

  private handleInputEvent(ev: InputEvent): string {
    const target = ev.target as HTMLInputElement;
    // check validity of elements
    this.isValid = true;
    for (let i = 0; i < this.formElement.children.length; i++) {
      const element = this.formElement.children[i]
      if ("reportValidity" in element) {
        const valid = (element as HTMLInputElement).reportValidity();
        this.isValid &&= valid;
      }
    }
    return target.value
  }

  private handleInputNumberEvent(ev: InputEvent): number {
    const target = ev.target as HTMLInputElement;
    // Attempt to parse the input value to a number
    const parsedValue = parseInt(target.value, 10);

    // Check if the parsed value is a valid number
    if (!isNaN(parsedValue)) {
      // check validity of elements
      this.isValid = true;
      for (let i = 0; i < this.formElement.children.length; i++) {
        const element = this.formElement.children[i];
        if ("reportValidity" in element) {
          const valid = (element as HTMLInputElement).reportValidity();
          this.isValid &&= valid;
        }
      }
      return parsedValue; // Return the parsed number
    } else {
      // Handle the case where the input value is not a valid number
      // For example, you could set the field to an error state, return a default value, or throw an error
      console.error("Invalid input for frequency");
      return 0; // Return a default value or handle this scenario appropriately
    }
  }

  private async updateEntry() {
    try {
      const api = MedicationListApiFactory(undefined, this.apiBase);
         const response
            = this.entryId === "@new"
            ? await api.createMedicationListEntry(this.ambulanceId, this.entry)
            : await api.updateMedicationListEntry(this.ambulanceId, this.entryId, this.entry);
      if (response.status < 299) {
        this.editorClosed.emit("store")
      } else {
        this.errorMessage = `Cannot store medication: ${response.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot store medication: ${err.message || "unknown"}`
    }
  }

  private async deleteEntry() {
    try {
      const response = await MedicationListApiFactory(undefined, this.apiBase)
        .deleteMedicationListEntry(this.ambulanceId, this.entryId)
      if (response.status < 299) {
        this.editorClosed.emit("delete")
      } else {
        this.errorMessage = `Cannot delete medication: ${response.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot delete medication: ${err.message || "unknown"}`
    }
  }
}

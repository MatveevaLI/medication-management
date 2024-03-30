import { Component, Host, Prop, h, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'matveeva-medication-editor',
  styleUrl: 'matveeva-medication-editor.css',
  shadow: true,
})
export class MatveevaMedicationEditor {
  @Prop() entryId: string;
  @Event({ eventName: "editor-closed" }) editorClosed: EventEmitter<string>;
 
  render() {
    return (
      <Host>
        <md-filled-text-field label="Medication Name">
          <md-icon slot="leading-icon">healing</md-icon>
        </md-filled-text-field>

        <md-filled-text-field label="Dosage">
          <md-icon slot="leading-icon">format_list_numbered</md-icon>
        </md-filled-text-field>

        <md-filled-text-field label="Frequency">
          <md-icon slot="leading-icon">update</md-icon>
        </md-filled-text-field>

        <md-filled-text-field label="Medication ID" >
          <md-icon slot="leading-icon">fingerprint</md-icon>
        </md-filled-text-field>

        <md-filled-text-field label="Notes" >
          <md-icon slot="leading-icon">note</md-icon>
        </md-filled-text-field>
 
        <md-divider></md-divider>
        <div class="actions">
          <md-filled-tonal-button id="delete"
            onClick={() => this.editorClosed.emit("delete")}>
            <md-icon slot="icon">delete</md-icon>
            Zmazať
          </md-filled-tonal-button>
          <span class="stretch-fill"></span>
          <md-outlined-button id="cancel"
            onClick={() => this.editorClosed.emit("cancel")}>
            Zrušiť
          </md-outlined-button>
          <md-filled-button id="confirm"
            onClick={() => this.editorClosed.emit("store")}>
            <md-icon slot="icon">save</md-icon>
            Uložiť
          </md-filled-button>
        </div>
      </Host>
    );
  }
}

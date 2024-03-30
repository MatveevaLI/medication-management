import { Component, Host, Prop, State, h } from '@stencil/core';

declare global {
  interface Window { navigation: any; }
}

@Component({
  tag: 'matveeva-medication-app',
  styleUrl: 'matveeva-medication-app.css',
  shadow: true,
})
export class MatveevaMedicationApp {

  @State() private relativePath = "";

  @Prop() basePath: string = "";

  componentWillLoad() {
    const baseUri = new URL(this.basePath, document.baseURI || "/").pathname;

    const toRelative = (path: string) => {
      if (path.startsWith(baseUri)) {
        this.relativePath = path.slice(baseUri.length)
      } else {
        this.relativePath = ""
      }
    }

    window.navigation?.addEventListener("navigate", (ev: Event) => {
      if ((ev as any).canIntercept) { (ev as any).intercept(); }
      let path = new URL((ev as any).destination.url).pathname;
      toRelative(path);
    });

    toRelative(location.pathname)
  }

  render() {

    let element = "list"
    let entryId = "@new"

    if (this.relativePath.startsWith("entry/")) {
      element = "editor";
      entryId = this.relativePath.split("/")[1]
    }

    const navigate = (path: string) => {
      const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
      window.navigation.navigate(absolute)
    }

    return (
      <Host>
        {
          element === "editor"
            ? <matveeva-medication-editor entry-id={entryId}
              onEditor-closed={() => navigate("./list")}></matveeva-medication-editor>
            : <matveeva-medication-list
              onentry-clicked={(ev: CustomEvent<string>) => navigate("./entry/" + ev.detail)} >
            </matveeva-medication-list>
        }
      </Host>
    );
  }
}
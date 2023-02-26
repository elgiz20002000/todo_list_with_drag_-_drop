export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  template: HTMLTemplateElement;
  app: T;
  element: U;

  constructor(
    templateId: string,
    appId: string,
    elementId: string,
    private insertPosiotion: "beforeend" | "afterbegin"
  ) {
    this.template = <HTMLTemplateElement>document.querySelector(templateId);
    this.app = <T>document.querySelector(appId);
    let importedElem = document.importNode(this.template.content, true);
    this.element = <U>importedElem.firstElementChild;
    this.element.id = elementId;
    this.attach();
  }

  abstract renderProjects(): void;

  abstract config(): void;

  private attach() {
    this.app.insertAdjacentElement(this.insertPosiotion, this.element);
  }
}

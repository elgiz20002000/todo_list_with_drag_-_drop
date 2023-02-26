import {Component} from './project-base'
import { validate } from '../models/validate';
import { state } from '../state/project-state';


export class ProjectInput extends Component<HTMLElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("#project-input", "#app", "user-input", "afterbegin");

    this.titleInputElement = <HTMLInputElement>(
      this.element.querySelector("#title")
    );
    this.descriptionInputElement = <HTMLInputElement>(
      this.element.querySelector("#description")
    );
    this.peopleInputElement = <HTMLInputElement>(
      this.element.querySelector("#people")
    );
    this.config();
  }

  private userInputs = (): [string, string, number] | void => {
    const title = this.titleInputElement.value;
    const description = this.descriptionInputElement.value;
    const people = this.peopleInputElement.value;
    ``;
    const validatedTitle = validate({ value: title, required: true });
    const validatedDescription = validate({
      value: description,
      required: true,
      minLength: 7,
    });
    const validatedPeople = validate({
      value: +people,
      required: true,
      min: 1,
    });

    if (!validatedTitle || !validatedDescription || !validatedPeople) {
      alert("Write all inputs");
      return;
    } else {
      return [title, description, +people];
    }
  };

  private clearInputs = () => {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  };

  renderProjects() {}

  // @autoBind
  private submithandler = (e: Event) => {
    e.preventDefault();
    const userData = this.userInputs();
    if (Array.isArray(userData)) {
      const [title, description, people] = userData;
      state.addProject(title, description, people);
      this.clearInputs();
    }
  }

  config() {
    this.element.addEventListener("submit", this.submithandler);
  }
}

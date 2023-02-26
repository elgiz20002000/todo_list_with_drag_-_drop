import {Component} from '../components/project-base'
import { Project } from '../models/project';
import {Draggable} from '../models/drag-drop-interface';
  export class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
  {
    private project: Project;
    constructor(hostId: string, project: Project) {
      super("#single-project", hostId, project.id, "beforeend");

      this.project = project;
      this.config();
      this.renderProjects();
    }

    get persons() {
      if (this.project.people == 1) {
        return "1 Person assigned";
      } else {
        return `${this.project.people.toString()} Persons assigned`;
      }
    }

    dragEndHandler = (e: DragEvent) => {
      console.log("End");
    };

    dragStartHandler = (e: DragEvent) => {
      e.dataTransfer!.setData("text/plain", this.project.id);
      e.dataTransfer!.effectAllowed = "move";
    };

    config() {
      this.element.addEventListener("dragstart", this.dragStartHandler);
      this.element.addEventListener("dragend", this.dragEndHandler);
    }

    renderProjects(): void {
      this.element.querySelector("h2")!.textContent = this.project.title;
      this.element.querySelector("h3")!.textContent = this.persons;
      this.element.querySelector("p")!.textContent = this.project.description;
    }
  }

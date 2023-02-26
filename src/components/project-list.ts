
import {Component} from '../components/project-base'
import { Project, Status } from '../models/project';
import { state } from '../state/project-state';
import {DragTarget} from '../models/drag-drop-interface';
import { ProjectItem } from './project-item';


  export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
  {
    assigndesProjects: Project[];

    constructor(private type: "active" | "finished") {
      super("#project-list", "#app", `${type}-projects`, "beforeend");
      this.assigndesProjects = [];

      this.renderContent();

      this.config();
    }

    dropHandler = (e: DragEvent) => {
      state.moveProject(
        e.dataTransfer!.getData("text/plain"),
        this.type == "active" ? Status.Active : Status.Finished
      );
      let ul = this.element.querySelector("ul")!;
      ul.classList.remove("droppable");
    };

    dragLeaveHandler = (e: DragEvent) => {
      let ul = this.element.querySelector("ul")!;
      ul.classList.remove("droppable");
    };

    dragOverHandler = (e: DragEvent) => {
      if (e.dataTransfer && e.dataTransfer.types[0] == "text/plain") {
        e.preventDefault();
        let ul = this.element.querySelector("ul")!;
        ul.classList.add("droppable");
      }
    };

    renderProjects() {
      const list = this.element.querySelector(
        `#${this.type}-projects-list`
      ) as HTMLUListElement;
      list.innerHTML = "";
      for (let projectItem of this.assigndesProjects) {
        new ProjectItem(
          "#" + this.element.querySelector("ul")!.id,
          projectItem
        );
      }
    }

    renderContent() {
      this.element.querySelector("ul")!.id = `${this.type}-projects-list`;
      let header = <HTMLHeadElement>this.element.querySelector("h2");
      header.innerText = this.type.toUpperCase();
    }

    config() {
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);
      this.element.addEventListener("drop", this.dropHandler);
      state.addListeners((projects: Project[]) => {
        const filteredProjects = projects.filter((item) => {
          if (this.type == "active") {
            return item.status == Status.Active;
          } else {
            return item.status == Status.Finished;
          }
        });
        this.assigndesProjects = filteredProjects;
        this.renderProjects();
      });
    }
  }


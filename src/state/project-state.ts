import { Project, Status } from "../models/project";


  type Listener<T> = (projects: T[]) => void;

  abstract class State<T> {
    protected listeners: Listener<T>[] = [];

    addListeners(listenerFN: Listener<T>) {
      this.listeners.push(listenerFN);
    }
  }

  export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
      super();
    }

    static getInstance() {
      if (this.instance) {
        return this.instance;
      } else {
        return new ProjectState();
      }
    }

    addProject(title: string, description: string, peopleNum: number) {
      const project = new Project(
        Math.random().toString(),
        title,
        description,
        peopleNum,
        Status.Active
      );
      this.projects.push(project);
      this.refreshList();
    }

    moveProject(ProjectId: string, status: Status) {
      const response = this.projects.find((el) => el.id == ProjectId);
      if (response && response.status !== status) {
        response.status = status;
        this.refreshList();
      }
    }

    refreshList() {
      for (let listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
  }

  export const state = ProjectState.getInstance();


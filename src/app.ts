import axios from "../node_modules/axios/index";
import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";



new ProjectInput();
new ProjectList("active");
new ProjectList("finished");

axios.get(`https://www.omdbapi.com/?s=spider&apikey=8d9cfe3d`)
.then(res => {
    console.log(res.data);
})

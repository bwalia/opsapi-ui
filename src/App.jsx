import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import dataProvider from "./dataProvider";
import authProvider from "./authProvider";

import "./App.css";
import Users from "./Users";
import Roles from "./Roles";
import Groups from "./Groups";
import Modules from "./Modules";
import Projects from "./Projects";
import Templates from "./Templates";
import Secrets from "./Secrets";
import Documents from "./Documents";

function App() {
  const apiURL = import.meta.env.VITE_API_URL;
  return (
    <Admin
      dataProvider={dataProvider(apiURL)}
      authProvider={authProvider}
    >
      <Resource name="users" {...Users} />
      <Resource name="roles" {...Roles} />
      <Resource name="groups" {...Groups} />
      <Resource name="modules" {...Modules} />
      <Resource name="projects" {...Projects} />
      <Resource name="templates" {...Templates} />
      <Resource name="secrets" {...Secrets} />
      <Resource name="documents" {...Documents} />
    </Admin>
  );
}

export default App;

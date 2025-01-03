import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
// import dataProvider from "./dataProvider";
import authProvider from "./authProvider";

import './App.css';

function App() {
  const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider} loginPage={false}>
      <Resource name="posts" list={ListGuesser} />
      <Resource name="comments" list={ListGuesser} />
    </Admin>
  )
}

export default App

import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import dataProvider from "./dataProvider";
import authProvider from "./authProvider";

import './App.css';
import Users from "./Users";

function App() {
  const apiURL = import.meta.env.VITE_API_URL
  return (
    <Admin dataProvider={dataProvider(apiURL)} authProvider={authProvider} loginPage={false}>
      <Resource name="users" {...Users} />
    </Admin>
  )
}

export default App

import React from "react";
import { Admin, Resource } from "react-admin";
import { UserList } from './components/User';
import restProvider from 'ra-data-simple-rest';
import {UserCreate} from './components/UserCreate';
import {UserEdit} from './components/UserEdit';


const dataProvider = restProvider('http://localhost:3000')
function App() {
  return (
      <Admin dataProvider={dataProvider} >
        <Resource name="users" 
        list={UserList} 
        edit={UserEdit}  
        create={UserCreate}
        />
      </Admin>
    )
  }
export default App;
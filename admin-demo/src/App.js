import React from "react";
import { Admin, Resource } from "react-admin";
import { UserList } from './components/User';
import restProvider from 'ra-data-simple-rest';
import {UserCreate} from './components/UserCreate';
import {UserEdit} from './components/UserEdit';
import { SecureRoute } from '@okta/okta-react';
import { Router } from 'react-router-dom';



const dataProvider = restProvider('http://localhost:3000')
function App() {
  return (
    <Router>
      <SecureRoute path="/User" exact component={UserList} />
      <SecureRoute path="/UserEdit" exact component={UserEdit} />
      <SecureRoute path="/UserCreate" exact component={UserCreate} />
      <Admin dataProvider={dataProvider} >
        <Resource name="users" 
        list={UserList} 
        edit={UserEdit}  
        create={UserCreate}
        />
      </Admin>
      </Router>  
    );
  }

export default App;
import React from "react";
import { Admin, Resource } from "react-admin";
import { UserList } from './components/User';
import restProvider from 'ra-data-simple-rest';
import {UserCreate} from './components/UserCreate';
import {UserEdit} from './components/UserEdit';

import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { Security, SecureRoute } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";

const CLIENT_ID = process.env.CLIENT_ID;
const CALLBACK_PATH = process.env.CALLBACK_PATH;
const ISSUER = process.env.ISSUER;
const HOST = process.env.HOST;
const REDIRECT_URI = `http://${HOST}${CALLBACK_PATH}`;
const SCOPES = process.env.SCOPES;

if (!SCOPES || !CLIENT_ID || !CALLBACK_PATH || !ISSUER || !HOST) {
  throw new Error("All environmental variables must be set");
}

const config = {
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URI,
  scopes: SCOPES.split(/\s+/),
};

const oktaAuth = new OktaAuth(config);

const dataProvider = restProvider('http://localhost:3000')

const App = () => {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };
  return (
    <Router>
      <Security restoreOriginalUri={restoreOriginalUri} oktaAuth={oktaAuth}>
        
        <Route path="/" exact={true} component={UserList} />
        
        <Admin dataProvider={dataProvider} >
        <Resource name="users" 
        list={UserList} 
        edit={UserEdit}  
        create={UserCreate}
        />
      </Admin>

        <SecureRoute path="./components/User" exact={true} component={UserList} />
      </Security>
    </Router>
  );
};
export default App;

/*
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
*/
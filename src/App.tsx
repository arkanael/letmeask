import { createContext, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { NewRoom } from "./pages/NewRoom";
import { Home } from './pages/Home';
import firebase from 'firebase';
import { auth } from './services/firebase';

export const AuthContext = createContext({} as any);

function App() {
  const [user, setUser] = useState();
  
  function signInWitGoogle(){

    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(result =>{
        if(result.user){
          const {displayName, photoURL, uid } = result.user;

          if(!displayName || !photoURL){
            throw new Error(`Missing information from Google Account.`);
          }

          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          });
        }
    });
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWitGoogle }} >
        <Route path='/' exact component={Home}/>
        <Route path='/rooms/new' component={NewRoom}/>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
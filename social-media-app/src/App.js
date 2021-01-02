import React,{useEffect,createContext, useReducer, useContext} from 'react'
import Navbar from './components/Navbar'
import './App.css'
import Home from './components/Home'
import Signin from './components/Signin'
import Profile from'./components/Profile'
import Signup from './components/Signup'
import Other from './components/Other'

import CreatePost from './components/CreatePost'
import {BrowserRouter, Route, Switch,useHistory } from 'react-router-dom'
import {Reducer,initialState} from './Reducer'

export const UserContext=createContext()



const Routing =()=>{
  const history = useHistory()
  const{state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      }
      else{
        history.push('/signin')
      }
     
  },[])
  return(
    <div className="app">
    <Switch>
      <Route  exact path='/'><Home/> </Route>
      <Route path='/signin'><Signin/></Route>
      <Route exact path='/profile'><Profile/></Route>
      <Route path='/signup'><Signup /></Route>
      <Route path='/CreatePost'>< CreatePost /></Route>
      <Route  path='/Profile/:userid'>< Other /></Route>

      </Switch>
      </div>
  )
}

function App() {
  const[state,dispatch]=useReducer(Reducer,initialState)
  return (
      <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
      <Navbar />
      <Routing />
      </BrowserRouter>  
     </UserContext.Provider> 
  )
}

export default App

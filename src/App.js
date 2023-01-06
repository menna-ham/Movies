import logo from './logo.svg';
import './App.css';
// import Home from 'Home/home.jsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import MainLayout from './Components/MainLayout/MainLayout';
import Movies from './Components/Movies/Movies'
import Tv from './Components/Tv/Tv'
import People from './Components/People/People'
import Trending from './Components/Trending/Trending'
import About from './Components/About/About'
import NotFound from './Components/NotFound/NotFound';
import jwt_decode from 'jwt-decode';
import { useState,useEffect } from 'react';
import axios from 'axios';
import MyList from './Components/MyList/MyList';
import Details from './Components/Details/Details';
import PersonDetails from './Components/Details/PersonDetails';
import SearchMain from './Components/Search/SearchMain';
import SearchGen from './Components/Search/SearchGen';
import AddContextProvider from './AddContext/AddContext';
import { useContext } from 'react';
import AuthContextProvider, { AuthContext } from './AddContext/AuthContext';
import FavoriteContextProvider, { FavoriteContext } from './AddContext/FavoriteContext';


function App() {

  let{User,LogOut,ProtectedRouter,getUserToken}= useContext(AuthContext)



  let routes = createBrowserRouter([
    {path:'/', element:<MainLayout user={User} logOut={LogOut}/>,errorElement:<NotFound/>,children:[
      { path:'home',element:<ProtectedRouter><Home/></ProtectedRouter> },
      { path:'tv',element:<ProtectedRouter><Tv/></ProtectedRouter>},
      { path:'movies',element:<ProtectedRouter><Movies/></ProtectedRouter>},
      { path:'people',element:<ProtectedRouter><People/></ProtectedRouter>},
      { path:'trending',element:<ProtectedRouter><Trending/></ProtectedRouter>},
      { path:'*',element:<ProtectedRouter><NotFound/></ProtectedRouter>},
      { path:'about',element:<ProtectedRouter><About/></ProtectedRouter>},
      { path:'mylist',element:<ProtectedRouter><MyList/></ProtectedRouter>},
      { path:'details/:type/:id',element:<ProtectedRouter><Details/></ProtectedRouter>},
      { path:'perDetails/:id',element:<ProtectedRouter><PersonDetails/></ProtectedRouter>},
      { path:'search/',element:<ProtectedRouter><SearchMain/></ProtectedRouter>},
      { path:'searchGen/:type/:genre',element:<ProtectedRouter><SearchGen/></ProtectedRouter>},

      { path:'login',element:<Login getUserToken ={getUserToken}/>},
      { path:'register',element:<Register/>},

    ]}
  ])

  return (
    <FavoriteContextProvider>
       <RouterProvider router={routes}/>
    </FavoriteContextProvider>
  );
}

export default App;

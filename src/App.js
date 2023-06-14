import React from 'react';
import './App.css';
import Home from './pages/Home/Home';
import TopMenu from './components/TopMenu/TopMenu';
import { createBrowserRouter, createRoutesFromElements, Route, Link, Outlet, RouterProvider } from 'react-router-dom';

import Sessions from './pages/Sessions/Sessions';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element = {<Home/>}/>
        <Route path="/sessions" element = {<Sessions/>} />        
      </Route>
    )
  )
  return (
    <>
     <TopMenu/> 
     <RouterProvider router={router}/>         
    </>    
  );
}

const Root = () => {
  return (
    <>
      <div>
        <Link to="/">
          Home
        </Link>
        <Link to="/sessions">
          Sessions
        </Link>
      </div>

      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App;

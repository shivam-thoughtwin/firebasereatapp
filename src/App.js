import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import AddEdit from './components/pages/AddEdit';
import About from './components/pages/About';
import View from './components/pages/View';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/includes/Header/Header';


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <ToastContainer position='top-center' />
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/add' element={<AddEdit />} />
          <Route path='/update/:id' element={<AddEdit />} />
          <Route path='/about' element={<About />} />
          <Route path='/view/:id' element={<View />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

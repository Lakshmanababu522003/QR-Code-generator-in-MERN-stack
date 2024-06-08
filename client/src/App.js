import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import Routes here
import QrReader from './components/QrReader';
import QrGenerator from './components/QrGenerator';
import Nav from './components/Nav';
import Register from './components/Register';
import UserList from './components/Userlist';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes> {/* Use Routes instead of Switch */}
      <Route path="/userlist" element={<UserList />} />
        <Route path="/generator" element={<QrGenerator />} />
        <Route exact path="/" element={<Register />} />
        <Route exact path="/reader" element={<QrReader />}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

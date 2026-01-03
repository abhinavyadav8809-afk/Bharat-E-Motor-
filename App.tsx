
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Models from './components/Models';
import Booking from './components/Booking';
import Service from './components/Service';
import Finance from './components/Finance';
import About from './components/About';
import Contact from './components/Contact';
import Admin from './components/Admin';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/models" element={<Models />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/service" element={<Service />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;

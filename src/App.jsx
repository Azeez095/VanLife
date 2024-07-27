import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from './Components/Home'
import About from './Components/About'
import './App.css'
import Vans from './Components/Vans'
import VanDetail from './Components/VanDetail'
import Layout from './Components/Layout';
import Dashboard from './Components/Host/Dashboard';
import Income from './Components/Host/Income';
import Reviews from './Components/Host/Reviews';
import HostLayout from './Components/Host/HostLayout';
import Footer from './Components/Footer';
import HostVans from './Components/Host/HostVans'
import HostVansDetails from './Components/Host/HostVansDetails';
import HostVanInfo from './Components/Host/HostVanInfo';
import HostVanPhotos from './Components/Host/HostVanPhotos';
import HostVanPricing from './Components/Host/HostVanPricing';

function App() {
  return (
    <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="vans" element={<Vans />} />
          <Route path="about" element={<About />} />
          <Route path="vans/:id" element={<VanDetail />} />
          <Route path="footer" element={<Footer />} />

          <Route path="/host" element={< HostLayout/>}>
            <Route index element={<Dashboard/>} />
            <Route path="income" element={<Income />} />
            <Route path="vans" element={<HostVans />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="vans/:id" element={<HostVansDetails />} >
              <Route index element={<HostVanInfo />} />
              <Route path="photos" element={<HostVanPhotos />} />
              <Route path="pricing" element={<HostVanPricing />} />
              
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

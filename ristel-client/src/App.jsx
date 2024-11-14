import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './layouts/dashboard/ScrollToTop';
import AllRoutes from './layouts/AllRoutes.jsx';
import 'simplebar/dist/simplebar.min.css';
import 'tippy.js/animations/scale.css';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.min.css"



const App = () => {
  useEffect(() => {
    AOS.init();
  }, [])
  return <>
    <ToastContainer />
    <Router>

      <ScrollToTop />
      <AllRoutes />
    </Router>
  </>
}

export default App
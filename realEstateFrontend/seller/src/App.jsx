import React, { useState, useEffect } from 'react'
import 'antd/dist/reset.css'; // Required for AntD v5+

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Dashboard from './component/dashboard/Dashboard';
import ProfileDetails from './component/profileDetails/ProfileDetails';

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/profiles' element={<ProfileDetails />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App






















// import React, { Suspense, lazy } from 'react';

// const Dashboard = lazy(() => import('./component/dashboard/Dashboard'));
// const ProfileDetails = lazy(() => import('./component/profileDetails/ProfileDetails'));

// function App() {
//   return (
//     <BrowserRouter>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/profiles" element={<ProfileDetails />} />
//           <Route path="*" element={<Navigate to="/dashboard" />} />
//         </Routes>
//       </Suspense>
//     </BrowserRouter>
//   );
// }

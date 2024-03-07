import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppBar } from './components/AppBar';
import { HomePage } from './components/HomePage';
import { EditStore } from './components/EditStore';
import { ReportPage } from './components/ReportPage';
import { Menulist } from './components/Menulist';
import { EditMenu } from './components/EditMenu';
import { FrontStore } from './components/FrontStore';
import { BackStore } from './components/BackStore';
import { CreateMenu } from './components/CreateMenu';
import { LoginPage } from './components/LoginPage';
import { AdminOverview } from './components/AdminOverview';
import { AdminManageStore } from './components/AdminManageStore';
import { AdminOption } from './components/AdminOption';
import { CreateStore } from './components/CreateStore';
import './App.css';
import GlobalStyles from './components/GlobalStyle';
import { AccessStorePage } from './components/AccessStorePage';
import { AdminAppBar } from './components/AdminAppBar';

interface StoreData {
  _id: string;
  name: string;
  store_img_url: string;
  bank_name: string;
  owner_name: string;
  card_num: number;
  qr_img_url: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

function App() {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Fetch store data from the API when the component mounts
    fetch('https://order-api-patiparnpa.vercel.app/stores/65a39b4ae668f5c8329fac98')
      .then((response) => response.json())
      .then((data: StoreData) => {
        console.log('API Response (Store Data):', data);
        setStoreData(data);
      })
      .catch((error) => {
        console.error('Error fetching store data:', error);
      });
  }, []);

  const appBarRoutes = ['/', '/editstore', '/report', '/menulist', '/editmenu', '/createmenu'];
  const adminBarRoutes = ['/admin', '/adminstore', '/adminoption', '/createstore', '/accessstore'];
  // Check if the current route is in the array
  const shouldShowAppBar = appBarRoutes.includes(window.location.pathname);
  const shouldShowAdminBar = adminBarRoutes.some(route => location.pathname.includes(route));

  return (
    <div>
      <GlobalStyles></GlobalStyles>
      {shouldShowAppBar && <AppBar storeData={storeData} />}
      {shouldShowAdminBar && <AdminAppBar storeData={storeData}></AdminAppBar>}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/editstore" element={<EditStore />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/menulist" element={<Menulist />} />
        <Route path="/editmenu/:_id" element={<EditMenu />} />
        <Route path="/front" element={<FrontStore />} />
        <Route path="/back" element={<BackStore />} />
        <Route path="/createmenu" element={<CreateMenu />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminOverview />} />
        <Route path="/adminstore" element={<AdminManageStore />} />
        <Route path="/adminoption" element={<AdminOption />} />
        <Route path="/createstore" element={<CreateStore />} />
        <Route path='/accessstore/:accessStoreId' element={<AccessStorePage></AccessStorePage>}></Route>
      </Routes>
    </div>
  );
}

export default App;

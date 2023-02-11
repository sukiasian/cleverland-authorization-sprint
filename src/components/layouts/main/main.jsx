import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../../footer';
import { Header } from '../../header';

export const MainLayout = () => (
  <div className='app-wrapper'>
    <Header />
    <Outlet />
    <Footer />
  </div>
);

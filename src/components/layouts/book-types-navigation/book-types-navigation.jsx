import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../navigation';

export const LayoutBookTypesNavigation = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

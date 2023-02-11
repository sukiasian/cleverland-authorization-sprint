import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../../navigation/navigation';

export const NavigationLayout = () => (
  <>
    <Navigation />
    <Outlet />
  </>
);

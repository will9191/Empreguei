import React from 'react';
import DashNavbar from '../components/Layout/ClientLayout/ClientNavbar';
import { Outlet } from 'react-router';

export default () => {
  return (
    <>
      <ClientNavbar/>
      <Outlet />
    </>
  );
};
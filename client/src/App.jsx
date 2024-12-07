import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './Layout';
import './config/axiosConfig';
import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import NotFoundPage from './pages/NotFoundPage';
import PageInfo from './pages/PageInfo';
import BookingsPage from './pages/BookingsPage';
import BookingInfo from './pages/BookingInfo';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/place/:id' element={<PageInfo />} />
        <Route path='/account' element={<ProfilePage />} />
        <Route path='/account/places' element={<PlacesPage />} />
        <Route path='/account/places/new' element={<PlacesFormPage />} />
        <Route path='/account/places/:id' element={<PlacesFormPage />} />
        <Route path='/account/bookings' element={<BookingsPage />} />
        <Route path='/account/bookings/:id' element={<BookingInfo />} />
        {/* <Route path='*' element={<NotFoundPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;

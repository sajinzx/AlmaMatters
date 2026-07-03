import React from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';

export default function UserLayout() {
  const { username } = useParams();
  const currentUser = (() => {
    try {
      return JSON.parse(sessionStorage.getItem('currentUser') || 'null');
    } catch {
      return null;
    }
  })();

  // Not logged in → go to login page
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but URL username doesn't match → redirect to correct URL
  if (currentUser.username !== username) {
    return <Navigate to={`/${currentUser.username}/home`} replace />;
  }

  // All good – render the child route
  return <Outlet />;
}
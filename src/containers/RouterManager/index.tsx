import { routes } from 'appConstants/routes';
import { Home } from 'pages';
import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

export const RouteManager: FC = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path={routes.root} element={<Home />} />
    </Routes>
  );
};

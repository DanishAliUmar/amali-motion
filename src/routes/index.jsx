import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import HomeListing from '../pages/HomeListing';
import HomeDetail from '../pages/HomeDetail';
import LoanEstimator from '../pages/LoanEstimator';
import ContactUs from '../pages/ContactUs';
import SignIn from '../components/Auth/SignIn';
import SignUp from '../components/Auth/SignUp';
import DashboardLayout from '../layouts/DashboardLayout';
import Applications from '../pages/Dashboard/Applications';
import ManageHomes from '../pages/Dashboard/ManageHomes';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/homes',
    element: <HomeListing />,
  },
  {
    path: '/homes/:id',
    element: <HomeDetail />,
  },
  {
    path: '/loan-estimator',
    element: <LoanEstimator />,
  },
  {
    path: '/contact-us',
    element: (
      <PrivateRoute>
        <ContactUs />
      </PrivateRoute>
    ),
  },
  {
    path: '/auth',
    children: [
      { path: 'sign-in', element: <SignIn /> },
      { path: 'sign-up', element: <SignUp /> },
    ],
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      { path: 'applications', element: <Applications /> },
      { path: 'manage-homes', element: <ManageHomes /> },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}

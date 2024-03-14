import React, { lazy, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App';
import Loading from '@/components/Loading/Loading';
import ProtectedRoute from '@/components/ProtectedRoute';
import reportWebVitals from '@/reportWebVitals';

import '@/styles/globals.css';

const AuthPage = lazy(() => import('@/pages/Auth/Auth'));
const DashboardPage = lazy(() => import('@/pages/Dashboard/Dashboard'));
const AdminPage = lazy(() => import('@/pages/Admin/Admin'));
const ExamDetailsPage = lazy(() => import('@/pages/ExamDetails/ExamDetails'));
const PatientDetailsPage = lazy(() => import('@/pages/PatientDetails/PatientDetails'));
const NotFoundPage = lazy(() => import('@/pages/NotFound/NotFound'));

Sentry.init({
  dsn: 'https://f77021927426ac45d65876e0f3abefdd@o4506865827119104.ingest.us.sentry.io/4506865829085184',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
    // See docs for support of different versions of variation of react router
    // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  // TODO: Replace api link.
  tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouter(createBrowserRouter);

const router = sentryCreateBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'admin',
        element: <AdminPage />,
      },
      {
        path: 'exams/:examId',
        element: <ExamDetailsPage />,
      },
      {
        path: 'patients/:patientId',
        element: <PatientDetailsPage />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<Loading />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);

// TODO: Remove  React.StrictMode in production
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="process.env.REACT_APP_GOOGLE_CLIENT_ID">
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

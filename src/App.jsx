import React from 'react';

import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';
import 'antd/dist/reset.css';

import SiteHeader from './components/layout/SiteHeader';
import DashboardPage from './pages/dashboardPage';
import { ThemeProvider } from './providers/themeProvider';
import Routes from './routes';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <>
                    <SiteHeader />
                    <div>
                        <Outlet />
                    </div>
                </>
            ),
            children: Routes,
        },
        {
            path: '/dashboard/*',
            element: <DashboardPage />,
        },
    ]);

    return (
        <>
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        </>
    );
}

export default App;

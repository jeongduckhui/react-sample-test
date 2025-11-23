import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
import SearchPage from './components/common-code/SearchPage.jsx';
import AgGridContextMenuTestView from './components/contextmenu/AgGridContextMenuTestView.jsx';
import AllReadonlyDisabledToggle from './components/allreadonlydisabledtoggle/AllReadonlyDisabledToggle.jsx';
import PopupTest from './components/popuptransfer/PopupTest.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'searchpage',
        element: <SearchPage />,
      },
      {
        path: 'contextmenu',
        element: <AgGridContextMenuTestView />,
      },
      {
        path: 'allreadonlydisabled',
        element: <AllReadonlyDisabledToggle />,
      },
      {
        path: 'popuptransfer',
        element: <PopupTest />,
      },
    ],
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

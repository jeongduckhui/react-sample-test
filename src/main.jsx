import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
import SearchPage from './pages/SearchPage.jsx';
// import AgGridContextMenu from './components/contextmenu/AgGridConextMenuSample.jsx';
// import ContextMenuTest from './components/contextmenu/ContextMenuTest.jsx';
import AgGridContextMenuTestView from './components/contextmenu/AgGridContextMenuTestView.jsx';
import AllReadonlyDisabledToggle from './components/allreadonlydisabledtoggle/AllReadonlyDisabledToggle.jsx';

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
        // element: <ContextMenuTest />,
      },
      {
        path: 'allreadonlydisabled',
        element: <AllReadonlyDisabledToggle />,
      },
    ],
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

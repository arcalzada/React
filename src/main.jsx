import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ListProducts from './ListProducts.jsx';
import Product from './Product.jsx';
import ContactInfo from './ContactInfo.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { APIURL } from './Configuration.js';


const router = createBrowserRouter([{
  path: "/",
  element: <App/>,
  children: [{
    path: "",
    element: <ListProducts/>,
    loader: async () => {
      const queryParams = new URLSearchParams().toString();
      if (queryParams) {
        return await fetch(`${APIURL}/shops/products/?${queryParams}`)
      };
      return await fetch(`${APIURL}/shops/products/`);
    }
  },{
    path: "contactInfo",
    element: <ContactInfo/>,
  },{
    path: "products/:id",
    element: <Product/>,
    loader: async ({ params }) => {
      return await fetch(`${APIURL}/shops/products/${params.id}/`)
    }
  }],
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)

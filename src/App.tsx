import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home/Homepage";
import Pricing from "./pages/pricing/Pricing";
import Product from "./pages/product/Product";
import Login from "./pages/login/Login";
import AppLayout from "./pages/app/AppLayout";
import Form from "./components/form/Form";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/city/CityList";

import CountryList from "./components/country/CoutriesList";
import City from "./components/city/City";
import CitiesProvider from "./context/CitiesProvider";
import "leaflet/dist/leaflet.css";
import AuthProvider from "./context/AuthProvider";
import Authrize from "./context/Authorize";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <CitiesProvider>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="product" element={<Product />} />
              <Route path="login" element={<Login />} />
              <Route element={<Authrize />}>
                <Route path="app" element={<AppLayout />}>
                  <Route index element={<Navigate to={"cities"} />} />

                  <Route path={"cities"} element={<CityList />}></Route>

                  <Route path="cities/:id" element={<City />} />

                  <Route path="countries" element={<CountryList />} />

                  <Route path={"form"} element={<Form />} />
                </Route>
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </CitiesProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home/Homepage";
import Pricing from "./pages/pricing/Pricing";
import Product from "./pages/product/Product";
import Login from "./pages/login/Login";
import AppLayout from "./pages/app/AppLayout";
import Form from "./components/form/Form";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/city/CityList";
import { useEffect } from "react";

import CountryList from "./components/country/CoutriesList";
import City from "./components/city/City";
import useCities from "./context/useCities";

const BASE_URL = "http://localhost:8000/cities";

function App() {
  const { onSetCities, onSetLoading } = useCities();

  useEffect(() => {
    (async () => {
      onSetLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        onSetCities(data);
      } catch (err) {
        console.log(err);
      } finally {
        onSetLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="product" element={<Product />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate to={"cities"} />} />

            <Route path={"cities"} element={<CityList />}></Route>

            <Route path="cities/:id" element={<City />} />

            <Route path="countries" element={<CountryList />} />

            <Route path={"form"} element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

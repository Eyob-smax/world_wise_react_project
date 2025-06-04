import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home/Homepage";
import Pricing from "./pages/pricing/Pricing";
import Product from "./pages/product/Product";
import Login from "./pages/login/Login";
import AppLayout from "./pages/app/AppLayout";
import Form from "./components/form/Form";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/city/CityList";
import { useEffect, useState } from "react";
import type { ICity } from "./lib/types";
import CountryList from "./components/country/CoutriesList";
import City from "./components/city/City";

const BASE_URL = "http://localhost:8000/cities";

function App() {
  const [cities, setCities] = useState<ICity[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        setCities(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
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

            <Route
              path={"cities"}
              element={<CityList cities={cities} isLoading={loading} />}
            ></Route>

            <Route path="cities/:id" element={<City cities={cities} />} />

            <Route
              path="countries"
              element={<CountryList cities={cities} isLoading={loading} />}
            />

            <Route path={"form"} element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

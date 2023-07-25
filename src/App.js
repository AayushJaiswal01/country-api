import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Countries from "./components/countries";
import Country from "./components/country";
import Error from "./components/Error";
function App() {
  return (
    <BrowserRouter className="bg-gray-100 dark:bg-backdark">
      <Header />
      <Routes>
        <Route path="/" exact element={<Countries />}></Route>
        <Route path="/country/:countryName" element={<Country />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

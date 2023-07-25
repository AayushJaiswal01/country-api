import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import FilterCountry from "./FilterCountry";

function Countries() {
  const [countries, setCountries] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getAllCountries = async () => {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/all`);

      if (!res.ok) throw new Error("Something went wrong!");

      const data = await res.json();

      console.log(data);

      setCountries(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };
  const getCountryByName = async (countryName) => {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
      );

      if (!res.ok) throw new Error("Not found any country!");

      const data = await res.json();
      setCountries(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getCountryByRegion = async (regionName) => {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/region/${regionName}`
      );

      if (!res.ok) throw new Error("Failed..........");

      const data = await res.json();
      setCountries(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(false);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);
  return (
    <div className="bg-gray-100 dark:bg-backdark">
      <div className="country__top flex flex-row justify-between">
        <div className="mt-28 ml-10">
          <SearchInput onSearch={getCountryByName} />
        </div>

        <div className="mt-28 mr-10">
          <FilterCountry onSelect={getCountryByRegion} />
        </div>
      </div>

      <section className="mt-10 gap-x-8 gap-y-8 flex flex-wrap 2xl:container 2xl:mx-auto px-10 ">
        {Array.isArray(countries)
          ? countries.map((country) => (
              <Link to={`/country/${country.name.common}`}>
                <article className="bg-white rounded-md shadow w-60 dark:bg-lightdark dark:hover:bg-gray-700 hover:bg-gray-100 transition-all duration-300 h-80">
                  <img
                    className="w-full  h-40 rounded"
                    src={country.flags.png}
                    alt=""
                  />
                  <div className="p-4">
                    <h2 className="font-bold text-gray-900 text-2xl mb-3 dark:text-white ">
                      {country.name.common}
                    </h2>
                    <ul>
                      <li className="dark:text-white text-gray-900">
                        Capital:{country.capital}
                      </li>
                      <li className="dark:text-white text-gray-900">
                        Region:{country.region}
                      </li>
                    </ul>
                  </div>
                </article>
              </Link>
            ))
          : null}
      </section>
    </div>
  );
}

export default Countries;

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Country() {
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { countryName } = useParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const getCountryByName = async () => {
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}`
        );

        if (!res.ok) throw new Error("Could not found!");

        const data = await res.json();

        setCountry(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    getCountryByName();
  }, [countryName]);

  return (
    <div className="bg-gray-100 dark:bg-lightdark">
      {isLoading ? (
        <h1 className="flex items-center justify-center h-screen text-4xl uppercase tracking-widest text-gray-900 dark:text-white lg:text-7xl font-bold">
          Loading...
        </h1>
      ) : (
        <section className="pt-32 xl:max-w-7xl xl:mx-auto px-5 xl:px-0 h-screen bg-gray-100 dark:bg-lightdark">
          <Link
            to="/"
            className="bg-blue-500 pt-2 pb-3 pl-4 pr-6 rounded shadow text-white fobt-bold tracking-wide"
          >
            &larr; Back
          </Link>
          {Array.isArray(country)
            ? country.map((country, index) => (
                <article>
                  <div>
                    <img className="pt-10" src={country.flags.png} alt="" />
                  </div>
                  <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mt-10 mb-5">
                    {country.name.common},{" "}
                    <span className="font-light text-2xl lg:text-4xl">
                      {country.capital}
                    </span>
                  </h2>
                  <ul>
                    <li className="text-gray-900 dark:text-white lg:text-lg">
                      Region: {country.region}
                    </li>
                    <li className="text-gray-900 dark:text-white lg:text-lg">
                      Sub region: {country.subregion}
                    </li>
                  </ul>
                </article>
              ))
            : console.log("fetching again")}
        </section>
      )}
    </div>
  );
}

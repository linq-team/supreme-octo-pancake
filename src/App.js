import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const baseUrl = "https://fakerapi.it/api/v1/companies";
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const fields = ["name", "contact", "country", "website"];

  const fetchCompanies = () => {
    setLoading(true);
    fetch(baseUrl)
      .then((response) => response.json())
      .then((response) => {
        setCompanies(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="app">
      <button className="btn refresh" onClick={fetchCompanies}>
        Refresh
      </button>
      {loading && <div className="loader"></div>}
      {!loading && (
        <table>
          <thead>
            {fields.map((field) => (
              <th key={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </th>
            ))}
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr>
                {fields.map((field) => (
                  <td>
                    {field !== "contact"
                      ? company[field]
                      : company[field]["firstname"] +
                        " " +
                        company[field]["lastname"]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;

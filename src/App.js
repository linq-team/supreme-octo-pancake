import React, { useEffect, useState } from 'react';
import './App.css';

const baseURL = "https://fakerapi.it/api/v1/companies";

function App() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = async () => {
    setLoading(true);

    try {
      const response = await fetch(baseURL);
      const json = await response.json();
      setCompanies(json.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const renderCompany = () => {
    return (
      <div>
        <button>Refresh</button>
        <table>
          <thead>
            <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Country</th>
            <th>Website</th>
            </tr>
          </thead>
          <tbody>
            { companies.map( (company) => {
              return (
                <tr key={company.id}>
                  <td>{ company.name }</td>
                  <td>{ company.contact.firstname + " " +  company.contact.lastname }</td>
                  <td>{ company.country }</td>
                  <td><a href={company.website}>{ company.website }</a></td>
                </tr>
              )
            } ) }
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="app">
      {/* Your code starts here */}
      <div>
        { loading ? 'Loading...' : renderCompany()}
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect, useCallback } from 'react'
import './App.css'

function App() {
  const [companies, setCompanies] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleLoadCompanies = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        'https://fakerapi.it/api/v1/companies'
      )
      const companies = await response.json()
      setCompanies(companies.data)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    handleLoadCompanies()
  }, [handleLoadCompanies])

  if (isLoading) return <div>loading....</div>

  return (
    <div className="app">
      <button onClick={handleLoadCompanies}>Refresh</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Country</th>
            <th>website</th>
          </tr>
        </thead>
        {companies?.map((company, index) => (
          <tbody key={index}>
            <tr
              style={{
                backgroundColor: index % 2 ? 'black' : 'gray',
              }}
            >
              <td>{company.name}</td>
              <td>{`${company.contact.firstname} ${company.contact.lastname}`}</td>
              <td>{company.country}</td>
              <td>
                <a href={company.website}>{company.website}</a>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  )
}

export default App

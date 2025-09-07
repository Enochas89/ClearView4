import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [countries, setCountries] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getCountries() {
      const { data, error } = await supabase
        .from('countries')
        .select()

      if (error) {
        setError(error.message)
        setCountries([])
      } else {
        setCountries(data)
        setError(null)
      }
    }

    getCountries()
  }, [])

  return (
    <div>
      <h1>Vite + React + Supabase + Vercel</h1>
      <p>
        This boilerplate fetches a list of countries from a Supabase table to demonstrate the connection.
      </p>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {countries.length > 0 ? (
        <ul>
          {countries.map((country) => (
            <li key={country.id}>{country.name}</li>
          ))}
        </ul>
      ) : (
        !error && <p>Loading countries or table is empty...</p>
      )}
    </div>
  )
}

export default App
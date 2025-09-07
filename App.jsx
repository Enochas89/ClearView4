import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [countries, setCountries] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getCountries() {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase.from('countries').select();
        if (error) throw error;
        setCountries(data || []);
      } catch (err) {
        setCountries([]);
        setError(err.message);
      } finally {
        setLoading(false);
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
      {loading ? (
        <p>Loading countries...</p>
      ) : countries.length > 0 ? (
        <ul>
          {countries.map((country) => (
            <li key={country.id}>{country.name}</li>
          ))}
        </ul>
      ) : (
        !error && <p>Table is empty.</p>
      )}
    </div>
  )
}

export default App
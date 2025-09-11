import { useState } from 'react'
import Navbar from '../components/Navbar'

export default function Home() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setResult({ error: 'Request failed' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '98vh',
        margin: 0,
        background: 'linear-gradient(white, #6D94C5)',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      <Navbar />

      <main
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '2rem',
          textAlign: 'center'
        }}
      >
        <h2>Enter a URL to get a short link</h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginTop: '1rem',
            marginBottom: '1rem'
          }}
        >
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/very/long/url"
            required
            style={{
              padding: '6px 8px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '6px 12px',
              fontSize: '14px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#2563eb',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Shortening...' : 'Shorten'}
          </button>
        </form>

        {result && (
          <div style={{ marginTop: '0.5rem' }}>
            {result.error ? (
              <div style={{ color: 'red' }}>{result.error}</div>
            ) : (
              <div>
                Short URL:{' '}
                <a href={result.shortUrl} target="_blank" rel="noreferrer">
                  {result.shortUrl}
                </a>
                <div style={{ marginTop: '4px' }}>
                  Original:{' '}
                  <a href={result.url} target="_blank" rel="noreferrer">
                    {result.url}
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      <hr style={{ margin: '24px 0' }} />
      <h3>Notes</h3>
      <ul>
        <li>This is a demo with an in-memory store — links disappear when the server restarts.</li>
        <li>For production use a persistent store (Redis / Postgres) and add rate-limiting + validation.</li>
      </ul>

    </div>
  )
}

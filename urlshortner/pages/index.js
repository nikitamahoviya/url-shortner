import { useState } from 'react'
import Navbar from '../components/Navbar'


export default function Home() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const apiBase = typeof window !== 'undefined' ? '' : ''

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
    // <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: 24, maxWidth: 800, margin: '0 auto' }}>
    //   <h1>URL Shortner</h1>
    <div
      style={{
        minHeight: '98vh',
        margin: 0,
        background: 'linear-gradient(white, #6D94C5)', // change to your color
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      <Navbar />

      <main className="p-6 max-w-2xl mx-auto" style={{ textAlign: 'center' }}>
        <p>Enter a URL to get a short link</p>
      </main>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://example.com/very/long/url"
            style={{ flex: 1, padding: 8, fontSize: 16 }}
          />
          <button type="submit" disabled={loading} style={{ padding: '8px 12px' }}>
            {loading ? 'Shortening...' : 'Shorten'}
          </button>
        </form>

        {result && (
          <div style={{ marginTop: 12 }}>
            {result.error ? (
              <div style={{ color: 'red' }}>{result.error}</div>
            ) : (
              <div>
                Short URL: <a href={result.shortUrl} target="_blank" rel="noreferrer">{result.shortUrl}</a>
                <div style={{ marginTop: 6 }}>Original: <a href={result.url} target="_blank" rel="noreferrer">{result.url}</a></div>
              </div>
            )}
          </div>
        )}

        <hr style={{ margin: '24px 0' }} />
        <h3>Notes</h3>
        <ul>
          <li>This is a demo with an in-memory store — links disappear when the server restarts.</li>
          <li>For production use a persistent store (Redis / Postgres) and add rate-limiting + validation.</li>
        </ul>

      
    </div>
  )
}

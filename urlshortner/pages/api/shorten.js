// Simple in-memory store (demo only)
const store = global.__URL_STORE = global.__URL_STORE || {}

function makeId(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let s = ''
  for (let i = 0; i < length; i++) s += chars.charAt(Math.floor(Math.random() * chars.length))
  return s
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { url, customSlug } = req.body || {}
  if (!url || typeof url !== 'string') return res.status(400).json({ error: 'Invalid url' })

  // Basic validation
  try {
    new URL(url)
  } catch (e) {
    return res.status(400).json({ error: 'Invalid URL format' })
  }

  let id;

  if (customSlug) {
    // Check if custom slug already exists
    if (store[customSlug]) {
      return res.status(400).json({ error: 'Custom slug already exists' })
    }
    id = customSlug
  } else {
    // create random short id
    id = makeId()
    while (store[id]) id = makeId()
  }

  store[id] = { url, createdAt: Date.now() }

  const host = req.headers.host
  const protocol = req.headers['x-forwarded-proto'] || (req.headers.referer?.startsWith('https') ? 'https' : 'http')
  const shortUrl = `${protocol || 'http'}://${host}/${id}`

  res.status(200).json({ id, url, shortUrl })
}

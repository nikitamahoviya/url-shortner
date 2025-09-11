"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function CustomURL() {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, customSlug }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Request failed" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      <Navbar />
      <main style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem", textAlign: "center" }}>
        <h2>Create Custom URL</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your long URL"
            required
            style={{ padding: "8px", fontSize: "16px" }}
          />
          <input
            type="text"
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
            placeholder="Enter custom short slug (e.g., mylink)"
            required
            style={{ padding: "8px", fontSize: "16px" }}
          />
          <button type="submit" disabled={loading} style={{ padding: "10px", fontSize: "16px" }}>
            {loading ? "Creating..." : "Create Custom URL"}
          </button>
        </form>

        {result && (
          <div style={{ marginTop: "1rem" }}>
            {result.error ? (
              <div style={{ color: "red" }}>{result.error}</div>
            ) : (
              <div>
                Your Custom URL: <a href={result.shortUrl} target="_blank" rel="noreferrer">{result.shortUrl}</a>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default function Navbar() {
  return (
    <nav style={{ background: "white", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "60px"
      }}>
        {/* Logo */}
        <h1 style={{ fontSize: "20px", fontWeight: "bold", color: "#2563eb" }}>
          URL Shortner
        </h1>

        {/* Nav Links */}
        <div style={{ display: "flex", gap: "24px" }}>
          <a href="/" style={{ color: "#374151", textDecoration: "none" }}>Home</a>
          <a href="/about" style={{ color: "#374151", textDecoration: "none" }}>About</a>
          <a href="/docs" style={{ color: "#374151", textDecoration: "none" }}>Docs</a>
        </div>
      </div>
    </nav>
  )
}

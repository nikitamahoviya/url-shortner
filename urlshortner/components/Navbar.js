
export default function Navbar() {
  return (
    <nav style={{ background: "#E8DFCA", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
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
          <a href="/" className="nav-link">Home</a>
          <a href="https://github.com/nikitamahoviya/url-shortner" className="nav-link:hover">Github</a>
          <a href="https://www.linkedin.com/in/nikita-mahoviya-28034b171/" className="nav-link">LinkedIn</a>        
          </div>
      </div>
    </nav>
  )
}

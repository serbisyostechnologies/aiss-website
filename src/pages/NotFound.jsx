import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
      }}
    >
      <div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>

        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginTop: "2rem",
          }}
        >
          <FaHome />
          Go to Home
        </Link>
      </div>
    </div>
  );
}
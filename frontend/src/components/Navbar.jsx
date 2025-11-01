import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    alert("Logged out");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">MySocialApp</Link>
      </div>
      <div className="nav-right">
        <Link to="/new" className="nav-btn">New Post</Link>
        <Link to="/profile" className="nav-btn">Profile</Link>
        {!token ? (
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/register" className="nav-btn">Sign Up</Link>
          </>
        ) : (
          <button onClick={logout} className="nav-btn">Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

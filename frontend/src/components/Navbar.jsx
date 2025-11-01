import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">MyBlog</Link>
      </div>
      <div className="nav-right">
        <Link to="/new" className="nav-btn">New Post</Link>
        <Link to="/profile" className="nav-btn">Profile</Link>
        <Link to="/login" className="nav-btn">Login / Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;

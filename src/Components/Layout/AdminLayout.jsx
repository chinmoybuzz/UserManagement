import { Link, Outlet } from "react-router";
import Navbar from "./Navbar";
const AdminLayout = () => {
  return (
    <div>
      <Navbar />

      {/* Full-width flex container */}
      <div className="d-flex">
        {/* Sidebar */}
        <div
          className="bg-dark text-white vh-100 p-3"
          style={{ width: "200px", position: "fixed", top: "56px" }} // Adjust top if Navbar is fixed
        >
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/choose" className="nav-link text-white">
                Choose
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/tree" className="nav-link text-white">
                Tree
              </Link>
            </li>
          </ul>
        </div>

        {/* Main content area (shifted right) */}
        <div className="flex-grow-1 p-4" style={{ marginLeft: "200px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

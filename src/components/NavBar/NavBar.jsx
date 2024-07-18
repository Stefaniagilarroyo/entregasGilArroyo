import CardWidget from "./CardWidget/CardWidget"
import logo from '../../assets/imagenes/logo.png';
import { Link } from "react-router-dom";

function NavBar({cartCount}) {
    return (
<nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src={logo}
            width="180"
            height="120"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/category/shampoo">Shampoo</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/category/acondicionador">Acondicionador</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/category/cepillos">Cepillos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/category/velas">Velas</Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <CardWidget cartCount={cartCount} />
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
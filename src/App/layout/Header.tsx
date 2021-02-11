import React from "react";
import { Link } from "react-router-dom";

function Header(props: HeaderProps) {
  return (
    <header className="navbar">
      <nav className="navbar-section">
        <Link to="/" className="text-bold mr-2 text-large">
          TechStacker
        </Link>
        <Link to="/tech" className="mr-2">
          TECH
        </Link>
        <Link to="/tech" className="mr-2">
          STACKS
        </Link>
      </nav>
      <section className="navbar-center">
        <div className="input-group input-inline">
          <input
            className="form-input"
            type="text"
            placeholder="search"
            style={{ width: "300px", maxWidth: "100%" }}
          />
          <button className="btn btn-primary input-group-btn">
            <i className="icon icon-search"></i>
          </button>
        </div>
      </section>
      <section className="navbar-section">
        <Link to="/tech/new" className="btn">
          +Tech
        </Link>
      </section>
    </header>
  );
}

export default React.memo(Header);

export interface HeaderProps {
  //props
}

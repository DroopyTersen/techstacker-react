import { SearchAutocomplete } from "@components/AutoComplete";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header(props: HeaderProps) {
  let navigate = useNavigate();
  return (
    <header className="navbar">
      <nav className="navbar-section">
        <Link to="/" className="text-bold mr-2 text-large">
          TechStacker
        </Link>
      </nav>
      <section className="navbar-center">
        <div className="input-group input-inline">
          <SearchAutocomplete onChange={(techId) => navigate("/tech/" + techId)} />
          {/* <input
            className="form-input"
            type="text"
            placeholder="search"
            style={{ width: "300px", maxWidth: "100%" }}
          /> */}
          <button className="btn btn-primary input-group-btn">
            <i className="icon icon-search"></i>
          </button>
        </div>
      </section>
      <nav className="navbar-section">
        <Link to="/tech" className="ml-2">
          TECH
        </Link>
        <Link to="/stacks" className="ml-2">
          STACKS
        </Link>
        <Link to="/layers" className="ml-2">
          LAYERS
        </Link>
        <Link to="/categories" className="ml-2">
          CATEGORIES
        </Link>
      </nav>
    </header>
  );
}

export default React.memo(Header);

export interface HeaderProps {
  //props
}

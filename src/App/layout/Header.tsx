import { SearchAutocomplete } from "@components/AutoComplete";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header(props: HeaderProps) {
  let navigate = useNavigate();
  return (
    <header className="navbar">
      <div className="navbar-section">
        <Link to="/" className="app-logo text-bold mr-2 text-large">
          <div style={{ display: "flex" }}>
            <img width="50px" className="logo img-fit-contain" src="/images/techstacker-logo.png" />
            <div className="ml-2 logo-text hide-mobile">
              <div>
                <span className="label label-secondary">T</span>
                <span className="label label-secondary">E</span>
                <span className="label label-secondary">C</span>
                <span className="label label-secondary">H</span>
              </div>
              <div>
                <span className="label label-primary">S</span>
                <span className="label label-primary">T</span>
                <span className="label label-primary">A</span>
                <span className="label label-primary">C</span>
                <span className="label label-primary">K</span>
                <span className="label label-primary">E</span>
                <span className="label label-primary">R</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
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

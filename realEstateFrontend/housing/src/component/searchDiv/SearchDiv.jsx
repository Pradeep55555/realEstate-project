

import React from "react";
import "./searchDiv.css";
import { FaMicrophone } from "react-icons/fa6";
import { TbFocus2 } from "react-icons/tb";

function SearchDiv() {
  return (
    <div className="outer">
      <div className="center-container">
        <nav className="menu">
          <span>Buy</span>
          <span>Rent</span>
          <span>New Launch</span>
          <span>PG / Co-living</span>
          <span>Commercial</span>
          <span>Plots/Land</span>
          <span>Projects</span>
        </nav>

        <div className="search-section">
          <input type="text" placeholder='Search "Hyderabad"' />
          <div className="icons">
            <span><TbFocus2 /></span>
            <span><FaMicrophone /></span>
          </div>
          <button>Search</button>
        </div>
      </div>
    </div>
  );
}

export default SearchDiv;

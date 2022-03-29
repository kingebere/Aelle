import React from "react";
import "./Filter.css";
import { Datar } from "../../types/types";

const Filter = function Filter({ query, sortDate }: Datar): JSX.Element {
  return (
    <div className="Select__wrapper">
      <form>
        <div className="Select__container">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="sortCategory" className="sort-label">
            Date Created
          </label>
          <select
            className="select-item"
            value={query}
            aria-label="select"
            onChange={sortDate}
            title="check"
          >
            <option value="asc" data-testid="select-option">
              Ascending
            </option>
            <option value="desc" data-testid="select-option">
              Descending
            </option>
          </select>{" "}
        </div>
      </form>
    </div>
  );
};
export default Filter;

import React from "react";
import "./Filter.css";

type datar = {
  query: string;
  sortDate: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Filter: React.FC<datar> = ({query, sortDate}) => {
  return (
    <div className="Select__wrapper">
      <form>
        <div className="Select__container">
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
            {/* <option value='default'>Default</option> */}
            <option value="asc" data-testid="select-option">
              Ascending
            </option>
            <option value="desc" data-testid="select-option">
              Descending
            </option>
          </select>
        </div>
      </form>
    </div>
  );
};
export default Filter;

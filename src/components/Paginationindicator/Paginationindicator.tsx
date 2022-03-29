import React from "react";
import "./Paginationindicator.css";
import { Fifth } from "../../types/types";

const Paginationindicator = function Paginationindicator({
  paginate,
  count,
}: Fifth): JSX.Element {
  return (
    <div className="page__counter">
      <h2 className="page__counter--1">{paginate}</h2>
      <div>/</div> <h1 className="page__counter--2">{count}</h1>
    </div>
  );
};

export default Paginationindicator;

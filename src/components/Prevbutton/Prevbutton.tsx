import React from "react";
import "./Prevbutton.css";
import { Third } from "../../types/types";

const Prevbutton = function Prevbutton({ page, prevPage }: Third): JSX.Element {
  return (
    <button
      className="buttons button-prev"
      onClick={prevPage}
      disabled={page === 1}
      type="submit"
    >
      prev
    </button>
  );
};

export default Prevbutton;

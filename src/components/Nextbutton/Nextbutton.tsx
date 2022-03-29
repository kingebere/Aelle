import React from "react";
import "./Nextbutton.css";

import { Fourth } from "../../types/types";

const Nextbutton = function Nextbutton({
  page,
  nextPage,

  count,
}: Fourth): JSX.Element {
  return (
    <button
      className="buttons  button-next"
      onClick={nextPage}
      disabled={page === count}
      type="submit"
    >
      next
    </button>
  );
};

export default Nextbutton;

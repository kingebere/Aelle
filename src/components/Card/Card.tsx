import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import { Second } from "../../types/types";

const Card = function Card({ result, names }: Second): JSX.Element {
  return (
    <>
      {" "}
      <div className="page__text__wrapper" key={result.id}>
        {" "}
        <Link to={`/${names}/${result.id}`}>
          {" "}
          {/* No name object for the film resouces , thus i used the OR operator  */}
          <h1 className="page__text">{result.name || result.title}</h1>
        </Link>
        <div className="page__circle">
          <h1>{result.id}</h1>
        </div>
      </div>
    </>
  );
};

export default Card;

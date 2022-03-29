/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

import Spinner from "../../components/spinner/spinner";
import "../page.css";

function People() {
  const [Data, setData] = useState<number[]>([]);

  const { id } = useParams();
  const { isLoading, data } = useQuery("people", () =>
    axios.get(`https://swapi.dev/api/people/${id}`)
  );

  useEffect(() => {
    data?.data.films.forEach((cde: string) => {
      if (
        typeof Number(cde.charAt(28)) === "number" &&
        Number.isNaN(Number(cde.charAt(29)))
      ) {
        setData((prev) => [...prev, Number(`${cde.charAt(28)}`)]);
      } else if (
        typeof Number(cde.charAt(28)) === "number" &&
        typeof Number(cde.charAt(29)) === "number"
      ) {
        setData((prev) => [...prev, Number(cde.charAt(28) + cde.charAt(29))]);
      }
    });
  }, []);
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="section__wrapper">
      <div className="section__container">
        <div className=" section section__one">
          <h1>Name:</h1>
          <div>{data?.data.name}</div>
        </div>
        <div className="section section__two">
          <h1>height:</h1>
          <div>{data?.data.height}</div>
        </div>
        <div className="section section__three">
          <h1>mass:</h1>

          <div>{data?.data.mass}</div>
        </div>
        <div className="section section__four">
          <h1>Gender:</h1>
          <div>{data?.data.gender}</div>
        </div>
        <div className="section section__boxContainer">
          <h1 className="section__box__text">Films:</h1>
          <div className="section__box-1">
            {Data.map((v: number) => (
              <div className="section__box" key={v}>
                <h1>
                  <Link to={`/films/${v}`}>{v}</Link>
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default People;

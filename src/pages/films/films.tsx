/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

import Spinner from "../../components/spinner/spinner";

import "../page.css";

function Films() {
  const [Data, setData] = useState<number[]>([]);
  const { id } = useParams();
  const { isLoading, data } = useQuery("filmss", () =>
    axios.get(`https://swapi.dev/api/films/${id}`)
  );
  /** Extract the numbers from the url and attaching to the Data state */
  useEffect(() => {
    // eslint-disable-next-line consistent-return
    data?.data.characters.forEach((cde: string) => {
      if (
        typeof Number(cde.charAt(29)) === "number" &&
        Number.isNaN(Number(cde.charAt(30)))
      ) {
        return setData((prev) => [...prev, Number(`${cde.charAt(29)}`)]);
      }
      if (
        typeof Number(cde.charAt(29)) === "number" &&
        typeof Number(cde.charAt(30)) === "number"
      ) {
        return setData((prev) => [
          ...prev,
          Number(cde.charAt(29) + cde.charAt(30)),
        ]);
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
          <h1>Title:</h1>
          <div>{data?.data.title}</div>
        </div>
        <div className="section section__two">
          <h1>Director:</h1>
          <div>{data?.data.director}</div>
        </div>
        <div className="section section__three">
          <h1>Producer:</h1>

          <div>{data?.data.producer}</div>
        </div>
        <div className="section section__four">
          <h1>Release Date:</h1>
          <div>{data?.data.release_date}</div>
        </div>
        <div className="section section__boxContainer">
          <h1 className="section__box__text">People:</h1>
          <div className="section__box-1">
            {Data.length !== 0 || Data === undefined ? (
              Data.map((v: number) => (
                <div className="section__box" key={v}>
                  <h1>
                    <Link to={`/people/${v}`}>{v}</Link>
                  </h1>
                </div>
              ))
            ) : (
              <Link to="/">
                <h1 className="section__box__text">
                  Such Empty!, Click to go back home
                </h1>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Films;

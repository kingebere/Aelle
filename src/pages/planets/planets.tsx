import React, {useState, useEffect} from "react";
import axios from "axios";
import {useQuery} from "react-query";
import {Link, useParams} from "react-router-dom";

import Spinner from "../../components/spinner/spinner";
import "../page.css";

const Planets: React.FC<{}> = () => {
  const [Data, setData] = useState<number[]>([]);
  const {id} = useParams();
  const {isLoading, data} = useQuery("planets", () => {
    return axios.get(`https://swapi.dev/api/planets/${id}`);
  });

  useEffect(() => {
    data?.data.residents.forEach((cde: string) => {
      if (
        typeof Number(cde.charAt(29)) === "number" &&
        isNaN(Number(cde.charAt(30)))
      ) {
        setData(prev => [...prev, Number(`${cde.charAt(29)}`)]);
      } else if (
        typeof Number(cde.charAt(29)) === "number" &&
        typeof Number(cde.charAt(30)) === "number"
      ) {
        setData(prev => [...prev, Number(cde.charAt(29) + cde.charAt(30))]);
      }
    });
  }, [data?.data.residents]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="section__container">
      <div className=" section section__one">
        <h1>Name:</h1>
        <div>{data?.data.name}</div>
      </div>
      <div className="section section__two">
        <h1>Diameter:</h1>
        <div>{data?.data.diameter}</div>
      </div>
      <div className="section section__three">
        <h1>Population:</h1>

        <div>{data?.data.population}</div>
      </div>
      <div className="section section__four">
        <h1>Climate:</h1>
        <div>{data?.data.climate}</div>
      </div>
      <div className="section section__boxContainer">
        <h1 className="section__box__text">Residents:</h1>
        <div className="section__box-1">
          {Data.map((v: number) => {
            return (
              <div className="section__box" key={v}>
                <h1>
                  <Link to={`/people/${v}`}>{v}</Link>
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Planets;

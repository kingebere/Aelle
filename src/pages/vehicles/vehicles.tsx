import React, {useState, useEffect} from "react";
import axios from "axios";
import {useQuery} from "react-query";
import {Link, useParams} from "react-router-dom";

import Spinner from "../../components/spinner/spinner";
import "../page.css";

const Vehicles: React.FC<{}> = () => {
  const [Data, setData] = useState<number[]>([]);
  const {id} = useParams();
  const {isLoading, data} = useQuery("vehicles", () => {
    return axios.get(`https://swapi.dev/api/vehicles/${id}`);
  });

  useEffect(() => {
    data?.data.films.forEach((cde: string) => {
      if (
        typeof Number(cde.charAt(28)) === "number" &&
        isNaN(Number(cde.charAt(29)))
      ) {
        setData(prev => [...prev, Number(`${cde.charAt(28)}`)]);
      } else if (
        typeof Number(cde.charAt(28)) === "number" &&
        typeof Number(cde.charAt(29)) === "number"
      ) {
        setData(prev => [...prev, Number(cde.charAt(28) + cde.charAt(29))]);
      }
    });
  }, [data?.data.films]);

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
        <h1>Model:</h1>
        <div>{data?.data.model}</div>
      </div>
      <div className="section section__three">
        <h1>Manufacturer:</h1>

        <div>{data?.data.manufacturer}</div>
      </div>
      <div className="section section__four">
        <h1>Url</h1>
        <div>{data?.data.url}</div>
      </div>
      <div className="section section__boxContainer">
        <h1 className="section__box__text">Films:</h1>
        <div className="section__box-1">
          {Data.map((v: number) => {
            return (
              <div className="section__box" key={v}>
                <h1>
                  <Link to={`/films/${v}`}>{v}</Link>
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Vehicles;

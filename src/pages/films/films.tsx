import React, {useState, useEffect} from "react";
import axios from "axios";
import {useQuery} from "react-query";
import {Link, useParams} from "react-router-dom";

import Spinner from "../../components/spinner/spinner";

import "../page.css";

const Films: React.FC<{}> = () => {
  const [Data, setData] = useState<number[]>([]);
  const {id} = useParams();
  const {isLoading, data} = useQuery("films", () => {
    return axios.get(`https://swapi.dev/api/films/${id}`);
  });
  useEffect(() => {
    data?.data.characters.forEach((cde: string) => {
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
  }, [data?.data.characters]);
  if (isLoading) {
    return <Spinner />;
  }

  return (
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

export default Films;

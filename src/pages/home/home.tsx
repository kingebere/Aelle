import React, {useState, useEffect} from "react";
import axios from "axios";
import {useQuery} from "react-query";
import Resource from "../../components/Resources/Resource";
import Spinner from "../../components/spinner/spinner";
import "./home.css";

// creation of localStorage to store the names of the resources
const getLocalStorage = () => {
  let tagged = localStorage.getItem("tagged");
  if (tagged) {
    return (tagged = JSON.parse(localStorage.getItem("tagged")!));
  }
  return [];
};
const Home: React.FC<{}> = () => {
  const [tagged, setTagged] = useState<string[]>(getLocalStorage());
  useEffect(() => {
    localStorage.setItem("tagged", JSON.stringify(tagged));
  }, [tagged]);

  const {isLoading, data} = useQuery("dope", () => {
    return axios.get("https://swapi.dev/api/");
  });
  if (isLoading) {
    return <Spinner />;
  }

  // This function stores the names in an array both local storages
  const click = (name: string) => {
    setTagged(prev => {
      return [...prev, name];
    });
  };
  // This function removes the names in an array both local storages

  const remove = (name: string) => {
    setTagged(tagged.filter(x => x !== name));
  };

  return (
    <div className="home">
      <h1 className="home__text">Star Wars</h1>
      {Object.keys(data?.data).map((name: string) => {
        return (
          <Resource
            name={name}
            click={click}
            remove={remove}
            tagged={tagged}
            key={name}
          />
        );
      })}
    </div>
  );
};

export default Home;

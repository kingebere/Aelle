import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";

import Filter from "../../components/Filter/Filter";
import Spinner from "../../components/spinner/spinner";
import "../page.css";
import Card from "../../components/Card/Card";
import Nextbutton from "../../components/Nextbutton/Nextbutton";
import Prevbutton from "../../components/Prevbutton/Prevbutton";
import Paginationindicator from "../../components/Paginationindicator/Paginationindicator";

function PeoplePage() {
  const [Datar, setDatar] = useState<
    {
      url: string;
      created: string;
      id: number;
      name: string;
      title: string;
    }[]
  >([]);
  const [names] = useState<string>("people");
  // state for the filter state
  const [query, setQuery] = useState<string>("asc");
  // state for the page indicator
  const [paginate, setPaginate] = useState<number>(1);

  const fetchData = (pages: number) =>
    axios.get(`https://swapi.dev/api/people/?page=${pages}`);
  const [page, setPage] = useState<number>(1);
  const { isLoading, data, isFetching } = useQuery(
    ["peoplepage", page],
    () => fetchData(page),
    {
      keepPreviousData: true,
    }
  );

  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    setCount(Math.ceil(data?.data.count / 10));
  }, [data?.data.count]);
  // This algorithm steemed out the lack of the id value in the array .Thus , making it
  // diffcult to route properly. I decided to extract the
  // id from the url value, which contains a suitable option to use as id
  // This algorithm identifies the number and attaches it
  // into a newly created id .Thus making routing easy:)

  useEffect(() => {
    setDatar(data?.data.results);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    data?.data.results &&
      setDatar(
        (prev) =>
          prev &&
          Object.values(prev).map((item) =>
            typeof Number(item.url[29]) === "number" &&
            Number.isNaN(Number(item.url[30]))
              ? { ...item, id: Number(`${item.url[29]}`) }
              : { ...item, id: Number(item.url[29] + item.url[30]) }
          )
      );
  }, [data?.data.results]);

  // function for incrementing to the next page ,it also
  // increments the page indicator .It also sets the state of the filter

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPages = oldPage + 1;
      if (nextPages > count || nextPages === count) {
        nextPages = count;
      }
      return nextPages;
    });

    setPaginate(paginate + 1);
    setQuery("asc");
  };
  // function for decrementing to the prev page ,it
  // also decrements the page indicator .It also sets the state of the filter
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPages = oldPage - 1;
      if (prevPages < 1 || prevPages === 1) {
        prevPages = 1;
      }
      return prevPages;
    });
    setPaginate(paginate - 1);
    setQuery("asc");
  };

  // function for the filter by data created functionality
  // eslint-disable-next-line consistent-return
  const sortDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery(e.target.value);
    if (Datar) {
      if (query === "asc") {
        setDatar([...Datar].sort((a, b) => b.created.localeCompare(a.created)));
      } else if (query === "desc") {
        setDatar([...Datar].sort((a, b) => a.created.localeCompare(b.created)));
      }
    } else {
      return null;
    }
  };
  // conditional loading
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="page">
      <div className="page__1">
        <h1 className="page__1__text">People</h1>
        <div>
          <Filter query={query} sortDate={sortDate} />
        </div>
        <div className="page__container">
          {Datar &&
            Datar.map((result) => <Card result={result} names={names} />)}
        </div>
        <div className="page__clicks">
          <Prevbutton prevPage={prevPage} page={page} />
          <Paginationindicator paginate={paginate} count={count} />
          <Nextbutton count={count} page={page} nextPage={nextPage} />

          {/* conditional loading for the page changes */}
          <div className="page__fetch">{isFetching && "loading..."}</div>
        </div>
      </div>
    </div>
  );
}

export default PeoplePage;

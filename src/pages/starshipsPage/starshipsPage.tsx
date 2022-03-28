import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import Filter from '../../components/Filter/Filter';
import Spinner from '../../components/spinner/spinner';
import Card from '../../components/Card/Card';

import '../page.css';

const StarshipsPage: React.FC<{}> = () => {
  const [page, setPage] = useState(1);

  const [datar, setDatar] = useState<
    {
      url: string;
      created: string;
      id: number;
      name: string;
      title: string;
    }[]
  >([]);
  const [names] = useState<string>('startships');
  // state for the filter state
  const [query, setQuery] = useState<string>('asc');
  // state for the page indicator
  const [paginate, setPaginate] = useState<number>(1);

  const fetchData = (page: number) => {
    return axios.get(`https://swapi.dev/api/starships/?page=${page}`);
  };
  const { isLoading, data, isFetching } = useQuery(
    ['starships', page, paginate],
    () => fetchData(page),
    {
      keepPreviousData: true,
    }
  );

  // This algorithm steemed out the lack of the id value in the array .Thus , making it
  // diffcult to route properly. I decided to extract the id from the url value, which contains a suitable option to use as id
  // This algorithm identifies the number and attaches it into a newly created id .Thus making routing easy:)

  useEffect(() => {
    setDatar(data?.data.results);
    data?.data.results &&
      setDatar((prev) => {
        return (
          prev &&
          Object.values(prev).map((item, i, data) =>
            typeof Number(item.url[32]) === 'number' &&
            isNaN(Number(item.url[33]))
              ? { ...item, id: Number(`${item.url[32]}`) }
              : { ...item, id: Number(item.url[32] + item.url[33]) }
          )
        );
      });
  }, [data?.data.results]);

  // function for incrementing to the next page ,it also increments the page indicator .It also sets the state of the filter

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (
        nextPage > Math.ceil(data?.data.count / 10) ||
        nextPage === Math.ceil(data?.data.count / 10)
      ) {
        nextPage = Math.ceil(data?.data.count / 10);
      }
      return nextPage;
    });
    setPaginate(paginate + 1);
    setQuery('asc');
  };
  // function for decrementing to the prev page ,it also decrements the page indicator .It also sets the state of the filter

  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 1 || prevPage === 1) {
        prevPage = 1;
      }
      return prevPage;
    });
    setPaginate(paginate - 1);
    setQuery('asc');
  };

  // function for the filter by data created functionality

  const sortDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery(e.target.value);
    if (datar) {
      if (query === 'asc') {
        setDatar([...datar].sort((a, b) => b.created.localeCompare(a.created)));
      } else if (query === 'desc') {
        setDatar([...datar].sort((a, b) => a.created.localeCompare(b.created)));
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
    <div className='page'>
      <div className='page__1'>
        <h1 className='page__1__text'>Starships</h1>
        <div>
          <Filter query={query} sortDate={sortDate} />
        </div>
        <div className='page__container'>
          {datar &&
            datar.map((result) => {
              return <Card result={result} names={names} />;
            })}
        </div>
        <div className='page__clicks'>
          <button
            className='buttons button-prev'
            onClick={prevPage}
            disabled={page === 1}
          >
            prev
          </button>{' '}
          <div className='page__counter'>
            <h2 className='page__counter--1'>{paginate}</h2>
            <div>/</div>{' '}
            <h1 className='page__counter--2'>
              {Math.ceil(data?.data.count / 10)}
            </h1>
          </div>
          <button
            className='buttons button-next'
            onClick={nextPage}
            disabled={page === Math.ceil(data?.data.count / 10)}
          >
            next
          </button>
          {/* conditional loading for the page changes */}
          <div className='page__fetch'>{isFetching && 'loading...'}</div>
        </div>
      </div>
    </div>
  );
};

export default StarshipsPage;

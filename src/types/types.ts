export type First = {
  name: string;
  tagged: string[];
  remove: (name: string) => void;
  click: (name: string) => void;
};
export type Datar = {
  query: string;
  sortDate: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export type Third = {
  page: number;
  prevPage: () => void;
};
export type Fourth = {
  page: number;
  nextPage: () => void;
  count: number;
};
export type Fifth = {
  paginate: number;

  count: number;
};

export type Second = {
  result: {
    url: string;
    created: string;
    id: number;
    name: string;
    title: string;
  };
  names: string | undefined;
};

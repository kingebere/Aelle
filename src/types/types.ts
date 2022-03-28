export type First = {
  name: string;
  tagged: string[];
  remove: (name: string) => void;
  click: (name: string) => void;
};

export type Second = {
  result: {
    url: string;
    created: string;
    id: number;
    name: string;
    title: string;
  };
  names: string;
};

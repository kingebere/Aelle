import React from "react";
import { Link } from "react-router-dom";
import "./Resource.css";
import filled from "../../assets/images/heart-filled.png";
import empty from "../../assets/images/heart-empty.png";
import { First } from "../../types/types";

const Resource = function Resource({
  click,
  name,
  remove,
  tagged,
}: First): JSX.Element {
  return (
    <div className="Resource">
      <div>
        <Link to={`/${name}`}>
          <h2 className="Resources__text" key={name}>
            {name}
          </h2>
        </Link>
      </div>

      {/* if the name is in localstorage , we display the filled heart , else the empty heart */}
      {!tagged.includes(name) ? (
        <button
          className="heart-icons"
          onClick={() => click(name)}
          type="submit"
        >
          <img src={empty} alt="empty heart icon" />
        </button>
      ) : (
        <button
          className="heart-icons"
          onClick={() => remove(name)}
          type="submit"
        >
          <img src={filled} alt="filled heart icon" />
        </button>
      )}
    </div>
  );
};

export default Resource;

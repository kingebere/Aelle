import React from "react";

import {Link} from "react-router-dom";

import "./Resource.css";
import filled from "../../assets/images/heart-filled.png";
import empty from "../../assets/images/heart-empty.png";
import {First} from "../../types/types";

const Resource: React.FC<First> = ({name, click, remove, tagged}) => {
  return (
    <div className="Resource">
      <div>
        <Link to={`/${name}`}>
          <h2 className="Resources__text" key={name}>
            {name}
          </h2>
        </Link>
      </div>

      {/* it the name is in second localstorage , we display the filled heart , else the empty heart */}
      {!tagged.includes(name) ? (
        <div className="heart-icons" onClick={() => click(name)}>
          <img src={empty} alt="empty heart icon" />
        </div>
      ) : (
        <div className="heart-icons" onClick={() => remove(name)}>
          <img src={filled} alt="filled heart icon" />
        </div>
      )}
    </div>
  );
};

export default Resource;

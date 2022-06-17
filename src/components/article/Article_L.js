import React from "react";
import "./article.css";
import img from "../../img/Rectangle 5.png";

function ArticleL(props) {
  return (
    <div className="container">
      <div className="left_item">
        <img src={img} className="photo" />
      </div>
      <div className="right_item">
        <h4>{props.titre}</h4>
        <p className="right_item_text">{props.para}</p>
      </div>
    </div>
  );
}

export default ArticleL;

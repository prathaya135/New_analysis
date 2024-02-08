import React from "react";

export default function card(props) {
  let { title, Description, imageUrl, url, author, time, source } = props;
  let a = time;
  let d = new Date(a);
  return (
    <div>
      <div className="my-3">
        <div className="card">
          <span
            className="badge rounded-pill bg-danger"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            {source}
            <span className="visually-hidden">unread messages</span>
          </span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{Description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author ? author : "Unknown"} on {d.toString()}
              </small>
            </p>
            <a href={url} target="_blank" className="btn btn-sm btn-dark">
              View news
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

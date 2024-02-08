import React from 'react'
import Card from './card'
export default function business(props) {
  return (
    <div className="container my-3">
        <h1 className="my-3 text-center" >News Headlines on {props.category}</h1>
        <div className="row my-3">
          {props.article === null ? (
            <p>Loading...</p>
          ) : (
            props.article.map((element) => {
              if (element.urlToImage != null) {
                return (
                  <div className="col-sm-4" key={element.url}>
                    <Card
                      url={element.url}
                      title={element.title}
                      Description={element.description}
                      imageUrl={element.urlToImage}
                      author={element.author}
                      time={element.publishedAt}
                      source={element.source.name}
                    ></Card>
                  </div>
                );
              }
              return null;
            })
          )}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={props.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={props.prevclick}
          >
            {" "}
            &larr; Previos
          </button>
          <button
            disabled={Math.round(props.total/5) === props.page}
            type="button"
            className="btn btn-dark"
            onClick={props.nextclick}
            id="myBtn"
          >
            Next &rarr;
          </button>
        </div>
      </div>
  )
}

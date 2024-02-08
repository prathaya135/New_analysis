import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import "./App.css";
import Loaddata from "./components/loaddata";
import Placeholder from "./components/placeholder";
function App() {
  const [article, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [total, settotal] = useState(0);
  const [value, setvalue] = useState("general");
  const [loading, setloading] = useState(true);
  const [apiKey,setapikey]=useState(process.env.REACT_APP_NEWS_API);
  // setapikey(process.env.REACT_APP_NEWS_API);
  function sleep(time) { 
    return new Promise((resolve) => setTimeout(resolve, time)); 
  } 
  useEffect(() => {
    async function fetchData() {
      try {
        // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${value}&apiKey=d3286bfa2c0e4e22a9d701b7e2add758&page=1&pagesize=5`;
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${value}&apiKey=${apiKey}&page=1&pagesize=5`;
        setloading(true);
        // await sleep(3000);
        let data = await fetch(url);
        let parsedata = await data.json();
        settotal(parsedata.totalResults)
        setArticles(parsedata.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      finally{
        setloading(false);
      }
    }
    fetchData();
  }, [value]);

  async function prevclick() {
    try {
      // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${value}&apiKey=d3286bfa2c0e4e22a9d701b7e2add758&page=${
      //   page - 1
      // }&pagesize=5`;
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${value}&apiKey=${apiKey}&page=${
        page - 1
      }&pagesize=5`;
      setloading(true);
      let data = await fetch(url);
      let parsedata = await data.json();
      setPage(page - 1);
      setArticles(parsedata.articles);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    finally{
      setloading(false);
    }
  }
  async function nextclick() {
    try {
      // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${value}&apiKey=d3286bfa2c0e4e22a9d701b7e2add758&page=${
      //   page + 1
      // }&pagesize=5`;
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${value}&apiKey=${apiKey}&page=${
        page + 1
      }&pagesize=5`;
      setloading(true);
      let data = await fetch(url);
      let parsedata = await data.json();
      setArticles(parsedata.articles);
      setPage(page + 1);
      if (parsedata.Results / 5 === page) {
        document.getElementById("myBtn").disabled = true;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    finally{
      setloading(false);
    }
  }
  function func_value() {
    let r = document.getElementById("business");
    r = r.textContent;
    setvalue(r);
  }
  function func_value1() {
    let r = document.getElementById("sports");
    r = r.textContent;
    setvalue(r);
  }
  function func_value2() {
    let r = document.getElementById("health");
    r = r.textContent;
    setvalue(r);
  }

  return (
    <Router>
      <div>
      <div className="sticky-top">
        <nav className="bg-dark border-bottom border-body" data-bs-theme="dark">
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                News Analysis
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink
                      to="/business"
                      onClick={func_value}
                      className="nav-link"
                      id="business"
                    >
                      Business
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/sports"
                      onClick={func_value1}
                      className="nav-link"
                      id="sports"
                    >
                      Sports
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/health"
                      onClick={func_value2}
                      className="nav-link"
                      id="health"
                    >
                      Health
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </nav>
        </div>
        {/* <Placeholder></Placeholder> */}
        {/* {<Placeholder></Placeholder> && loading} */}
        {loading?(<Placeholder></Placeholder>):(
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Loaddata
                category="General Category"
                article={article}
                prevclick={prevclick}
                nextclick={nextclick}
                page={page}
                total={total}
              />
            }
          ></Route>
          <Route
            exact
            path="/business"
            element={
              <Loaddata
                category="Bussiness"
                article={article}
                prevclick={prevclick}
                nextclick={nextclick}
                page={page}
                total={total}
              />
            }
          ></Route>
          <Route
            exact
            path="/sports"
            element={
              <Loaddata
                category="Sports"
                article={article}
                prevclick={prevclick}
                nextclick={nextclick}
                page={page}
                total={total}
              />
            }
          ></Route>
          <Route
            exact
            path="/health"
            element={
              <Loaddata
                category="Health"
                article={article}
                prevclick={prevclick}
                nextclick={nextclick}
                page={page}
                total={total}
              />
            }
          ></Route>
        </Routes>
      )}
      </div>
    </Router>
  );
}

export default App;

import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import * as cheerio from "cheerio";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   async function performScraping() {
  //     // downloading the target web page
  //     // by performing an HTTP GET request in Axios
  //     // const axiosResponse = await axios.request({
  //     //   method: "GET",
  //     //   url: "https://abqm.com.br/",
  //     // });
  //     // const axiosResponse = await axios.get(
  //     //   "https://cheerio.js.org/docs/intro"
  //     // );
  //     const axiosResponse = await axios.get(
  //       "https://legacy.reactjs.org/docs/getting-started.html"
  //     );

  //     // parsing the HTML source of the target web page with Cheerio
  //     const $ = cheerio.load(axiosResponse.data);
  //     let objs = [];

  //     // scraping the "Learn how web data is used in your market" section
  //     $("nav")
  //       .find("div")
  //       .each((index, element) => {
  //         // const divNav = element;
  //         const button = element.children[0];
  //         const ul = element.children[1];

  //         if (button.children) {
  //           // console.log("ul", ul);

  //           const listLi = [];

  //           $(ul.children).each((index, item) => {
  //             $(item)
  //               .find("li a")
  //               .each((index, itemte) => {
  //                 // console.log("itemte", itemte.children[0].data);
  //                 listLi.push(itemte.children[0].data);
  //               });
  //           });

  //           const title = button.children[0].children[0].data;

  //           const obj = {
  //             title,
  //             subtitles: listLi,
  //           };

  //           objs.push(obj);
  //         }
  //       });

  //     console.log("objs ::", objs);
  //   }

  //   performScraping();
  // }, []);

  console.log("");

  useEffect(() => {
    async function performScraping() {
      // downloading the target web page
      // by performing an HTTP GET request in Axios
      // const axiosResponse = await axios.request({
      //   method: "GET",
      //   url: "https://abqm.com.br/",
      // });
      // const axiosResponse = await axios.get(
      //   "https://cheerio.js.org/docs/intro"
      // );
      const axiosResponse = await axios.get("https://abqm.com.br/", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      });

      // parsing the HTML source of the target web page with Cheerio
      const $ = cheerio.load(axiosResponse.data);
      let objs = [];

      // scraping the "Learn how web data is used in your market" section
      $("nav")
        .find("div")
        .each((index, element) => {
          // const divNav = element;
          const button = element.children[0];
          const ul = element.children[1];

          if (button.children) {
            // console.log("ul", ul);

            const listLi = [];

            $(ul.children).each((index, item) => {
              $(item)
                .find("li a")
                .each((index, itemte) => {
                  // console.log("itemte", itemte.children[0].data);
                  listLi.push(itemte.children[0].data);
                });
            });

            const title = button.children[0].children[0].data;

            const obj = {
              title,
              subtitles: listLi,
            };

            objs.push(obj);
          }
        });

      console.log("objs ::", objs);
    }

    performScraping();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

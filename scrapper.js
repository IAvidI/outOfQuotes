// import axios from "axios";
import fetch from "node-fetch";
import * as fs from "fs";

import cheerio from "cheerio";

const URL = "https://openlibrary.org/works/OL5210017W";

// const URL = "https://openlibrary.org/works/OL5210017W/My_memoirs_1878-1918";

// axios(URL)
//   .then((res) => {
//     console.log(res.data);
//     // fs.writeFile("index.html", res.data, () => {
//     //   console.log("wrote to html");
//     // });
//   })
//   .catch((err) => console.log(err));

fetch(URL)
  .then((res) => res.text())
  .then((html) => {
    const $ = cheerio.load(html);

    let bookURL = $(".cta-section");

    let firstElem = $(".cta-section a[href]").get()[4];
    console.log($(firstElem).attr("href"));
  })
  .catch((err) => console.log(err));

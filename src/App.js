import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [bookTitles, setBookTitles] = useState([]);
  const [bookURL, setBookURL] = useState("");
  const [bookText, setBookText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  var openLib = "https://openlibrary.org";

  // var bookTitles = [];

  const handleClick = async () => {
    setIsLoading(true);

    function randomNumberInRange(min, max) {
      // get number between min (inclusive) and max (inclusive)
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var num = randomNumberInRange(1, 100);

    // console.log(num);

    var api1 =
      "https://openlibrary.org/search.json?q=subject%3AAccessible+book&mode=ebooks&sort=random_";

    var api2 =
      "&language=eng&subject_facet=Accessible+book&public_scan_b=true&has_fulltext=true";

    var api = api1 + num.toString() + api2;

    // console.log(api);

    try {
      const response = await fetch(api, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      // console.log("result is: ", JSON.stringify(result.docs[0], null, 4));
      // console.log();
      setBookTitles((oldArray) => [...oldArray, result.docs[0].title]);
      setBookTitles((oldArray) => [...oldArray, result.docs[1].title]);
      setBookTitles((oldArray) => [...oldArray, result.docs[2].title]);
      setBookTitles((oldArray) => [...oldArray, result.docs[3].title]);
      setBookTitles((oldArray) => [...oldArray, result.docs[4].title]);

      // setBookTitles(result.docs[0].title);

      var bURL = result.docs[0].key;
      setBookURL(result.docs[0].key);
    } catch (err) {
      setErr(err.message);
    } finally {
      var URL = openLib + bURL;

      // console.log(URL);

      var fullText = "";

      axios.get("http://localhost:3001/scraper").then((res) => {
        console.log("res", res);
        fullText = res.data;
      });

      // https://ia802503.us.archive.org/23/items/mymemoirs187819100will/mymemoirs187819100will_djvu.txt
      // https://archive.org/download/mymemoirs187819100will/mymemoirs187819100will_djvu.txt

      fetch(
        "https://archive.org/download/mymemoirs187819100will/mymemoirs187819100will_djvu.txt"
      )
        .then((res) => {
          res.text();
        })
        .then((data) => {
          console.log("data", data);
        })
        .catch((err) => {
          console.log(err);
        });

      fetch(
        "https://ia802503.us.archive.org/23/items/mymemoirs187819100will/mymemoirs187819100will_djvu.txt"
      )
        .then((response) => response.text())
        .then((data) => {
          // Do something with your data

          // data = data.replace(/(?:\r\n|\r|\n)/g, "<br/>");

          var fields = data.split(". ");
          // console.log(fields.length);

          var paragraph = randomNumberInRange(10, fields.length - 10);

          var para =
            fields[paragraph - 2] +
            ". " +
            fields[paragraph - 1] +
            ". " +
            fields[paragraph] +
            ". " +
            fields[paragraph + 1] +
            ". " +
            fields[paragraph + 2] +
            ".";

          setBookText(para);

          // var fields = data.split(".\n");

          // console.log(fields.length);
          // var paragraph = randomNumberInRange(10, fields.length - 10);

          // setBookText(fields[paragraph]);
        });

      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/scraper")
  //     .then((res) => console.log("res", res));
  // }, []);

  // console.log(book.description);

  return (
    <div>
      {err && <h2>{err}</h2>}
      <button onClick={handleClick}>Fetch data</button>
      {isLoading && <h2>Loading...</h2>}

      <h4>{bookTitles[0]}</h4>
      <h4>{bookURL}</h4>
      <div className="display-linebreak">{bookText}</div>
      <br />
      <h2>{bookTitles[0]}</h2>
      <h2>{bookTitles[1]}</h2>
      <h2>{bookTitles[2]}</h2>
      <h2>{bookTitles[3]}</h2>
      <h2>{bookTitles[4]}</h2>
    </div>
  );
}

export default App;

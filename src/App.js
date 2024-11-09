import React, { useState } from 'react';
import axios from 'axios';

import Search from './components/search';
import Results from './components/Results';
import Popup from './components/Popup';
import Error from './components/error';

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {},
    error: ""
  });

  const apiurl = "http://www.omdbapi.com/?apikey=a2fc1974";

  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        if (data.Response === "True") {
          setState(prevState => ({
            ...prevState,
            results: data.Search,
            error: ""
          }));
        } else {
          setState(prevState => ({
            ...prevState,
            results: [],
            error: "No movies found with that title. Please try again."
          }));
        }
      }).catch((error) => {
        console.error("Error fetching data:", error);
        setState(prevState => ({
          ...prevState,
          results: [],
          error: "An error occurred. Please try again later."
        }));
      });
    }
  };

  const handleInput = (e) => {
    let s = e.target.value;
    setState(prevState => ({ ...prevState, s: s }));
  };

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      setState(prevState => ({ ...prevState, selected: data }));
    });
  };

  const closePopup = () => {
    setState(prevState => ({ ...prevState, selected: {} }));
  };

  return (
    <div className="App">
      <header>
        <h1>CineScope</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />

        {state.error && <Error message={state.error} />}

        <Results results={state.results} openPopup={openPopup} />

        {state.selected.Title && <Popup selected={state.selected} closePopup={closePopup} />}
      </main>
    </div>
  );
}

export default App;

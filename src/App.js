import Search from "./components/search";


function App() {
  const apiurl = " http://www.omdbapi.com/?i=tt3896198&apikey=a2fc1974"
  return (
    <div className="App">
      <header>
        <h1>Movie</h1>
      </header>
      <main>
        <Search />
      </main>
    </div>
  );
}

export default App;

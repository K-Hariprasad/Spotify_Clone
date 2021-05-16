import './App.css';
import Home from './components/Home';
import Login from "./components/Login";

const code = new URLSearchParams(window.location.search).get('code')

function App() {
  return (
    <div className="App">
      {code?<Home code = {code}/>:<Login/>}
    </div>
  );
}

export default App;

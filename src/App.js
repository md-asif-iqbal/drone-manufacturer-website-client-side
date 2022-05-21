import logo from './logo.svg';
import './App.css';
import Banner from './Pages/Home/Banner/Banner';
import Home from './Pages/Home/Home/Home';
import NavBar from './Pages/Shared/NavBar/NavBar';



function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Home></Home>
     
    </div>
  );
}

export default App;

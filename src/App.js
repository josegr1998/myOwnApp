import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //routes is new switch
import Auth from "./pages/Auth";
//element = {<Home/>}

const App = () => {
  return (
    <main>
      <Router>
        <Nav />
        <Routes>
          <Route path='/' exact element={<HomePage />}></Route>
          <Route path='/auth' exact element={<Auth />}></Route>
        </Routes>
      </Router>
    </main>
  );
};

export default App;

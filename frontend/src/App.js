import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Home/home';
import WorkMode from './Work/Work';
import ParentMode from './Parent/Parent';
import Login from './Login/Login';

function App() {
  return (
    <div>
      <Router>
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/work' element={<WorkMode />}/>
        <Route exact path='/parent' element={<ParentMode />}/>
        <Route exact path='/login' element={<Login />}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;

import { Route, Routes } from 'react-router-dom';
import './App.css';




import MainPage from './pages/MainPage'
import Quill from './pages/Quill';
import { useState } from 'react';



function App() {
  const [response, setResponse] = useState({})
  
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<MainPage setResponse={setResponse} ></MainPage>} ></Route>
      <Route path='/quill/:id' element={<Quill response={response}></Quill>} ></Route>
      </Routes>
    </div>
  );
}

export default App;

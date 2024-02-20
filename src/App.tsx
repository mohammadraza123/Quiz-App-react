import Menu from './Components/Menu/Menu'
import './App.css'
// import Htmlquiz from "./Components/Htmlquiz/quiz";
import CssQuiz from './Components/Cssquiz/quiz';
import {Routes, Route} from 'react-router-dom'
import Htmlquiz from './Components/Htmlquiz/quiz';
import JavaScript from './Components/Javaquiz/quiz';


export default function App(){
  return(
    <>
      <Routes>
        <Route path='/' element = {<Menu/>} />
        <Route path="/html" element={<Htmlquiz/>} />
        <Route path="/css" element={<CssQuiz/>} />
        <Route path='/javascript' element = {<JavaScript/>} />
      </Routes>
   
    </>
  )
}
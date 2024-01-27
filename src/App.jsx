import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import InputData from "./components/InputData"
import Table from "./components/Table"
import './App.css'
import { useState } from "react"

function App() {
  const [input, setInput] = useState('');

  return (
    <div className="main-wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<InputData input={input} setInput={setInput} />} />
          <Route path="/table" element={<Table input={input} setInput={setInput} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

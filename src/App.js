
import './App.css';
import { DataProvider } from './Context/DataProvider';
import QuizHome from './Pages/Quiz/QuizHome';
import ResultPage from './Pages/ResultPage/ResultPage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Routes>
          <Route path='quiz' element={<QuizHome />} />
          <Route path='result' element={<ResultPage />} />
        </Routes>
      </DataProvider>
    </BrowserRouter>

  );
}

export default App;

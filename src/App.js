
import './App.css';
import { DataProvider } from './Context/DataProvider';
import QuizHome from './Pages/Quiz/QuizHome';

function App() {
  return (
    <DataProvider>
      <QuizHome />
    </DataProvider>
  );
}

export default App;

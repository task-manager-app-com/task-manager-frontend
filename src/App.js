import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ViewTask from './pages/view';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ViewTask />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
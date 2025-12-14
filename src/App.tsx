import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './screens/Home/Home';
import { Lesson } from './screens/Lesson/Lesson';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Lesson />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './screens/Home/Home';
import { Lesson } from './screens/Lesson/Lesson';
import { Test } from './screens/Test/Test';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Lesson />} />
        <Route path="/:id/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };

import { Detail } from "./pages/Detail";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom"; // Import necessary React Router components
import { ResultSearch } from "./pages/ResultSearch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="/search" element={<ResultSearch />} />
    </Routes>
  );
}

export default App;

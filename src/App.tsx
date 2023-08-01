import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Layout } from "containers";
import { Home, Plugins, Notfound } from "pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/plugins/:tabId" element={<Plugins />} />
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

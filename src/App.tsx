import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home';
import { Edit } from './pages/Edit';
import { Details } from './pages/Details';
import { useLiveQuery } from "dexie-react-hooks";
import { contacts } from './db';
import { Index } from './pages/Index';


function App() {
  const allItems = useLiveQuery(() => contacts.toArray(), []);
  console.log("🚀 ~ file: App.tsx:20 ~ App ~ allItems:", allItems)

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Edit />} path="/edit/:id?" />
          <Route element={<Details />} path="/details/:id?" />
        </Routes>
      </BrowserRouter>

    </div>
  );
}


export default App;

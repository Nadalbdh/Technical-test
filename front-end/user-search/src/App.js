import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import UserForm from "./components/UserForm";
import { UserProvider } from './context/UserContext';


function App() {
  return (
    <UserProvider>
      <Router>
        <div className="flex flex-col h-screen">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/users/:id" element={<UserDetails />} />
              <Route path="/edit/:id" element={<UserForm />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

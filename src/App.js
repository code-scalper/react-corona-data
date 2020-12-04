import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Contents from "./components/Contents";

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Contents />
      <Footer />
    </div>
  );
}

export default App;

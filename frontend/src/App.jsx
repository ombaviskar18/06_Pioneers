import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";
import AudioLoop from "./components/AudioLoop";
import DetectFraud from "./components/Detect";

const App = () => {
  return (
    <Router> 
      <main className="text-sm text-neutral-300 antialiased ">
        <AudioLoop/>
        <Navbar />
        <Routes>
          <Route path= '/' element={<Homepage/>} /> 
          <Route path='/detect' element={<DetectFraud />} />
        </Routes>
        <Footer/>
      </main>
    </Router>
  );
}

export default App;

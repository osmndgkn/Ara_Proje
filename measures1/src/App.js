
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
   <div>
    <Header></Header>
    <Navbar></Navbar>
    <div className='align-items-end'><Footer /></div>
    </div>
  );
}

export default App;

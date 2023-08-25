
import './App.css';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
      <Header/>
      
      <div className='appContainer'>
      <Sidebar/>
      <Main/>
      </div>
      <Footer/>
      </>
    
  );
}

export default App;

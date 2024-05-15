import logo from './assets/images/logo.svg';
import './assets/css/App.css';
import Componente from './components/Componente';
import SeccionPruebas from './components/SeccionPruebas';
import Posts from './components/Posts';
import Header from './components/Header';


function App() {
  var usuario="Fede"
  return (
    <div className="App">
      

      <header className="App-header">

        <Header/>
        
      </header>
    </div>
  );
}

export default App;

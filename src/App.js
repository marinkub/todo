import { Component } from 'react';
import './App.css';
import Login from './component/Login';
import store from './stores/store';
import Home from './pages/Home';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Home store={store}/>
      </div>
    )
  }
}

export default App;

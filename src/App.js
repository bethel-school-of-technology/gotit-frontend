import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from "./Form";
import Dropdown from './dropdownmenu/Dropdown';
ReactDOM.render(displayDropdown, document.getElementById('root'));

class App extends Component {
  render(){
    return (
      <div className="App">
      <Form />
      </div>
    )
  }
}
var displayDropdown = (
  <div style={{display: 'flex', justifyContent: 'center'}} >
    <Dropdown />
  </div>
  );

ReactDOM.render(displayDropdown, document.getElementById('root'))


export default App;



import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent';
import CharComponent from './CharComponent';

class App extends Component {
  constructor(props){
    super(props);
    this.state = ({
      value: '',
      length: ''
    })
  }

  changeHandler = (event) => {
    let value = event.target.value
    this.setState({
      value: value,
      length: value.length
    })
  }

  removeHandler = (position) => {
    let final = this.state.value.split('');
    final.splice(position,1)
    this.setState({value : final.join(''),length:final.join('').length});
}


  render() {
    return (
      <div className="App">
        <input type='text' id='input' value={this.state.value} onChange={this.changeHandler} /> 
        <ValidationComponent str = {this.state.length}/>    
        <CharComponent  word = {this.state.value}  removeHandler={this.removeHandler}/> 
      </div>
    );
  }
}

export default App;

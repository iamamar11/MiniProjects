import React, {Component} from 'react';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      // country : 'Afghanistan',
      city : 'Herat',
      optionJSX : [],
      cityOptionsJSX : [],
      temp : ''
    }
  }

  handleSelectChangeCountry = (event) => {
    const country = event.target.value;
    this.setState({
      country: event.target.value,
    })
    return this.fetchCities(country).then(console.log("change the options"));
  }


  fetchCountries = async() =>{
    const API_URL = 'http://localhost:3001/countries';
    const response = await fetch(API_URL, {method : 'GET'});
    const responseJson = await response.json();
    const optionKey = Object.keys(responseJson);
    const userOption = optionKey.map((options, index) => {
          return <option key={index}>{options}</option>    
    })
    return userOption;
  }
  
  
  handleSelectChangeCity = (event) => {
    this.setState({
      city: event.target.value
    })
    this.GetWeather().then(console.log("Weather"));
  }

  fetchCities = async(country) => {
    const API_URL = `http://localhost:3001/countries/${country}`;
    const response = await fetch(API_URL, {method : 'GET'});
    const responseJson = await response.json();
    console.log(responseJson)
    const userOption = responseJson.map((options, index) => {
          return <option key={index}>{options}</option>    
    })
    this.setState({cityOptionsJSX : userOption})
    return userOption;
  }

  GetWeather = async()=> {
    const API_KEY = 'fe4e680cecb06f4150b9d503a6b07160';
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const API_URL = `${proxy}api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${API_KEY}`;
    const response = await fetch(API_URL, {method : 'GET'});
    const responseJson = await response.json();
    
    console.log(responseJson.main.temp)
    const temp = (responseJson.main.temp - 273).toPrecision(3);
    this.setState({temp : temp})
    return temp;
  }

  componentDidMount(){
    this.fetchCountries().then(selectOption => {
      this.setState({optionJSX : selectOption})
    })
    this.fetchCities("Afghanistan").then(selectOption => {
    })
    this.GetWeather().then(data => {
      this.setState({temp : data})
    })

  }

  render(){
    return(
      <div>
        <select onChange = {this.handleSelectChangeCountry}>
          {this.state.optionJSX}
        </select>
        <select onChange = {this.handleSelectChangeCity}>
            {this.state.cityOptionsJSX}
          </select>
        <h2>{this.state.temp} C</h2>
      </div>
    );
  }
}

export default App;

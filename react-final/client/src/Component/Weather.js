import React, {Component} from 'react';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      country : 'Afghanistan',
      city : 'Herat',
      optionJSX : [],
      cityOptionsJSX : [],
      temp : ''
    }
  }

  handleSelectChangeCountry = (event) => {
    this.setState({
      country: event.target.value,
    })
    //! showing name of previos state country
    console.log(this.state.country)
    setTimeout(() => {
        console.log(this.state.country)
        this.fetchCities().then(console.log("change the options"));
        return this.state.country;
    }, 1000);
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
    setTimeout(() => {
        console.log(this.state.city)
        this.GetWeather().then(console.log(`Showing weather for ${this.state.city}`));
    }, 1000);
    //!this console city with previous state
    console.log(this.state.city)
  }

    fetchCities = async() => {
    console.log("Call received")
    const API_URL = `http://localhost:3001/countries/${this.state.country}`;
    const response = await fetch(API_URL, {method : 'GET'});
    const responseJson = await response.json();
    console.log(responseJson)
    const userOption = responseJson.map((options, index) => {
            return <option key={index}>{options}</option>    
    })

    //! updating the list of options with new city names
    this.setState({cityOptionsJSX : userOption})
    return userOption;
  }

  GetWeather = async()=> {
    console.log("Call from GetWeather "+this.state.city+" ...");
    const API_KEY = 'fe4e680cecb06f4150b9d503a6b07160';
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const API_URL = `${proxy}api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${API_KEY}`;
    const response = await fetch(API_URL, {method : 'GET'});
    const responseJson = await response.json();
    console.log(responseJson.main.temp- 273)
    const temp = (responseJson.main.temp - 273).toPrecision(3);
    this.setState({temp : temp})
    return temp;
  }

    //! display the values after fetching data from the server.js file
  componentDidMount(){
    this.fetchCountries().then(selectOption => {
      this.setState({optionJSX : selectOption})
    })
    this.fetchCities().then(selectOption => {
        this.setState({cityOptionsJSX : selectOption})
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
        <h3>The Temperature is :- {this.state.temp} C</h3>
      </div>
    );
  }
}

export default App;

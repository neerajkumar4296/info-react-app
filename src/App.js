import React, { Component} from 'react';
import './App.css';
import axios from "axios";

class App extends Component{

  constructor(props){
    super(props)
    
    this.state={
        country: '',
        responseData:''
    }
    this.handleChange=this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({country: event.target.value});
 }

 fetchCasesSummary =  event => {
    //alert('fetching report for country:: ' +this.state.country);

    const apiurl='http://127.0.0.1:8090/utilities/coronaCases/summary/';

    event.preventDefault()

      axios.get(apiurl +this.state.country)
      .then((response) =>
     { 
       console.log(response)
       this.setState({
        responseData: response.data
      })
    }
    ).catch((error) => {
      //console.log(error)
      alert('Invalid Country Name:: ' +this.state.country)
  })
   
  }

  


  render(){
  return (
    <div className="App">
      <header className="App-header">
      <h1>Corona Virus Cases Summary</h1>
      <form onSubmit={this.fetchCasesSummary}>
                      <label>
                        country: <input type="text" placeholder="eg: India" value={this.state.country}
                        name="country" onChange={this.handleChange} />
                      </label>
                    <input type="submit" value="Submit" />
                    </form>
          <div  className="col">
            <h2>Corona Virus Cases summary: {this.state.responseData.countryName}</h2>
            <p><b>total confirmed cases: {this.state.responseData.confirmed}</b></p>
            <p><b>newly confirmed cases: {this.state.responseData.newlyConfirmed}</b></p>
            <p><b>total deaths: {this.state.responseData.deaths}</b></p>
            <p><b>new deaths: {this.state.responseData.newDeaths}</b></p>
            <p><b>total recovered: {this.state.responseData.recovered}</b></p>
            <p><b>newly recovered: {this.state.responseData.newlyRecovered}</b></p>
            <p><b><i>last updated: {this.state.responseData.updatedTime}</i></b></p>
          </div>       
     
      </header>
      </div>
  );
 }
} 



export default App;

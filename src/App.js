import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import { properties } from './Components/properties'

class App extends Component {

  componentDidMount() {
    document.title = "Corona Summary Tracker App"
  }

  constructor(props) {
    super(props)

    this.state = {
      country: '',
      responseData: '',
      field: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState(
      {
        country: event.target.value
      }
    );
  }

  fetchCasesSummary = event => {

    event.preventDefault()

    // reading constant values from properties file
    let apiUrl = properties.coronaDevApiUrl

    axios.get(apiUrl + this.state.country)
      .then((response) => {
        this.setState({
          responseData: response.data,
          field: true
        })
      }
      ).catch(error => alert(error.message))



  }





  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Corona Virus Cases Summary</h2>
          <form onSubmit={this.fetchCasesSummary}>
            <label>
              country: <input type="text" placeholder="eg: India" value={this.state.country}
                name="country" disabled={this.state.field} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>

          <div>
            <h3>Corona Virus Cases summary: {this.state.responseData.countryName}</h3>
            <p><b>total confirmed cases: {this.state.responseData.confirmed}</b></p>
            <p><b>total recovered: {this.state.responseData.recovered}</b></p>
            <p><b>total active cases: {this.state.responseData.active}</b></p>
            <p><b>total deaths: {this.state.responseData.deaths}</b></p>
            <p><b>newly confirmed cases: {this.state.responseData.newlyConfirmed}</b></p>
            <p><b>newly recovered: {this.state.responseData.newlyRecovered}</b></p>
            <p><b>new deaths: {this.state.responseData.newDeaths}</b></p>
            <p><b><i>last updated: {this.state.responseData.updatedTime}</i></b></p>
          </div>

        </header>


      </div>
    );
  }
}



export default App;

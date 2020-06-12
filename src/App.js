import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import { properties } from './Components/properties'

class App extends Component {

  // componentDidMount() {
  //   document.title = "Corona Summary Tracker App"
  // }

  constructor(props) {
    super(props)

    this.state = {
      country: '',
      responseData: '',
      disbleInputField: false,
      hideResponseDiv: true,
      hideResponseTable: true
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
          disbleInputField: true,
          hideResponseDiv: false,
          hideResponseTable: true
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
                name="country" disabled={this.state.disbleInputField} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>

          <form>
            <div>
              <label>opciones: </label>
              <label>
              <select>
                <option value="india">India</option>
                <option value="pakistan">Pakistan</option>
                <option value="chad">Chad</option>
                <option value="usa">United States of America</option>
              </select>
              
              </label>
              <input type="submit" disabled="true" value="Submit" />
            </div>

          </form>

            <table id="casesSummary" hidden={this.state.hideResponseTable}>
              <tr>
              <th>Attribute</th>
              <th>Count</th>
              </tr>
              <tr>
              <tr>
              <td>total confirmed cases</td>
              <td>{this.state.responseData.confirmed}</td>
              </tr>
              <tr>
              <td>total recovered</td>
              <td>{this.state.responseData.recovered}</td>
              </tr>
              <tr>
              <td>total active cases</td>
              <td>{this.state.responseData.active}</td>
              </tr>
              <tr>
              <td>total deaths</td>
              <td>{this.state.responseData.deaths}</td>
              </tr>
              <tr>
              <td>newly confirmed cases</td>
              <td>{this.state.responseData.newlyConfirmed}</td>
              </tr>
              <tr>
              <td>newly recovered</td>
              <td>{this.state.responseData.newlyRecovered}</td>
              </tr>
              <tr>
              <td>new deaths</td>
              <td>{this.state.responseData.newDeaths}</td>
              </tr>
              <tr>
              <td>last updated</td>
              <td>{this.state.responseData.updatedTime}</td>
              </tr>
              </tr>
            </table>


          <div hidden={this.state.hideResponseDiv}>
            <h4>Corona Virus Cases Summary: {this.state.responseData.countryName}</h4>
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

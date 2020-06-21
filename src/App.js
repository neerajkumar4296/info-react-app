import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { properties } from './Components/properties';
import CasesSummary from './Components/CasesSummary';
import LoaderSpinner from './Components/LoaderSpinner';


class App extends Component {

  // componentDidMount() {
  //   document.title = "Corona Summary Tracker App"
  // }

  constructor(props) {
    super(props)

    this.state = {
      country: '',
      responseData: '',
      disableForm: false,
      hideCountryCasesResponseDiv: true,
      hideCountryResponseTable: true,
      hideCasesSummary: false,
      loaderHidden: true
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

  fetchCoronaCountryCasesSummary = event => {

    event.preventDefault();

    this.setState({
      loaderHidden: false,
      hideCasesSummary: true,
    });
    // reading constant values from properties file
    let apiUrl = properties.coronalocalApiurl

    axios.get(apiUrl + this.state.country)
      .then((response) => {
        console.log(response)
        this.setState({
          responseData: response.data,
          disableForm: true,
          hideCountryResponseTable: false,
          loaderHidden: true
        })
      }
      ).catch(error => {
        this.setState(
          {
            loaderHidden: true
          }
        )
        // eslint-disable-next-line
        if (error.response.status == 400) {
          alert("invalid country name provided, Bad Request (" + error.response.status + ")")
        }
        else {
          alert("some error occured:: " + error.response.status)
        }

      }
      )




  }








  render() {
    // eslint-disable-next-line
    const isEnabled = this.state.country.length > 2 && this.state.country.match(/^[^-\s][a-zA-Z_\s-]+$/);
    return (
      <div className="App">
        <main className="Main">
          <h2>Corona Virus Cases Summary</h2>
          <form onSubmit={this.fetchCoronaCountryCasesSummary}>

            <div>
              <label>
                Country <input type="text" placeholder="eg: India" value={this.state.country}
                  name="country" disabled={this.state.disableForm} onChange={this.handleChange} />
              </label>

              <div style={{ color: "red", fontSize: "12px", paddingLeft: "65px" }}>*min 3 characters needed</div>
              <div style={{ fontSize: "12px", paddingLeft: "192px", paddingTop: "4px" }}>
                <input type="submit" disabled={this.state.disableForm || !isEnabled} value="Submit" />
              </div>
            </div>




          </form>

          <div  hidden={this.state.hideCasesSummary}>
            <CasesSummary />
          </div>

          <div hidden={this.state.loaderHidden}>
               <LoaderSpinner/>
          </div>




          <table class="countryCasesSummary" hidden={this.state.hideCountryResponseTable}>
            <caption>Cases Summary (data last updated: {this.state.responseData.updatedTime})</caption>
            <tr>
              <th><small>country</small></th>
              <th><small>confirmed</small></th>
              <th><small>recovered</small></th>
              <th><small>active</small></th>
              <th><small>deaths</small></th>
              <th><small>newly confirmed</small></th>
              <th><small>newly recovered</small></th>
              <th><small>new deaths</small></th>
            </tr>

            <tr>
              <td><small>{this.state.responseData.countryName}</small></td>
              <td><small>{this.state.responseData.confirmed}</small></td>
              <td><small>{this.state.responseData.recovered}</small></td>
              <td style={{ color: "red" }}><small>{this.state.responseData.active}</small></td>
              <td style={{ color: "red" }}><small>{this.state.responseData.deaths}</small></td>
              <td><small>{this.state.responseData.newlyConfirmed}</small></td>
              <td><small>{this.state.responseData.newlyRecovered}</small></td>
              <td><small>{this.state.responseData.newDeaths}</small></td>
            </tr>


          </table>





          <div hidden={this.state.hideCountryCasesResponseDiv}>
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





        </main>

      </div>
    );
  }
}



export default App;

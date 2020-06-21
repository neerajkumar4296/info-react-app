import React, { Component } from 'react';
import axios from 'axios';
import { properties } from './properties';
import LoaderSpinner from './LoaderSpinner';

class CasesSummary extends Component {

  constructor(props) {
    super(props)

    this.state =
    {
      worldSummaryData: '',
      responseLastUpdated: '',
      countriesResponseData: [],
      hideResponseDiv: true,
      hideButton: false,
      loaderHidden: true
    }
  }

  fetchCoronaCasesSummary = (event) => {

    // reading constant values from properties file
    let countriesApiUrl = properties.coronalocalApiurl

    this.setState({
      loaderHidden: false,
    });

    axios.get(countriesApiUrl)
      .then((response) => {
        console.log(response)
        this.setState({
          countriesResponseData: response.data.countriesSummary,
          worldSummaryData: response.data.worldSummary,
          responseLastUpdated: response.data.lastUpdatedTime,
          hideResponseDiv: false,
          hideButton: true,
          loaderHidden: true
        })
      }
      ).catch(error => alert(error.message))


  }



  render() {
    return (
      <div >

        <button  style={{ marginLeft:"60px" }} onClick={this.fetchCoronaCasesSummary} hidden={this.state.hideButton}>fetch Global Data</button>

        <div hidden={this.state.loaderHidden}>
          <LoaderSpinner/>
        </div>
        <div style={{ marginTop:"15px" }} hidden={this.state.hideResponseDiv} >
          <table class="globalAndCountrySummaries">
            <caption>Global Summary (data last updated: {this.state.responseLastUpdated})</caption>
            <tr>
              <th><small>Confirmed</small></th>
              <th><small>recovered</small></th>
              <th><small>active</small></th>
              <th><small>deaths</small></th>
              <th><small>newly confirmed</small></th>
            </tr>
            <tr>
              <td><small>{this.state.worldSummaryData.confirmed}</small></td>
              <td><small>{this.state.worldSummaryData.recovered}</small></td>
              <td style={{ color: "red" }}><small>{this.state.worldSummaryData.confirmed - this.state.worldSummaryData.recovered}</small></td>
              <td style={{ color: "red" }}><small>{this.state.worldSummaryData.deaths}</small></td>
              <td><small>{this.state.worldSummaryData.newlyConfirmed}</small></td>
            </tr>
          </table>

          <table style={{ marginTop:"15px" }} class="globalAndCountrySummaries">
            <caption>Countries Summary (ordered by Total Confirmed cases)</caption>
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
            {
              this.state.countriesResponseData.map((countryDetails) =>
                <tr>
                  <td><small>{countryDetails.countryName}</small></td>
                  <td><small>{countryDetails.confirmed}</small></td>
                  <td><small>{countryDetails.recovered}</small></td>
                  <td style={{ color: "red" }}><small>{countryDetails.active}</small></td>
                  <td style={{ color: "red" }}><small>{countryDetails.deaths}</small></td>
                  <td><small>{countryDetails.newlyConfirmed}</small></td>
                  <td><small>{countryDetails.newlyRecovered}</small></td>
                  <td><small>{countryDetails.newDeaths}</small></td>

                </tr>

              )
            }

          </table>


        </div>
      </div>
    );
  }
}

export default CasesSummary;
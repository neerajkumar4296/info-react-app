import React from 'react';
import Loader from 'react-loader-spinner';
function LoaderSpinner(props) {
    return (
        <div>
           <Loader type="Bars" color="#00BFFF" height={50} width={50} /> 
        </div>
    );
}

export default LoaderSpinner;
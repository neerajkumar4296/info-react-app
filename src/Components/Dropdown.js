import React, { Component } from 'react';

class Dropdown extends Component {
    render() {
        return (
            <div>
                <form>
                    <div hidden="true">
                        <label >opciones: </label>
                        <label>
                            <select >
                                <option value="india">India</option>
                                <option value="pakistan">Pakistan</option>
                                <option value="chad">Chad</option>
                                <option value="usa">United States of America</option>
                            </select>

                        </label>
                        <input type="submit" value="Submit" />
                    </div>

                </form>

            </div>
        );
    }
}

export default Dropdown;
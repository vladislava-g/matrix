import React from "react";
import './home.css';
import { NavLink } from 'react-router-dom';

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            rows:4,
            cols:3,
            highlight: 2
        }

        this.handleChange = this.handleChange.bind(this);
        this.increaseValue = this.increaseValue.bind(this);
        this.decreaseValue = this.decreaseValue.bind(this);
        this.checkInput = this.checkInput.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
            this.setState({
                [name]: value
            });
    }
    
    increaseValue(event){
        this.setState({
            [event.target.name]: this.state[event.target.name] + 1
        });
    }

    decreaseValue(event){
        if(this.state[event.target.name] > 1){
            this.setState({
                [event.target.name]: this.state[event.target.name] - 1
            });
          }
        }


    checkInput(event){
      if(event.target.value == 0){
        this.setState({
          [event.target.name]: 1
        });
      }
    }

    render() {
        return (
          <div>
            <div className="gradient-border" id="box">
              <h3 className="header">Matrix</h3>
              <div className="input-section">
                <p>rows: </p>
                <div className="input-section-flex">
                  <button name="rows" onClick={this.increaseValue}>+</button>
                  <input 
                    type="number"
                    onChange={this.handleChange}
                    name="rows"
                    onBlur={this.checkInput}
                    value={this.state.rows} />
                  <button name="rows" onClick={this.decreaseValue}>-</button>
                </div>
              </div>
              <div className="input-section">
                <p>columns: </p>
                <div className="input-section-flex">
                  <button name="cols" onClick={this.increaseValue}>+</button>
                  <input 
                   type="number"
                   onChange={this.handleChange}
                   name="cols"
                   onBlur={this.checkInput}
                   value={this.state.cols} />
                  <button name="cols" onClick={this.decreaseValue}>-</button>
                </div>
              </div>
              <div className="input-section">
                <p>highlights: </p>
                <div className="input-section-flex">
                  <button name="highlight" onClick={this.increaseValue}>+</button>
                  <input
                   type="number"
                   onChange={this.handleChange}
                   name="highlight"
                   onBlur={this.checkInput}
                   value={this.state.highlight} />
                  <button name="highlight" onClick={this.decreaseValue}>-</button>
                </div>
              </div>

              <NavLink
                className="generate-btn"
                exact
                to={{
                  pathname: "/matrix",
                  state: this.state,
                }}
              >
                <p className="generate-btn-text">Generate!</p>
              </NavLink>
            </div>
          </div>
        );
    }
}


export default Home;
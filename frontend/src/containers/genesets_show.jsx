import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchCar, removeCar } from '../actions';
import Aside from '../components/aside';

class GenesetsShow extends Component {
  componentWillMount() {
    // CHECK IF CAR NOT ALREADY THERE?
    if (!this.props.car) {
      this.props.fetchCar(this.props.match.params.id);
    }
  }

  handleClick = () => {
    this.props.removeCar(this.props.history, this.props.car);
  }

  render () {
    const car = this.props.car;
    if (!car) {
      return (
        <Aside key="aside" garage={this.props.garage}>
          <Link to="/">Back to list</Link>
        </Aside>);
    }
    return (
      <div className="view-container">
        <Aside garage={this.props.garage}>
          <Link to="/">Back to list</Link>
        </Aside>
        <div className="car-container">
          <div className="car-card">
            <img className="car-picture" src="/assets/images/logo_square.png" />
            <div className="car-details">
              <span>{car.brand} - {car.model}</span>
              <ul>
                <li><strong>Owner:</strong> {car.owner}</li>
              </ul>
              <span className="plate">{car.plate}</span>
            </div>
            <button className="delete" onClick={this.handleClick}>
              <i className="fa fa-trash-o" aria-hidden="true"></i>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const idFromUrl = parseInt(ownProps.match.params.id, 10);
  const car = state.cars.find(p => p.id === idFromUrl);
  return { car };
}

function mapDispatchToProps(dispatch) {
return bindActionCreators({ fetchCar, removeCar }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GenesetsShow);

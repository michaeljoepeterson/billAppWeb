import React from 'react';
import logo from './logo.svg';
import {connect} from 'react-redux';
import {getBills} from "./actions/allBillActions";

export class App extends React.Component{
  componentDidMount(){
    this.props.dispatch(getBills(10));
  }

  render(){
    return (
    <div className="App">
      <p>teseeet</p>
      {this.props.billData.bills.length}
      </div>
    );
  }
}

const mapStateToProps = state => ({
    billData: state.bills
});

export default connect(mapStateToProps)(App);
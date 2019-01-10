import React, { Component } from 'react';
import './App.module.css';
import CopyButton from './components/CopyButton'
import SignUpModal from './components/SignUpModal'
import LearnMoreCard from './components/LearnMoreCard'
import CopyNotification from "./components/CopyNotification"
import NavBar from './components/NavBar'
import PhoneView from './components/PhoneView'
import MainTitle from './components/MainTitle'
import Editor from './components/Editor'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { updateUUID } from './actions/updateUUIDAction'
import { updateIPAddr } from './actions/updateIPAddrAction'

class App extends Component {
  componentDidMount() {
    const setUUID = () => {
      const url = `${process.env.REACT_APP_URL}retrieve-uuid`
      const { updateUUID } = this.props;
      fetch(url, {
        method: "GET"
      }).then(response => response.text()).then(uuid => {
        updateUUID(uuid)
      }).catch(error => console.error(error));
    }

    const setIPAddr = () => {
      const { updateIPAddr } = this.props;
      const url = 'https://api.ipify.org/'
      fetch(url, {
        method: "GET"
      }).then(response => response.text()).then(ipAddr => {
        console.log(ipAddr)
        updateIPAddr(ipAddr)
      }).catch(error => console.error(error));

    }

    setUUID()
    setIPAddr()
  }

  render() {
    if (window.innerWidth < 800) {
      return (
        <PhoneView />
      )
    }

    else {
      return (
        <div spellCheck="false">
          <SignUpModal />
          <NavBar />
          <MainTitle />
          <CopyNotification />
          <CopyButton />
          <Editor />
          <LearnMoreCard />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => { return {} }

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateUUID,
    updateIPAddr
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

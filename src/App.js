import React, { Component } from 'react';
import './App.module.css';
import CopyButton from './components/CopyButton'
import Modal from './components/Modal'
import LearnMoreCard from './components/LearnMoreCard'
import CopyNotification from "./components/CopyNotification";
import NavBar from './components/NavBar'
import PhoneView from './components/PhoneView'
import MainTitle from './components/MainTitle'
import Editor from './components/Editor'
class App extends Component {

  render() {

    return (
      <div>
        <Modal />
        <PhoneView />
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



export default App

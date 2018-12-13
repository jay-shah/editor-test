import React, { Component } from 'react';
import styles from './App.module.css';
import templateData from './data/template.json'
import TitleComponent from './components/TitleComponent/TitleComponent'
import NoteComponent from './components/NoteComponent'
import CopyButton from './components/CopyButton'
import Section from './components/Section'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateTemplate, removeSection, removeNote, addNote, addNoteFromTitle } from './actions/templateActions'
import SignUpButton from './components/SignUpButton'
import Modal from './components/Modal'
import LearnMoreCard from './components/LearnMoreCard'
import CopyNotification from "./components/CopyNotification";

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: templateData
    }
  }


  renderData = () => {

    const { template } = this.props;
    const sectionData = template.map((section) => {
      return this.renderSection(section)
    })
    return sectionData
  }

  renderSection = (section) => {
    const title = Object.keys(section)[0]
    const notes = section[title]
    const renderTitle = this.renderTitle(title)
    const listNotes = this.renderNotes(notes, title)
    return (
      <Section key={title} title={title} renderTitle={renderTitle} listNotes={listNotes} />
    )
  }

  renderTitle = (title) => {
    const key = `${title}`.replace(/ /g, '')
    this.refList.push(key)
    return (
      <TitleComponent
        key={key}
        titleKey={key}
        title={title}
        onMouseEnterTitle={this.onMouseEnterTitle}
        onMouseLeaveTitle={this.onMouseLeaveTitle}
        onKeyDownTitle={this.onKeyDownTitle}
        trashClickTitle={this.trashClickTitle}
        onMouseKey={this.state.key}
      />
    )
  }

  renderNotes = (notes, title) => {
    const listNotes = notes.map((note, noteIndex) => {
      const key = `${title}-${noteIndex}`.replace(/ /g, '')
      this.refList.push(key)

      let parsedNote = this.getNote(note, title, noteIndex)
      return (
        <NoteComponent
          key={key}
          noteKey={key}
          title={title}
          noteIndex={noteIndex}
          note={parsedNote}
          onMouseEnterNote={this.onMouseEnterNote}
          onMouseLeaveNote={this.onMouseLeaveNote}
          onKeyDownNote={this.onKeyDownNote}
          onBlurNote={this.onBlurNote}
          trashClickNote={this.trashClickNote}
          onMouseKey={this.state.key}
        />
      )
    })
    return listNotes
  }


  getNote = (note, title, noteIndex) => {

    let templateOptions = this.findAllOptions(note)

    if (!templateOptions) {
      return (note)
    }

    else {

      let notesWithTemplateOptions = []
      notesWithTemplateOptions = this.getNotesWithTemplateOptions(note, templateOptions, notesWithTemplateOptions, title, noteIndex)
      return (
        <div>
          {notesWithTemplateOptions}
        </div>
      )
    }

  }

  findAllOptions = (note) => {
    const templateOptions = /\[.*?\/.*?\]/g
    const options = note.match(templateOptions)
    return options
  }

  getNotesWithTemplateOptions = (note, templateOptions, notesWithTemplateOptions, title, noteIndex, tempNote) => {

    let option = templateOptions[0]
    let prefix = this.getPrefix(note, option)


    const suffix = this.getSuffix(note, option)
    const infixList = this.getInfix(option, prefix, suffix)
    notesWithTemplateOptions.push(prefix)

    if (tempNote) {
      prefix = this.getPrefix(tempNote, option)
    }

    const rendersButtons = this.rendersButtons(infixList, prefix, suffix, title, noteIndex)

    notesWithTemplateOptions = notesWithTemplateOptions.concat(rendersButtons)

    if (templateOptions.length !== 1) {
      const suffix = this.getSuffix(note, option)
      return this.getNotesWithTemplateOptions(suffix, templateOptions.splice(1), notesWithTemplateOptions, title, noteIndex, note)
    }
    notesWithTemplateOptions.push(suffix)
    return notesWithTemplateOptions
  }

  rendersButtons = (infixList, prefix, suffix, title, noteIndex) => {
    return infixList.map((infix, index) => {
      const key = `${infix}-${index}`
      return (
        <button
          contentEditable={false}
          className={styles.noteButton}
          key={key}
          prefix={prefix}
          suffix={suffix}
          value={infix}
          onMouseDown={(e) => this.buttonClick(e, infix, prefix, suffix, title, noteIndex)}
        >
          {infix}
        </ button>
      );
    })
  }

  buttonClick = (e, infix, prefix, suffix, title, noteIndex) => {
    const titleData = this.getTitleData(title)
    let text = `${prefix} ${infix} ${suffix}`

    if (infix.trim() === 'Other') {
      text = `${prefix} ${suffix}`
    }

    const { updateTemplate, inputRef } = this.props;

    let refKEy = `${title}-${noteIndex}`.replace(/ /g, '')

    updateTemplate(titleData['titleIndex'], noteIndex, title, text)
    let refIndex = this.refList.indexOf(refKEy)

    setTimeout(() => {
      inputRef[this.refList[refIndex]].focus()
    }, 0)


  }


  getPrefix = (note, option) => {
    const regex_get_prefix = new RegExp("^.*(?=(\\" + option + "))");
    const prefix = note.match(regex_get_prefix)[0]
    return prefix
  }

  getInfix = (option) => {
    /** return list of all options inside[.../.../...]remove '[', ']' and '/' */
    const infix = option.split('/').map((item) => { return item.replace(/\[|\]/g, '') })
    return infix
  }

  getSuffix = (note, option) => {
    const regex_get_suffix = new RegExp("\\" + option + "(.*)")
    const suffix = note.match(regex_get_suffix)[0].replace(option, '')
    return suffix
  }


  trashClickTitle = (title) => {
    const titleData = this.getTitleData(title)
    const { removeSection } = this.props;
    removeSection(titleData['titleIndex'])
  }

  trashClickNote = (title, noteIndex) => {

    const titleData = this.getTitleData(title)

    const { removeNote } = this.props
    removeNote(titleData['titleIndex'], noteIndex, title)


  }

  getTitleData = (title) => {
    let titleIndex = null
    this.props.template.map((section, index) => {
      if (section[title]) {
        titleIndex = index
        return true
      }
      return false
    })
    return { titleIndex }
  }


  getNoteData = (title, note) => {

    let titleIndex = null
    let sectionData = null
    let noteIndex = null

    this.props.template.map((section, index) => {
      if (section[title]) {

        titleIndex = index
        sectionData = section
        return true
      }
      return false
    })

    sectionData[title].map((notes, index) => {
      if (notes === note) {
        noteIndex = index
        return true
      }
      return false
    })

    return { titleIndex, noteIndex }
  }

  onBlurNote = (e, title, noteIndex) => {
    const containsButtons = e.target.innerHTML.includes('button')
    if (containsButtons) {
      return
    }
    if (e.target.tagName === 'BUTTON') {
      return
    }
    else {
      let text = e.target.textContent
      const titleData = this.getTitleData(title)
      const { updateTemplate } = this.props;
      updateTemplate(titleData['titleIndex'], noteIndex, title, text)
    }
  }


  onKeyDownTitle = (e, title) => {
    const titleData = this.getTitleData(title)
    let key = `${title}`.replace(/ /g, '')
    let refIndex = this.refList.indexOf(key)
    const { inputRef } = this.props;



    if (e.key === 'Enter') {

      e.preventDefault()
      const { addNoteFromTitle } = this.props;
      addNoteFromTitle(titleData['titleIndex'], 0, title)


      setTimeout(() => {
        inputRef[this.refList[refIndex + 1]].focus()
      }, 0)
    }

    if (e.key === 'ArrowDown') {
      if (this.refList[refIndex + 1]) {
        inputRef[this.refList[refIndex + 1]].focus()
      }
    }

    if (e.key === 'ArrowUp') {
      if (refIndex !== 0) {
        inputRef[this.refList[refIndex - 1]].focus()
      }
    }

  }

  onKeyDownNote = (e, title, noteIndex) => {

    const titleData = this.getTitleData(title)
    let key = `${title}-${noteIndex}`.replace(/ /g, '')
    let refIndex = this.refList.indexOf(key)
    const { inputRef, removeNote } = this.props;

    if (e.key === 'Backspace') {
      if (e.target.textContent === '') {
        removeNote(titleData['titleIndex'], noteIndex, title)
      }
    }

    if (e.key === 'Enter') {

      e.preventDefault()

      // data[titleData['titleIndex']][title].splice(noteIndex + 1, 0, " ")

      const { addNote } = this.props;
      addNote(titleData['titleIndex'], noteIndex, title)

      setTimeout(() => {
        inputRef[this.refList[refIndex + 1]].focus()
      }, 0)

    }
    if (e.key === 'ArrowDown') {
      if (this.refList[refIndex + 1]) {
        inputRef[this.refList[refIndex + 1]].focus()
      }
    }
    if (e.key === 'ArrowUp') {

      inputRef[this.refList[refIndex - 1]].focus()
    }
  }

  onMouseEnterNote = (key) => {
    this.setState({
      key
    })
  }

  onMouseLeaveNote = () => {
    this.setState({
      key: null
    })
  }
  onMouseEnterTitle = (key) => {
    this.setState({
      key
    })
  }

  onMouseLeaveTitle = () => {
    this.setState({
      key: null
    })
  }



  render() {
    this.refList = []
    const Sections = this.renderData()
    const { copyButtonClicked } = this.props;
    return (
      <div>
      <Modal />
      {copyButtonClicked ?
        <button className={styles.copyNotification}><span className={styles.icon} />Copied. Click to start a new appointment <span className={styles.icon2} /></button> : ''
      }
      <CopyButton />
        <div className={styles.modal}>
          <div className={styles.flightPreloader} id="flight-preloader">
            <svg width="100px" height="100px" viewBox="0 0 200 200" version="1.1">
              <title>loading-flight</title>
              <defs></defs>
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <path d="M32.4348912,-0.200891226 C14.6325447,-0.200891226 0.200891226,14.2596834 0.200891226,32.097706 L0.200891226,168.391737 C0.200891226,176.957857 3.59696377,185.173132 9.64201145,191.230294 C22.2301711,203.843681 42.6396113,203.843681 55.227771,191.230294 L191.249214,54.9362629 C197.294262,48.8791013 200.690334,40.6638266 200.690334,32.097706 C200.690334,14.2596834 186.258681,-0.200891226 168.456334,-0.200891226 L32.4348912,-0.200891226 Z M0.200891226,168.391737 C0.200891226,186.22976 14.6325447,200.690334 32.4348912,200.690334 L168.456334,200.690334 C177.005322,200.690334 185.204166,197.287456 191.249214,191.230294 C203.837374,178.616907 203.837374,158.166567 191.249214,145.55318 L55.227771,9.25914908 C49.1827238,3.20198707 40.9838797,-0.200891226 32.4348912,-0.200891226 C14.6325447,-0.200891226 0.200891226,14.2596834 0.200891226,32.097706 L0.200891226,168.391737" id="Rectangle-2" transform="translate(100.445613, 100.244722) rotate(90.000000) translate(-100.445613, -100.244722) "></path>
              </g>
            </svg>
          </div>
          <div className={styles.modalText}>
            Sorry about this. <br></br>
            The Kiroku editor only works on larger screens.
        </div>
        </div >
        <div className={styles.navBar}><div className={styles.kirokuLogo}></div>
          {/* <div className={styles.signUp}><button className={styles.signupButton}>Sign up</button></div> */}
          <SignUpButton />
          <div className={styles.navList}>Contact</div>
          <div className={styles.navList}>About</div>
        </div>
        <div className={styles.mainTitle}>
          Click below to begin editing your notes.
        </div >
        <CopyNotification />
        <CopyButton />
        <div className={styles.template} id='thisistheid' data-enable-grammarly={false}>
          {Sections}
        </div >
        <LearnMoreCard />
        <Modal />
      </div>
    );
  }
}

const mapStatToProps = (state) => {
  return {
    inputRef: state.refReducer.inputRef,
    // template: state.templateReducer.templateIds.map(id => state.templateReducer.template[id])
    template: state.templateReducer.template,
    copyButtonClicked: state.copyReducer.clicked
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateTemplate,
    removeSection,
    removeNote,
    addNote,
    addNoteFromTitle
  }, dispatch);
};

export default connect(mapStatToProps, mapDispatchToProps)(App)

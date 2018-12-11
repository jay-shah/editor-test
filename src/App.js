import React, { Component } from 'react';
import styles from './App.module.css';
import templateData from './data/template.json'
import TitleComponent from './components/TitleComponent/TitleComponent'
import NoteComponent from './components/NoteComponent'
import CopyButton from './components/CopyButton'
import Section from './components/Section'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: templateData
    }
    this.inputRef = {}
  }


  addRef = (e, refKey) => {
    this.inputRef[refKey] = e
  }

  renderData = (data) => {
    const sectionData = data.map((section) => {
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
        addRef={this.addRef}
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
          addRef={this.addRef}
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

  getNotesWithTemplateOptions = (note, templateOptions, notesWithTemplateOptions, title, noteIndex) => {

    let option = templateOptions[0]

    const prefix = this.getPrefix(note, option)
    const suffix = this.getSuffix(note, option)
    const infixList = this.getInfix(option, prefix, suffix)
    const rendersButtons = this.rendersButtons(infixList, prefix, suffix, title, noteIndex)

    notesWithTemplateOptions.push(prefix)
    notesWithTemplateOptions = notesWithTemplateOptions.concat(rendersButtons)

    if (templateOptions.length !== 1) {
      const suffix = this.getSuffix(note, option)
      return this.getNotesWithTemplateOptions(suffix, templateOptions.splice(1), notesWithTemplateOptions, title, noteIndex)
    }
    notesWithTemplateOptions.push(suffix)
    return notesWithTemplateOptions
  }

  rendersButtons = (infixList, prefix, suffix, title, noteIndex) => {
    return infixList.map((infix, index) => {
      const key = `${infix}-${index}`
      return (
        <button
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
    let data = this.state.data
    data[titleData['titleIndex']][title][noteIndex] = `${prefix} ${infix} ${suffix}`
    this.setState({ data })
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
    let data = this.state.data
    data.splice(titleData['titleIndex'], 1)
    this.setState({ data })
  }

  trashClickNote = (title, noteIndex) => {
    const titleData = this.getTitleData(title)
    let data = this.state.data
    data[titleData['titleIndex']][title].splice(noteIndex, 1)
    this.setState({ data })
  }

  getTitleData = (title) => {
    let titleIndex = null
    this.state.data.map((section, index) => {
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

    this.state.data.map((section, index) => {
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
    console.log(e.target.tagName)
    if (containsButtons) {
      return
    }
    if (e.target.tagName === 'BUTTON') {
      return
    }
    else {
      let text = e.target.textContent
      const titleData = this.getTitleData(title)
      let data = this.state.data
      data[titleData['titleIndex']][title][noteIndex] = text
      this.setState({ data })
    }
  }


  onKeyDownTitle = (e, title) => {
    console.log(this.inputRef)
    const titleData = this.getTitleData(title)
    let key = `${title}`.replace(/ /g, '')
    let refIndex = this.refList.indexOf(key)
    if (e.key === 'Enter') {

      e.preventDefault()
      let data = this.state.data
      data[titleData['titleIndex']][title].splice(0, 0, "")
      this.setState({ data })
      setTimeout(() => {
        this.inputRef[this.refList[refIndex + 1]].focus()
      }, 0)
    }

    if (e.key === 'ArrowDown') {
      if (this.refList[refIndex + 1]) {
        this.inputRef[this.refList[refIndex + 1]].focus()
      }
    }

    if (e.key === 'ArrowUp') {
      if (refIndex !== 0) {
        this.inputRef[this.refList[refIndex - 1]].focus()
      }
    }

  }

  onKeyDownNote = (e, title, noteIndex) => {


    const titleData = this.getTitleData(title)
    let key = `${title}-${noteIndex}`.replace(/ /g, '')
    let refIndex = this.refList.indexOf(key)
    let data = this.state.data
    if (e.key === 'Enter') {

      e.preventDefault()
      data[titleData['titleIndex']][title].splice(noteIndex + 1, 0, " ")
      this.setState({ data })

      setTimeout(() => {
        this.inputRef[this.refList[refIndex + 1]].focus()
      }, 0)

    }
    if (e.key === 'ArrowDown') {
      if (this.refList[refIndex + 1]) {
        this.inputRef[this.refList[refIndex + 1]].focus()
      }
    }
    if (e.key === 'ArrowUp') {

      this.inputRef[this.refList[refIndex - 1]].focus()
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

  handleCopy = () => {
    let range = document.createRange();
    window.getSelection().removeAllRanges()
    range.selectNode(document.getElementById('thisistheid'));
    window.getSelection().addRange(range);
    document.execCommand("removeFormat");
    document.execCommand("copy");
  }


  render() {
    this.refList = []
    const Sections = this.renderData(this.state.data)
    return (
      <div>
        <div className={styles.navBar}><div className={styles.kirokuLogo}></div>
          <div className={styles.signUp}><button className={styles.signupButton}>Sign up</button></div>
          <div className={styles.navList}>Contact</div>
          <div className={styles.navList}>About</div>
        </div>
        <div className={styles.template} id='thisistheid'>
          {Sections}
        </div >
        <div className={styles.cardConatiner}>
          <div className={styles.cardImage}></div>
          <div className={styles.cardTitle}>An AI dental assistant.</div>
          <div className={styles.cardParagraph}> Kiroku lets you spend significantly less time writing clinical notes.</div>
          <div><button className={styles.cardButton}>Learn more</button></div>
        </div>
        <CopyButton />
      </div>
    );
  }
}

export default App;

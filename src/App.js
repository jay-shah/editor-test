import React, { Component } from 'react';
import styles from './App.module.css';
import { Icon } from 'semantic-ui-react'
import templateData from './data/template.json'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: templateData
    }
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
      <div key={title} className={styles.section}>
        {renderTitle}
        {listNotes}
      </div>
    )
  }

  renderTitle = (title) => {
    const key = `${title}`.replace(/ /g, '')
    this.refList.push(key)
    return (
      <div
        key={key}
        className={styles.title}
        onMouseEnter={() => this.onMouseEnterTitle(key)}
        onMouseLeave={this.onMouseLeaveTitle}>
        <div key={key}
          contentEditable={true}
          suppressContentEditableWarning
          ref={key}
          className={styles.titleWriting}
          onKeyDown={(e) => this.onKeyDownTitle(e, title)}>
          <h3>{title}</h3>
        </div>
        <Icon
          name='trash'
          style={this.state.key === key ? { visibility: 'visible' } : { visibility: 'hidden' }}
          onClick={() => this.trashClickTitle(title)}
        />
      </div>
    )
  }

  renderNotes = (notes, title) => {
    const listNotes = notes.map((note, noteIndex) => {
      const key = `${title}-${noteIndex}`.replace(/ /g, '')
      this.refList.push(key)

      let parsedNote = this.getNote(note, title, noteIndex)
      return (
        <div
          key={key}
          className={styles.note}
          onMouseEnter={() => this.onMouseEnterNote(key)}
          onMouseLeave={this.onMouseLeaveNote}

        >
          <Icon
            name='trash'
            style={this.state.key === key ? { visibility: 'visible' } : { visibility: 'hidden' }}
            onClick={() => this.trashClickNote(title, noteIndex)}
          />
          <div contentEditable={true}
            suppressContentEditableWarning
            onKeyDown={(e) => this.onKeyDownNote(e, title, noteIndex)}
            className={styles.noteWriting}
            onBlur={(e) => this.onBlur(e, title, noteIndex)}
            ref={key}
          >
            {parsedNote}
          </div>
        </div >
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
        <span>
          {notesWithTemplateOptions}
        </span>
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
        <button key={key}
          prefix={prefix}
          suffix={suffix}
          value={infix}
          onClick={(e) => this.buttonClick(e, infix, prefix, suffix, title, noteIndex)}>
          {infix}
        </button>
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





  onBlur = (e, title, noteIndex) => {
    const containsButtons = e.target.innerHTML.includes('button')

    if (containsButtons) {
      return
    }

    else if (e.target.tagName === 'BUTTON') {
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

    const titleData = this.getTitleData(title)
    let key = `${title}`.replace(/ /g, '')
    let refIndex = this.refList.indexOf(key)
    if (e.key === 'Enter') {

      e.preventDefault()
      let data = this.state.data
      data[titleData['titleIndex']][title].splice(0, 0, "")
      this.setState({ data })
      setTimeout(() => {
        this.refs[this.refList[refIndex + 1]].focus()
      }, 0)
    }
    if (e.key === 'ArrowDown') {
      if (this.refList[refIndex + 1]) {
        this.refs[this.refList[refIndex + 1]].focus()
      }
    }

    if (e.key === 'ArrowUp') {
      if (refIndex !== 0) {
        this.refs[this.refList[refIndex - 1]].focus()
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
        this.refs[this.refList[refIndex + 1]].focus()
      }, 0)


    }
    if (e.key === 'ArrowDown') {
      if (this.refList[refIndex + 1]) {
        this.refs[this.refList[refIndex + 1]].focus()
      }
    }
    if (e.key === 'ArrowUp') {

      this.refs[this.refList[refIndex - 1]].focus()
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
      <div >
        <div className={styles.template} id='thisistheid'>
          {Sections}
        </div >


        <button onClick={this.handleCopy}>  COPY </button>
      </div>
    );
  }
}

export default App;

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
      <div key={key}
        contentEditable={true}
        suppressContentEditableWarning
        ref={key}
        className={styles.title}
        onKeyDown={(e) => this.onKeyDownTitle(e, title)}
      >
        <h3>{title}</h3>
      </div>
    )
  }

  trashClick = (title, note) => {
    const noteData = this.getNoteData(title, note)
    let data = this.state.data
    data[noteData['titleIndex']][title].splice(noteData['noteIndex'], 1)
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

  onInput = (e, title, note) => {
    let text = e.target.textContent
  }


  renderNotes = (notes, title) => {
    const listNotes = notes.map((note, index) => {
      const key = `${title}-${index}`.replace(/ /g, '')
      this.refList.push(key)
      return (
        <div
          key={key}
          className={styles.note}
          onMouseEnter={() => this.onMouseEnter(key)}
          onMouseLeave={this.onMouseLeave}
        >
          <Icon
            name='trash'
            style={this.state.key === key ? { visibility: 'visible' } : { visibility: 'hidden' }}
            onClick={() => this.trashClick(title, note)}
          />
          <div contentEditable={true}
            suppressContentEditableWarning
            onInput={this.onInput}
            placeholder="Write a comment..."
            onKeyDown={(e) => this.onKeyDownNote(e, title, note)}
            className={styles.noteWriting}
            ref={key}
          >
            {note}
          </div>
        </div >
      )
    })
    return listNotes
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

  onKeyDownNote = (e, title, note) => {
    const noteData = this.getNoteData(title, note)
    let key = `${title}-${noteData['noteIndex']}`.replace(/ /g, '')
    let refIndex = this.refList.indexOf(key)
    if (e.key === 'Enter') {

      e.preventDefault()

      let data = this.state.data
      data[noteData['titleIndex']][title].splice(noteData['noteIndex'] + 1, 0, "")
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

  onMouseEnter = (key) => {
    this.setState({
      key
    })
  }

  onMouseLeave = () => {
    this.setState({
      key: null
    })
  }


  render() {
    this.refList = []
    const Sections = this.renderData(this.state.data)
    return (
      <div className={styles.template}>
        {Sections}
      </div >
    );
  }
}

export default App;



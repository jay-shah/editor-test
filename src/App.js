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
    const listNotes = this.renderNotes(notes, title)
    const renderTitle = this.renderTitle(title)

    return (
      <div key={title} className={styles.section}>
        {renderTitle}
        {listNotes}
      </div>
    )
  }

  renderTitle = (title) => {
    return (
      <div key={title} className={styles.title}>
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
            onKeyDown={(e) => this.onKeyDown(e, title, note)}
            className={styles.noteWriting}>
            {note}
          </div>
        </div >
      )
    })
    return listNotes
  }



  onKeyDown = (e, title, note) => {

    if (e.key === 'Enter') {

      e.preventDefault()
      const noteData = this.getNoteData(title, note)
      let data = this.state.data
      data[noteData['titleIndex']][title].splice(noteData['noteIndex'] + 1, 0, "")
      this.setState({ data })
      this.renderData(data)


      if (e.key === 'ArrowDown') {
      }
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
    const Sections = this.renderData(this.state.data)
    return (
      <div className={styles.template}>
        {Sections}
      </div >
    );
  }
}

export default App;



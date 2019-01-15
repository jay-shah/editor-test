import React, { Component } from 'react'
import TitleComponent from './TitleComponent'
import NoteComponent from './NoteComponent'
import Section from './Section'
import styles from './Editor.module.css'

export default class Editor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            key: null
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

        let refKey = `${title}-${noteIndex}`.replace(/ /g, '')

        updateTemplate(titleData['titleIndex'], noteIndex, title, text)
        let refIndex = this.refList.indexOf(refKey)

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

        if (e.key === 'Backspace') {
            if (e.target.textContent === '') {
                e.preventDefault()
            }
        }


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
                setTimeout(() => {
                    inputRef[this.refList[refIndex - 1]].focus()
                }, 0)
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
        return (
            <div className={styles.template}>
                {Sections}
            </div >
        )
    }
}

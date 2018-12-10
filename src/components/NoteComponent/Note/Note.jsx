import React, { Component } from 'react'
import styles from './Note.module.css'

export default class Note extends Component {
    render() {

        const { note, noteKey, title, noteIndex, onBlurNote, onKeyDownNote } = this.props;

        return (
            <div contentEditable={true}
                suppressContentEditableWarning
                onKeyDown={(e) => onKeyDownNote(e, title, noteIndex)}
                className={styles.note}
                onBlur={(e) => onBlurNote(e, title, noteIndex)}
                ref={noteKey}
            >
                {note}
            </div >
        )
    }
}

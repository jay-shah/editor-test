import React, { Component } from 'react'
import styles from './Note.module.css'

export default class Note extends Component {
    render() {

        const { note, noteKey, title, noteIndex, onBlurNote, onKeyDownNote, addRef } = this.props;

        return (
            <div contentEditable={true}
                suppressContentEditableWarning
                ref={(e) => this.props.addRef(e, this.props.noteKey)}
                onKeyDown={(e) => onKeyDownNote(e, title, noteIndex)}
                className={styles.note}
                onBlur={(e) => onBlurNote(e, title, noteIndex)}
            >
                {note}
            </div >
        )
    }
}

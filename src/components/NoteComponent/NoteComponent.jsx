import React from 'react'
import styles from './NoteComponent.module.css'
import { Icon } from 'semantic-ui-react'
import Note from './Note/Note'

const NoteComponent = ({ noteKey, note, title, noteIndex, onMouseEnterNote, onMouseLeaveNote, trashClickNote, onKeyDownNote, onBlurNote, onMouseKey }) => {
    return (
        <div
            key={noteKey}
            className={styles.noteComponent}
            onMouseEnter={() => onMouseEnterNote(noteKey)}
            onMouseLeave={onMouseLeaveNote}
        >
            <Icon
                name='trash'
                style={onMouseKey === noteKey ? { visibility: 'visible' } : { visibility: 'hidden' }}
                onClick={() => trashClickNote(title, noteIndex)}
            />

            <Note
                note={note}
                noteKey={noteKey}
                title={title}
                noteInde={noteIndex}
                onBlurNote={(e) => onBlurNote(e, title, noteIndex)}
                onKeyDownNote={onKeyDownNote}
            />
        </div >
    )
}

export default NoteComponent
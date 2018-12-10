import React, { Component } from 'react'
import styles from './NoteComponent.module.css'
import { Icon } from 'semantic-ui-react'
import Note from './Note/Note'

const NoteComponent = ({
    noteKey,
    note,
    title,
    noteIndex,
    onMouseEnterNote,
    onMouseLeaveNote,
    trashClickNote,
    onKeyDownNote,
    onBlurNote,
    onMouseKey,
    addRef
}) => {
    return (
        <div
            key={noteKey}
            className={styles.noteComponent}
            onMouseEnter={() => onMouseEnterNote(noteKey)}
            onMouseLeave={onMouseLeaveNote}
        >
            <div
                name='trash'
                className={styles.trashNote}
                style={onMouseKey === noteKey ? { visibility: 'visible' } : { visibility: 'hidden' }}
                onClick={() => trashClickNote(title, noteIndex)}
            />
            <Note
                addRef={addRef}
                note={note}
                noteKey={noteKey}
                title={title}
                noteIndex={noteIndex}
                onBlurNote={(e) => onBlurNote(e, title, noteIndex)}
                onKeyDownNote={onKeyDownNote}
            />
        </div >
    )
}

export default NoteComponent

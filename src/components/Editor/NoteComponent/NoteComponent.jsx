import React from 'react'
import styles from './NoteComponent.module.css'
import Note from './Note'
import TrashNoteIcon from './TrashNoteIcon'

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
}) => {
    return (
        <div
            key={noteKey}
            className={styles.noteComponent}
            onMouseEnter={() => onMouseEnterNote(noteKey)}
            onMouseLeave={onMouseLeaveNote}>
            <TrashNoteIcon
                onMouseKey={onMouseKey}
                noteKey={noteKey}
                title={title}
                trashClickNote={trashClickNote}
                noteIndex={noteIndex}
            />
            <Note
                onMouseKey={onMouseKey}
                note={note}
                noteKey={noteKey}
                title={title}
                noteIndex={noteIndex}
                onBlurNote={(e) => onBlurNote(e, title, noteIndex)}
                onKeyDownNote={onKeyDownNote}
                className={styles.noteLine}
            />
        </div >
    )
}

export default NoteComponent

import React from 'react'
import styles from './TrashNoteIcon.module.css'

const TrashNoteIcon = ({
    onMouseKey,
    noteKey,
    title,
    trashClickNote,
    noteIndex
}) => {
    return (
        <div
            name='trash'
            className={styles.trashNote}
            style={onMouseKey === noteKey ? { visibility: 'visible' } : { visibility: 'hidden' }}
            onClick={() => trashClickNote(title, noteIndex)}
        />
    )
}

export default TrashNoteIcon

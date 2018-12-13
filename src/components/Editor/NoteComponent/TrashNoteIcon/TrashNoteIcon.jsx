import React from 'react'
import styles from './TrashNoteIcon.module.css'

const TrashNoteIcon = ({
    onMouseKey,
    noteKey,
    title,
    trashClickNote,
    noteIndex
}) => {

    if (onMouseKey === noteKey) {

        return (

            <div
                className={styles.trashNote}
                // style={onMouseKey === noteKey ? { visibility: 'visible' } : { visibility: 'hidden' }}
                onClick={() => trashClickNote(title, noteIndex)}
            ></div>
        )
    }
    return null
}

export default TrashNoteIcon

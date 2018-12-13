import React from 'react'
import styles from './Note.module.css'

const Note = ({
    note,
    noteKey,
    title,
    noteIndex,
    onBlurNote,
    onKeyDownNote,
    addRef,
    onMouseKey
}) => {
    return (
        <div contentEditable={true}
            suppressContentEditableWarning
            ref={(e) => addRef(e, noteKey)}
            onKeyDown={(e) => onKeyDownNote(e, title, noteIndex)}
            className={onMouseKey === noteKey ? styles.noteHover : styles.note}
            onBlur={(e) => onBlurNote(e, title, noteIndex)}
            placeholder="Enter notes here..."
        >
            {note}
        </div >
    )
}
export default Note

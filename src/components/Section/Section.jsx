import React from 'react'
import styles from './Section.module.css'

const Section = ({ title, renderTitle, listNotes, titleKey }) => {

    return (
        <div key={title}
            className={title === titleKey ? styles.sectionIconHovered : styles.section}
        >
            {renderTitle}
            {listNotes}
        </div>
    )
}

export default Section

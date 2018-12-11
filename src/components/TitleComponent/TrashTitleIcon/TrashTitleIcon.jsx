import React from 'react'
import styles from './TrashTitleIcon.module.css'
const TrashTitleIcon = ({ onMouseKey, titleKey, title, trashClickTitle }) => {
    return (
        <div
            className={styles.trashTitle}
            style={onMouseKey === titleKey ? { visibility: 'visible' } : { visibility: 'hidden' }}
            onClick={() => trashClickTitle(title)} />
    )
}

export default TrashTitleIcon

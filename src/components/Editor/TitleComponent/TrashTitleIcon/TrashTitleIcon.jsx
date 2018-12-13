import React from 'react'
import styles from './TrashTitleIcon.module.css'
const TrashTitleIcon = ({ onMouseKey, titleKey, title, trashClickTitle, mouseEnterTrashTitleIcon, mouseLeaveTrashTitleIcon }) => {

    return (
        <div
            className={styles.trashTitle}
            style={onMouseKey === titleKey ? { visibility: 'visible' } : { visibility: 'hidden' }}
            onClick={() => trashClickTitle(title)}
            onMouseEnter={() => mouseEnterTrashTitleIcon(title)}
            onMouseLeave={mouseLeaveTrashTitleIcon} />
    )
}

export default TrashTitleIcon

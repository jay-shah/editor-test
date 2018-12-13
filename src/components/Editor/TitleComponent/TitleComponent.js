import React from 'react'
import styles from './TitleComponent.module.css'
import Title from './Title'
import TrashTitleIcon from './TrashTitleIcon'

const TitleComponent = ({
    titleKey,
    title,
    onMouseEnterTitle,
    onMouseLeaveTitle,
    onKeyDownTitle,
    trashClickTitle,
    onMouseKey,
    addRef
}) => {
    return (
        <div
            key={titleKey}
            className={styles.titleComponent}
            onMouseEnter={() => onMouseEnterTitle(titleKey)}
            onMouseLeave={onMouseLeaveTitle} >
            <TrashTitleIcon
                onMouseKey={onMouseKey}
                titleKey={titleKey}
                title={title}
                trashClickTitle={trashClickTitle}
            />
            <Title
                titlekey={titleKey}
                onKeyDownTitle={onKeyDownTitle}
                title={title}
            />
        </div >
    )
}
export default TitleComponent

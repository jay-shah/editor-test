import React from 'react'
import styles from './TitleComponent.module.css'
import Title from './Title/Title'
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
            <Title
                titlekey={titleKey}
                onKeyDownTitle={onKeyDownTitle}
                title={title}
                addRef={addRef} />
            <TrashTitleIcon
                onMouseKey={onMouseKey}
                titleKey={titleKey}
                title={title}
                trashClickTitle={trashClickTitle}
            />
        </div >
    )
}
export default TitleComponent

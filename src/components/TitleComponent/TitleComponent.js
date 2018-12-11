import React from 'react'
import styles from './TitleComponent.module.css'
import Title from './Title/Title'

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
             <div
                className={styles.trashTitle}
                style={onMouseKey === titleKey ? { visibility: 'visible' } : { visibility: 'hidden' }}
                onClick={() => trashClickTitle(title)} />
        </div >
    )
}
export default TitleComponent

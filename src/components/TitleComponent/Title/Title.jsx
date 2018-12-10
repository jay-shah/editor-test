import React from 'react'
import styles from './Title.module.css'


const Title = ({
    titlekey,
    addRef,
    title,
    onKeyDownTitle
}) => {
    return (
        < div key={titlekey}
            contentEditable={true}
            suppressContentEditableWarning
            ref={(e) => addRef(e, titlekey)}
            className={styles.title}
            onKeyDown={(e) => onKeyDownTitle(e, title)}
        >
            <h3>{title}</h3>
        </div >
    )
}
export default Title
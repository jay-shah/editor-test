import React from 'react'
import styles from './CopyButton.module.css'

const CopyButton = () => {


    const handleCopy = () => {
        let range = document.createRange();
        window.getSelection().removeAllRanges()
        range.selectNode(document.getElementById('thisistheid'));
        window.getSelection().addRange(range);
        document.execCommand("removeFormat");
        document.execCommand("copy");
    }


    return (
        <button
        className={styles.copyButton}
        onClick={handleCopy}>
            <span className={styles.icon} /> Copy notes to clipboard
        </button>
    )
}

export default CopyButton

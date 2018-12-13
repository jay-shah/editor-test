import React from 'react'
import styles from './CopyButton.module.css'
import audioUrl from './audio/copy.mp3'

const CopyButton = ({ updateCopyButtonClicked }) => {


    const handleCopy = () => {
        updateCopyButtonClicked()

        let range = document.createRange();
        window.getSelection().removeAllRanges()
        range.selectNode(document.getElementById('thisistheid'));
        window.getSelection().addRange(range);
        document.execCommand("copy");
        const audio = new Audio(audioUrl)
        audio.play()

    }

    return (
        <button
            className={styles.copyButton}
            onClick={handleCopy}>
            <span className={styles.icon} /> Copy notes
        </button>
    )
}

export default CopyButton


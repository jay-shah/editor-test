import React from 'react'
import styles from './CopyButton.module.css'
import audioUrl from './audio/copy.mp3'
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CopyButton = ({ updateCopyButtonClicked, template, uuid, ipAddr }) => {
    const sendNotes = () => {
        const url = `${process.env.REACT_APP_URL}store-user-notes/${uuid}`
        const data = {
            ip: ipAddr,
            notes: template
        }
        console.log(data)
        fetch(url, {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }

    const handleCopy = () => {
        updateCopyButtonClicked()
        const audio = new Audio(audioUrl)
        audio.play()
        sendNotes()
    }

    const parseNotes = () => {
        let templateNote = ''
        template.map((titles) => {
            let title = Object.keys(titles)[0]
            templateNote = `${templateNote}\n\n${title}:\n`
            titles[title].map((note) => {
                templateNote = `${templateNote}${note}\n`
                return true
            })
            return true
        })
        return templateNote
    }

    return (
        <CopyToClipboard text={parseNotes()} >
            < button
                className={styles.copyButton}
                onClick={handleCopy}>
                <span className={styles.icon} /> Copy notes
            </button>
        </CopyToClipboard >
    )
}

export default CopyButton


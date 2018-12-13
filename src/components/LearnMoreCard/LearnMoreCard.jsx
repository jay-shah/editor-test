import React from 'react'
import styles from './LearnMoreCard.module.css'

const LearnMoreCard = ({ showModal }) => {
    return (
        <div className={styles.cardConatiner}>
            <div className={styles.cardImage}></div>
            <div className={styles.cardTitle}>An AI dental assistant.</div>
            <div className={styles.cardParagraph}> Kiroku lets you spend significantly less time writing clinical notes.</div>
            <div><button className={styles.cardButton} onClick={showModal}>Learn more</button></div>
        </div>
    )
}

export default LearnMoreCard

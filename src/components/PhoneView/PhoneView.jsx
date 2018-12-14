import React from 'react'
import styles from './PhoneView.module.css'



const PhoneView = () => {
    return (
        <div className={styles.modal}>
        <div className={styles.illustration}>
        </div>
        <div className={styles.modaltextBold}>
            Kiroku isn't available on mobile (yet). <br></br>
            </div>
            <div className={styles.modalText}>
            Please view <a href="https://editor.trykiroku.com">the editor</a> on a larger screen.
            </div>
            <div className={styles.noPhone}>
            </div>
            <div className={styles.copyrightLogo}>
            </div>
            <div className={styles.copyright}>
                Copyright Kiroku Limited 2018
                </div>
        </div >
    )
}

export default PhoneView

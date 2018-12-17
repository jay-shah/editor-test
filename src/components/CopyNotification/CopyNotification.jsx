import React from 'react'
import styles from './CopyNotification.module.css'

const CopyNotification = ({ copyButtonClicked }) => {

    const handleOnClick = () => {
        window.scrollTo(0,0);
        window.location.reload();
    }


    if (copyButtonClicked) {
        return (
            <button
                className={styles.copyNotification}
                onClick={handleOnClick}
            >
                <span className={styles.icon} />
                Copied. Click to start a new appointment
                <span className={styles.icon2} />
            </button>)
    }

    return null
}

export default CopyNotification
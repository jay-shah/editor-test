import React from 'react'
import styles from './SignUpButton.module.css'

const SignUpButton = ({ showModal }) => {

    const handleOnClick = () => {
        showModal()
    }

    return (
        <div className={styles.signUp}><button onClick={handleOnClick} className={styles.signupButton}>Sign up</button></div>
    )
}

export default SignUpButton

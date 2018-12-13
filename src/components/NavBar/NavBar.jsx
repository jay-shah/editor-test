import React from 'react'
import styles from './NavBar.module.css'
import SignUpButton from './SignUpButton'

const NavBar = () => {
    return (
        <div className={styles.navBar}>
            <a href="#"><div className={styles.kirokuLogo}></div></a>
            <SignUpButton />
            <a href="mailto:hannah@trykiroku.com?subject=Equiry about Kiroku" target="_blank" rel="noopener noreferrer"><div className={styles.navList}>Contact</div></a>
            <a href="https://www.trykiroku.com" target="_blank" rel="noopener noreferrer"><div className={styles.navList}>About</div></a>
        </div>
    )
}

export default NavBar

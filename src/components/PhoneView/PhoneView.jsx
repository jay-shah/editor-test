import React from 'react'
import styles from './PhoneView.module.css'

const PhoneView = () => {
    return (
        <div className={styles.modal}>
            <div className={styles.flightPreloader} id="flight-preloader">
                <svg width="100px" height="100px" viewBox="0 0 200 200" version="1.1">
                    <title>loading-flight</title>
                    <defs></defs>
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <path d="M32.4348912,-0.200891226 C14.6325447,-0.200891226 0.200891226,14.2596834 0.200891226,32.097706 L0.200891226,168.391737 C0.200891226,176.957857 3.59696377,185.173132 9.64201145,191.230294 C22.2301711,203.843681 42.6396113,203.843681 55.227771,191.230294 L191.249214,54.9362629 C197.294262,48.8791013 200.690334,40.6638266 200.690334,32.097706 C200.690334,14.2596834 186.258681,-0.200891226 168.456334,-0.200891226 L32.4348912,-0.200891226 Z M0.200891226,168.391737 C0.200891226,186.22976 14.6325447,200.690334 32.4348912,200.690334 L168.456334,200.690334 C177.005322,200.690334 185.204166,197.287456 191.249214,191.230294 C203.837374,178.616907 203.837374,158.166567 191.249214,145.55318 L55.227771,9.25914908 C49.1827238,3.20198707 40.9838797,-0.200891226 32.4348912,-0.200891226 C14.6325447,-0.200891226 0.200891226,14.2596834 0.200891226,32.097706 L0.200891226,168.391737" id="Rectangle-2" transform="translate(100.445613, 100.244722) rotate(90.000000) translate(-100.445613, -100.244722) "></path>
                    </g>
                </svg>
            </div>
            <div className={styles.modalText}>
                Sorry about this. <br></br>
                The Kiroku editor only works on larger screens.
          </div>
        </div >
    )
}

export default PhoneView

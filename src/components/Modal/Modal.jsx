import React from 'react'
import styles from './Modal.module.css'

const Modal = ({ show }) => {

    if (show) {
        return (
            <div className={styles.modalbg}>
            <div className={styles.modal}>
            <div className={styles.close}></div>
            <div id="mc_embed_signup">
<form action="https://trykiroku.us16.list-manage.com/subscribe/post?u=96c14351ca3be8b6eae394fd9&amp;id=597f3e5a5a" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
<div id="mc_embed_signup_scroll">
<div className={styles.emailillustration}></div>
<div className={styles.modaltitleone}>Save even more time.</div>
<div className={styles.modaltitletwo}>Microphone enabled product, Kiroku will fill out your templates for you.</div>
<div className={styles.modaltitletwo}>Personalise your templates, and add templates for different appointment types.</div>
<div className={styles.modaltitletwo}>Email patients with diagnostic information and risks of treatments.</div>
<br></br>
<div>
<input type="text" className={styles.modalform} placeholder="First name"  name="FNAME" id="mce-FNAME"></input>
</div>
<div>
<input type="text" className={styles.modalform} placeholder="Last name" name="LNAME" id="mce-LNAME"></input>
</div>
<div >
<input type="email"  className={styles.modalform}placeholder="Email address" name="EMAIL" id="mce-EMAIL"></input>
</div>
<div className="mc-field-group">
<input className={styles.modalform} placeholder="Phone number (optional)" type="text" name="MMERGE3" id="mce-MMERGE3"></input>
</div>
<div id="mce-responses" className="clear">
<div id="mce-error-response" ></div>
<div id="mce-success-response" ></div>
</div><input className={styles.modalform} type="text" placeholder="City" name="b_96c14351ca3be8b6eae394fd9_597f3e5a5a" tabindex="-1"></input>
<div ><input className={styles.submitButton} type="submit" value="Sign up to test Kiroku" name="subscribe" id="mc-embedded-subscribe"></input></div>
</div>
</form>
</div>
                </div>
        </div>
        )
    }
    return null

}

export default Modal

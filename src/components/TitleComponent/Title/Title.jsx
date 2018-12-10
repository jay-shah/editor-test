import React, { Component } from 'react'
import styles from './Title.module.css'

export default class Title extends Component {
    render() {
        return (
            < div key={this.props.titlekey}
                contentEditable={true}
                suppressContentEditableWarning
                ref={this.props.titlekey}
                className={styles.title}
                onKeyDown={(e) => this.props.onKeyDownTitle(e, this.props.title)}
            >
                <h3>{this.props.title}</h3>
            </div >

        )
    }
}

import React from 'react'

const CopyButton = () => {


    const handleCopy = () => {
        let range = document.createRange();
        window.getSelection().removeAllRanges()
        range.selectNode(document.getElementById('thisistheid'));
        window.getSelection().addRange(range);
        document.execCommand("removeFormat");
        document.execCommand("copy");
    }


    return (
        <button onClick={handleCopy}>
            COPY
        </button>
    )
}

export default CopyButton

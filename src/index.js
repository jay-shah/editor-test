import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import * as serviceWorker from './serviceWorker';
import MetaTags from 'react-meta-tags'

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
    <Provider store={store}>
        <MetaTags >
            <title>Kiroku Editor — Automated clinical notes for dentists.</title>
            <meta name="title" content="Kiroku Editor — Automated clinical notes for dentists." />
            <meta name="description" content="With Kiroku Editor, dentists save time writing clinical notes with our easy to use note editor." />

            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://editor.trykiroku.com/" />
            <meta property="og:title" content="Kiroku Editor — Automated clinical notes for dentists." />
            <meta property="og:description" content="With Kiroku Editor, dentists save time writing clinical notes with our easy to use note editor." />
            <meta property="og:image" content="./metaimages/meta.png" />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://editor.trykiroku.com/" />
            <meta property="twitter:title" content="Kiroku Editor — Automated clinical notes for dentists." />
            <meta property="twitter:description" content="With Kiroku Editor, dentists save time writing clinical notes with our easy to use note editor." />
            <meta property="twitter:image" content="./metaimages/meta.png" />
        </MetaTags>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

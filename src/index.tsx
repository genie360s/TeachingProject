import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import InstituteRoutes from './InstituteFlow/InstituteRoutes';
import reportWebVitals from './reportWebVitals';
import {appContainer} from "./inversify.config";
import {Provider} from 'inversify-react';

ReactDOM.render(
    <React.StrictMode>
        <Provider container={appContainer}>
            <InstituteRoutes/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

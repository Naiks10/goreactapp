import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap/index.scss';
import App from './App';
import {StartPageMenu} from "./components/StartPageMenu/StartPageMenu"
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-css-only/css/bootstrap.min.css';
import history from './components/Functions/history'

//RenderDOM function as start-point in application (client)
ReactDOM.render(
    <Router history={history}>
        <App/>
    </Router>,
    document.getElementById('root')
);
serviceWorker.unregister();

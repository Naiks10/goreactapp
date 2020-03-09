import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap/index.scss';
import App from './App';
import {StartPageMenu} from "./components/StartPageMenu/StartPageMenu"
import * as serviceWorker from './serviceWorker';

import { BrowserRouter, HashRouter } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-css-only/css/bootstrap.min.css';
//import 'mdbreact/dist/css/mdb.css';

ReactDOM.render(
    <HashRouter>
        <App/>
    </HashRouter>,
    document.getElementById('root')
);
serviceWorker.unregister();

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ProviderApp from './components/ProviderApp'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.hydrate(
    <BrowserRouter>
        <ProviderApp />
    </BrowserRouter>
    , document.getElementById('root')
);

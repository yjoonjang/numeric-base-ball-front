import React from 'react'
import App from '../shared/App'
import { BrowserRouter } from 'react-router-dom'

const Root = () => {
    return (
        <div>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </div>
    )
}

export default Root
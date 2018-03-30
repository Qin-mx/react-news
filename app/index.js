import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import MediaQuery from 'react-responsive'; //使用地址 https://www.npmjs.com/package/react-responsive

import ComponentRoot from './js/root'

class Index extends React.Component{
    render(){
        return(
            <div>
                <ComponentRoot></ComponentRoot>
            </div>
           
        )
    }
}

ReactDOM.render(
    <Index></Index>,
    document.getElementById('app')
)
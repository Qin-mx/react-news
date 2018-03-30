import React from 'react'
import PCIndex from './components/pc_index'
import MobileIndex from './components/mobile_index'
import MediaQuery from 'react-responsive';

export default class ComponentRoot extends React.Component{
    render(){
        return (
            <div>
                {/* 处理响应式 */}
                <MediaQuery query="(min-device-width: 1224px)">
                    <PCIndex></PCIndex>
                </MediaQuery>
                <MediaQuery query="(max-device-width: 1224px)">
                    <MobileIndex></MobileIndex>
                </MediaQuery>
            </div>
            
        )
    }
}
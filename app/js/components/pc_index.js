import React from 'react'
import PCHeader from './pc_header'
import PCFooter from './pc_footer'

import PcNewsContainer from './pc_newscontainer'

export default class PCIndex extends React.Component{
    render(){
        return (
            <div>
                <PCHeader></PCHeader>
                <PcNewsContainer></PcNewsContainer>
                <PCFooter></PCFooter>
            </div>
            
        )
    }
}
import React from 'react'
import {BrowserRouter as Router ,HashRouter,MemoryRouter, Route , Switch ,Redirect} from 'react-router-dom'

import PCIndex from './components/pc_index'
import PCNewsDetails from './components/pc_news_details'
import MobileIndex from './components/mobile_index'
import MobileNewsDetails from './components/mobile_news_details'
import PCUserCenter from './components/pc_userenter'
import MobileUserCenter from './components/mobile_usercenter'
import MediaQuery from 'react-responsive'

export default class ComponentRoot extends React.Component{
    render(){
        return (
            <div>
                {/* 处理响应式 */}
                <MediaQuery query="(min-device-width: 1224px)">
                        <HashRouter>
                            <div>
                                <Route exact path="/" component={PCIndex}></Route>
                                <Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
                                <Route path='/usercenter' component={PCUserCenter}/>
                            </div> 
                        </HashRouter>
                    
                </MediaQuery>
                <MediaQuery query="(max-device-width: 1224px)">
                 <HashRouter>
                        <div>
                            <Route exact path="/" component={MobileIndex}></Route>
                            <Route exact path="/details/:uniquekey" component={MobileNewsDetails}></Route>
                            <Route exact path='/usercenter' component={MobileUserCenter}/>
                        </div> 
                     </HashRouter>
                </MediaQuery>
            </div>
            
        )
    }
}
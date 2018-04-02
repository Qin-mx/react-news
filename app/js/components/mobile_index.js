import React from 'react'
import { Tabs, Icon, Carousel } from 'antd';
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'
import MobileList from './mobile_list'

const TabPane = Tabs.TabPane;

export default class MobileIndex extends React.Component{
    render(){
        const settings = {
            dots: true,
            autoplay: true,
            speed: 500,
            slidesToShow: 1,
            infinite: true,
        }
        return (
            <div>
                <MobileHeader></MobileHeader>
                <Tabs>
                    <TabPane tab="头条" key="1">
                    <div className="carousel">
                        <Carousel {...settings}>
                            <div><img src="./app/images/carousel_1.png" alt="carousel"/></div>
                            <div><img src="./app/images/carousel_2.jpg" alt="carousel"/></div>
                            <div><img src="./app/images/carousel_3.jpg" alt="carousel"/></div>
                            <div><img src="./app/images/carousel_4.jpg" alt="carousel"/></div>
                        </Carousel>
                    </div>
                        <MobileList type="top" count={5}></MobileList>
                    </TabPane>
                    <TabPane tab="社会" key="2">
                        <MobileList type="shehui" count={5}></MobileList>
                    </TabPane>
                    <TabPane tab="国内" key="3">
                        <MobileList type="guonei" count={5}></MobileList>
                    </TabPane>
                    <TabPane tab="国际" key="4">
                        <MobileList type="guoji" count={5}></MobileList>
                    </TabPane>
                    <TabPane tab="娱乐" key="5">
                        <MobileList type="yule" count={5}></MobileList>
                    </TabPane>
                </Tabs>
                <MobileFooter></MobileFooter>
            </div>
            
        )
    }
}
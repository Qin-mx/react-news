import React from 'react'
import {Row, Col, Tabs, Icon, Carousel  } from 'antd';

import PCNewsBlock from './pc_news_block'
import PCNewsImageBlock from './pc_news_images_block'
const TabPane = Tabs.TabPane;

export default class PcNewsContainer extends React.Component{
    render() {
        const settings = {
            dots: true,
            autoplay: true,
            speed: 500,
            slidesToShow: 1,
            infinite: true,
        }
        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} className="container">
                        <div className="leftContainer">
                            <div className="carousel">
                            <Carousel {...settings}>
                                <div><img src="./app/images/carousel_1.png" alt="carousel"/></div>
                                <div><img src="./app/images/carousel_2.jpg" alt="carousel"/></div>
                                <div><img src="./app/images/carousel_3.jpg" alt="carousel"/></div>
                                <div><img src="./app/images/carousel_4.jpg" alt="carousel"/></div>
                            </Carousel>
                            </div>
                            <PCNewsImageBlock type="top" count={6} width="400px" cartTitle="头条新闻" imageWidth="112px"></PCNewsImageBlock>
                        </div>
                        <Tabs className="tabs_news">
                            <TabPane tab="头条新闻" key="1">
                                <PCNewsBlock count={25} type="top" width="100%" bordered="false"></PCNewsBlock>
                            </TabPane>
                            <TabPane tab="社会" key="2">
                                <PCNewsBlock count={25} type="shehui" width="100%" bordered="false"></PCNewsBlock>
                            </TabPane>
                            <TabPane tab="国内" key="3">
                                <PCNewsBlock count={25} type="guonei" width="100%" bordered="false"></PCNewsBlock>
                            </TabPane>
                            <TabPane tab="国际" key="8">
                                <PCNewsBlock count={25} type="guoji" width="100%" bordered="false"></PCNewsBlock>
                            </TabPane>
                            <TabPane tab="娱乐" key="4">
                                <PCNewsBlock count={25} type="yule" width="100%" bordered="false"></PCNewsBlock>
                            </TabPane>
                            <TabPane tab="体育" key="5">
                                <PCNewsBlock count={25} type="tiyu" width="100%" bordered="false"></PCNewsBlock>
                            </TabPane>
                            <TabPane tab="科技" key="6">
                                <PCNewsBlock count={25} type="keji" width="100%" bordered="false"></PCNewsBlock>
                            </TabPane>
                            <TabPane tab="时尚" key="7">
                                <PCNewsBlock count={25} type="shishang" width="100%" bordered="false"></PCNewsBlock>
                            </TabPane>

                        </Tabs>
                        <div>
                        <PCNewsImageBlock type="guoji" count={20} width="100%" cartTitle="国际新闻" imageWidth="112px"></PCNewsImageBlock>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}

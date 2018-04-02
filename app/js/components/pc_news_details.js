import React from 'react';
import {Row, Col, BackTop  } from 'antd';
import PCHeader from './pc_header'
import PCFooter from './pc_footer'
import PCNewsImageBlock from './pc_news_images_block'
import CommonComments from './common_comments'

export default class PCNewsDetails extends React.Component {
    constructor(){
        super();
        this.state ={
            newsItem: ''
        }
    }
    componentWillMount(){
        console.log(this.props.match.params.uniquekey)
        var myFetachOptions = {
            method: 'GET'
        }
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey, myFetachOptions)
        .then(response => response.json())
        .then(json => {
            console.log('是否进入接口')
			this.setState({newsItem: json});
			document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
		})
    }
    createMarkup(){
        return {__html: this.state.newsItem.pagecontent};
    }
    render(){
        return(
            <div>
                <PCHeader></PCHeader>
                <Row>
                    <Col span={2}></Col>
                    <Col span={14} className="container" >  
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>                    
                        <CommonComments uniquekey={this.props.match.params.uniquekey}></CommonComments>
                    </Col>
                    <Col span={6}>
                    <PCNewsImageBlock type="top" count={20} width="100%" cartTitle="" imageWidth="112px"></PCNewsImageBlock>
                    </Col>
                    <Col span={2}></Col>
                </Row>
     
                <PCFooter></PCFooter>
                <BackTop></BackTop>
            </div>
        )
    }
}

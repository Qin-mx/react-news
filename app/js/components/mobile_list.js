import React from 'react';
import {Row, Col } from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router'
import {NavLink} from 'react-router-dom';
import Tloader from 'react-touch-loader';
export default class MobileList extends React.Component {
	constructor() {
		super();
		this.state = {
			news: '',
			count: 5,
			hasMore: 0,
			initializing: 0,
			refreshedAt: Date.now(),
			autoLoadMore:true,
		};
	}
	componentWillMount() {
		var myFetchOptions = {
			method: 'GET'
		};
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions)
        .then(response => response.json())
        .then(json => this.setState({news: json}));
	}

	handleLoadMore(resove){
		setTimeout( ()=> {
			var count = this.state.count;
			this.setState({
				count: count +5,
			})
			var myFetchOptions = {
				method: 'GET'
			};
			fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.state.count, myFetchOptions)
			.then(response => response.json())
			.then(json => this.setState({news: json}));
			
			this.setState({
				hasMore: count>0&&count<50
			})
	
			resolve();
		},2e3);

	}
	componentDidMount(){
		setTimeout( ()=>{
				
			this.setState({
				hasMore: 1,
				initializing: 2,
			})
		},2e3)
	}
	render() {
		const {news} = this.state;
		const newsList = news.length
			? news.map((newsItem, index) => (
				<section key={index} className="m_article list-item spaecial_section clearfix">
                    <NavLink to={`details/${newsItem.uniquekey}`} >
                        <div className="m_article_img">
                            <img src={newsItem.thumbnail_pic_s} alt="{newsItem.title}"/>
                        </div>
                        <div className="m_article_info">
                            <div className="m_article_title">
                                <span>{newsItem.title}</span>
                            </div>
                            <div className="m_article_desc clearfix">
                                <div className="m_article_desc_l">
                                    <span className="m_article_channel">{newsItem.realtype}</span>
                                    <span className="m_article_time">{newsItem.date}</span>
                                </div>
                            </div>
                        </div>
					</NavLink>
				</section>
			))
			: '没有加载到任何新闻';
		return (
			<div>
				<Row>
                    <Col span={24}>
					

						<Tloader
							initializing={this.state.initializing}
							hasMore={this.state.hasMore}
							onLoadMore={this.handleLoadMore.bind(this)}
							autoLoadMore={this.state.autoLoadMore}
							className="tloader some class">
								{newsList}
						</Tloader>
                    </Col>
                </Row>
			</div>
		);
	};
}

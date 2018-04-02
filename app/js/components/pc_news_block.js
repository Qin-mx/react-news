import React from 'react';
import {Card} from 'antd';
import {Router, Route, NavLink, browserHistory} from 'react-router-dom'
export default class PCNewsBlock extends React.Component {
	constructor() {
		super();
		this.state = {
			news: ''
		};
	}
	componentWillMount() {
		var myFetchOptions = {
			method: 'GET'
		};
		var myHeaders = new Headers({
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'text/plain'
		});
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions,myHeaders)
        .then(response => response.json())
        .then(json => this.setState({news: json}));
	};
	render() {
		const {news} = this.state;
		const newsList = news.length
			? news.map((newsItem, index) => (
				<li key={index}>
                    <NavLink to={`details/${newsItem.uniquekey}`} target="_blank">
                    {/* <a href={`details/${newsItem.uniquekey}`}> */}
                        {newsItem.title}
                        {/* </a> */}
					</NavLink>
				</li>
			))
			: '没有加载到任何新闻';
		return (
			<div className="topNewsList">
				<Card>
					<ul>
						{newsList}
					</ul>
				</Card>
			</div>
		);
	};
}

import React from 'react'
import { Row, Col, Menu, Icon, Message, Form, Input, Button, Checkbox, Modal, message,Tabs,Card ,notification } from 'antd'
import {Router, Route, Link, browserHistory} from 'react-router'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


class CommonComments extends React.Component{
    constructor(){
        super();
        this.state = {
            comments: ''
        }
    }
    componentDidMount() {
        console.log('进入')
		var myFetchOptions = {
			method: 'GET'
		};
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions)
        .then(response => response.json())
        .then(json => {
            var jsons = json.slice(-10)
            this.setState({comments: jsons});
		});
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('提交')
		var myFetchOptions = {
			method: 'GET'
		};
		var formdata = this.props.form.getFieldsValue();
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formdata.remark, myFetchOptions)
        .then(response => response.json())
        .then(json => {
            this.componentDidMount();
            this.props.form.resetFields();
		})
    }
    addUserCollection() {
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
			//收藏成功以后进行一下全局的提醒
			notification['success']({message: 'ReactNews提醒', description: '收藏此文章成功'});
		});
    }
    
    render(){ 
        const { getFieldProps } = this.props.form;
        const {comments} = this.state;
        const commentList = comments.length
        ? comments.map((comment, index) => (
            <Card key={index} title={comment.UserName} extra={< a href = "javascript:void(0)" > 发布于 {comment.datetime} </a>}>
                <p>{comment.Comments}</p>
            </Card>
        ))
        : '没有加载到任何评论';
        return (
       
        <div className="comment">
            <Row>
                <Col spam={24}>
                {commentList}
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <FormItem label="您的评论">
                            <Input type="textarea" placeholder="随便写" {...getFieldProps('remark',{initialValue: ''})}/>
                        </FormItem>
                        <Button type="primary" htmlType="submit">提交评论</Button>
                        &nbsp;&nbsp;
						<Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
                    </Form>
                </Col>
            </Row>
        </div>
        )
    }
}


export default CommonComments = Form.create()(CommonComments) //必须封装否则报错
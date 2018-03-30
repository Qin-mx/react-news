import React from 'react'
import { Row, Col, Menu, Icon, Message, Form, Input, Button, Checkbox, Modal, message,Tabs } from 'antd'
import {Router, Route, Link, browserHistory} from 'react-router'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


class PCHeader extends React.Component{

    constructor(){
        super();
        this.state = {
            current: 'top',
            // 模态框是否显示
            modelVisible: false, 
            // 状态
            action: 'login',
            // 是否登录成功
            hasLogined: false,
            // 用户名为空
            userNickName: '',
            userId: 0
        }
    }

    handleClick(e){
        console.log(e)
        if(e.key == 'register'){
            this.setState({current: 'register',modelVisible: true});
        }else{
            this.setState({
                current: e.key
            })
        }  
    }

    handleSubmit(e){
        e.preventDefault();
        // 获取页面数据
        var formData = this.props.form.getFieldsValue();
        console.log('收到表单值：', this.props.form.getFieldsValue());

        var myFetchOptions = {
            methods: 'GET',
        }
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
		+ "&username="+formData.userName+"&password="+formData.password
		+"&r_userName=" + formData.r_userName + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
		+ formData.r_confirmPassword, myFetchOptions)
        .then(response => response.json())
        .then( data => {
            this.setState({
                userNickName: data.NickuserName,
                userId: data.UserId
            })
        });
        message.success('请求成功！');
        this.setmodelVisible(false);
    }

    setmodelVisible(modelVisible) {
        this.setState({ modelVisible });
    }

    callback(key) {
		if (key == 1) {
			this.setState({action: 'login'});
		} else if (key == 2) {
			this.setState({action: 'register'});
		}
    };
    
    render(){
        const { getFieldProps } = this.props.form;
        const userShow = this.state.hasLogined
        ?
        <Menu.Item key="logout" className="register">
            <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
            &nbsp; &nbsp;
            <Link target="_blank">
                <Button type="dashed" htmlType="button">个人中心</Button>
            </Link>
            &nbsp; &nbsp;
            <Button type="ghost" htmlType="button">退出</Button>
        </Menu.Item>
        :
        <Menu.Item key="register" className="register">
            <Icon type="appstore"/>注册/登录
        </Menu.Item>;
        return (
            <header>
                <Row>
                    {/* // 左右空开 */}
                    <Col span={2}></Col>
                    <Col span={4}>
                        <a href="/" className="logo">
                            <img src="./app/images/news.png" alt="logo"/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={16}>
                        <Menu mode="horizontal" selectedKeys={[this.state.current]} onClick={this.handleClick.bind(this)}>
                            <Menu.Item key="top">
                            <Icon type="appstore"/>精选
                            </Menu.Item>
                            <Menu.Item key="shehui">
                            <Icon type="appstore"/>社会
                            </Menu.Item>
                            <Menu.Item key="guonei">
                            <Icon type="appstore"/>国内
                            </Menu.Item>
                            <Menu.Item key="guoji">
                            <Icon type="appstore"/>国际
                            </Menu.Item> 
                            <Menu.Item key="yule">
                            <Icon type="appstore"/>娱乐
                            </Menu.Item>
                            <Menu.Item key="tiyu">
                            <Icon type="appstore"/>体育
                            </Menu.Item>
                            <Menu.Item key="keji">
                            <Icon type="appstore"/>科技
                            </Menu.Item>
                            <Menu.Item key="shishang">
                            <Icon type="appstore"/>时尚
                            </Menu.Item>
                            {userShow}
                        </Menu>

                        <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modelVisible}  
                        onCancel={() => this.setmodelVisible(false)} onOk={() => this.setmodelVisible(false)} okText="关闭" cancelText="取消">
                        <Tabs type="card" onChange={this.callback.bind(this)}>
								<TabPane tab='注册' key="1">
                            <Form  onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem
                                    label="账户"
                                    >
                                    <Input placeholder="请输入账户名"
                                        {...getFieldProps('userName')}
                                    />
                                </FormItem>
                                <FormItem
                                    label="密码"
                                    >
                                    <Input type="password" placeholder="请输入密码"
                                        {...getFieldProps('password')}
                                    />
                                </FormItem>
                                <FormItem
                                    label="确认密码"
                                    >
                                    <Input type="password" placeholder="请再次输入密码"
                                        {...getFieldProps('confirmPassword')}
                                    />
                                </FormItem>
                                <Button type="primary" htmlType="submit">注册</Button>
                            </Form>
                            </TabPane>
							</Tabs>
                        </Modal>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        )
    }
}

export default PCHeader = Form.create()(PCHeader) //必须封装否则报错
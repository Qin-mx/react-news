import React from 'react'
import { Row, Col , Menu, Icon, Message, Form, Input, Button, Checkbox, Modal, message } from 'antd'
import {NavLink} from 'react-router-dom'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;

class MobileHeader extends React.Component{
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
    componentWillMount(){
		if (localStorage.userid!='') {
			this.setState({hasLogined:true});
			this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid});
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

    login(){
        this.setmodelVisible(true);
    }

    render(){
        const { getFieldProps } = this.props.form;
        const userShow = this.state.hasLogined
        ?
        <NavLink exact to="/usercenter" target="_blank">
             <Icon type="user"/>
        </NavLink>
        :
        <Icon type="setting" onClick={this.login.bind(this)} />;
        return (
            <div id="mobileheader">
                <header>
                    <a href="#">
                    <img src="./app/images/news.png" alt="logo"/>
                    </a>
                   
                    <span>ReactNews</span>
                    {userShow}
                </header>

                <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modelVisible}  
                        onCancel={() => this.setmodelVisible(false)} onOk={() => this.setmodelVisible(false)} okText="关闭" cancelText="取消">
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
                        </Modal>
            </div>
        )
    }
}

export default MobileHeader = Form.create()(MobileHeader) //必须封装否则报错
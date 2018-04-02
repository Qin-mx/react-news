import React from 'react'
import { Upload, Row, Col, Modal,Tabs ,Menu,Form ,Icon ,Card  } from 'antd'
import {Router, Route, NavLink, browserHistory} from 'react-router-dom'
import PCHeader from './pc_header'
import PCFooter from './pc_footer'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


export default class PCUserCenter extends React.Component{
    constructor(){
        super();
        this.state = {
            priviewVisible: false,
            priviewImage: '',
            usercollection: '',
			usercomments: '',
        }
    }

    componentDidMount() {
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercollection:json});
		});

		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercomments:json});
		});
    }

    handleCancel() {
        this.setState({
          priviewVisible: false,
        });
    }
    render(){
        const props = {
            action: 'http://newsapi.gugujiankong.com/handler.ashx',
            headers: {
                'Access-Control-Allow-Origin':'*'
            },
            listType: 'picture-card', // 样式
            defaultFileList: [{
              uid: -1,
              name: 'xxx.png',
              status: 'done', //状态
              url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
              thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png', //缩列图
            }],
            onPreview: (file) => {
              this.setState({
                priviewImage: file.url,
                priviewVisible: true,
              });
            },
          };
          const {usercollection,usercomments} = this.state;
          const usercollectionList = usercollection.length?
          usercollection.map((uc,index)=>(
              <Card key={index} title={uc.uniquekey} extra={<a target="_blank" href={`/#/details/${uc.uniquekey}`}>详情</a>}>
                <p>{uc.Title}</p>
              </Card>
          ))
          :
          '先去收藏一些新闻吧！';
          console.log(usercollection.length+'长度')
          const usercommentsList = usercomments.length ?
          usercomments.map((comment,index)=>(
                  <Card key={index} title={`于 ${comment.datetime} 评论了文章`} extra={<a href={`/#/details/${comment.uniquekey}`}>查看</a>}>
                      <p>{comment.Comments}</p>
                  </Card>
          ))
          :
          '您还没有发表过任何评论。';
        return (
            <div>
                <PCHeader></PCHeader>
                <Row>
                    <Col span="2"></Col>
                    <Col span="20">
                        <Tabs>
                            <TabPane tab="收藏列表" key="1">
                                <div className="comment">
                                    <Row>
                                        <Col span={24}>
                                         {usercollectionList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="评论列表" key="2">
                                    <Row>
                                        <Col span={24}>
                                         {usercommentsList}
                                        </Col>
                                    </Row>
                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <div className="clearfix">
                                        <Upload {...props}>
                                            <Icon type="plus" />
                                            <div className="ant-upload-text">上传照片</div>
                                        </Upload>
                                        <Modal visible={this.state.priviewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                                            <img alt="example" src={this.state.priviewImage} />
                                        </Modal>
                                    </div>	
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span="2"></Col>

                </Row>
                
                <PCFooter></PCFooter>
            </div>

        )
    }
}
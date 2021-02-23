import React from 'react';
import './index.less';
import { withRouter } from 'react-router-dom';
import { Avatar,Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import cookie from 'react-cookies'
import { Menu, Dropdown,message } from 'antd';
const HeadBar = (props) => {
    const { ifshow, setIfshow } = props;
    const goLogin = () => {
        setIfshow();
    }
    const exit = () => {
        cookie.remove('username', { path: '/' });
        cookie.remove('userId', { path: '/' });
        cookie.remove('userId.sig', { path: '/' });
        message.info('注销成功');
        props.history.replace(props.history.location.pathname);
    }
    const goPersonal = () => {
        props.history.push('/personal')
    }
    const menu = (
        <Menu>
            <Menu.Item onClick={goPersonal}>
                我的
            </Menu.Item>
            <Menu.Item onClick={exit}>
                注销
            </Menu.Item>
        </Menu>
    )
    return (
        <div className="HeadBar">
            <img className="logo" src="./logo.jpg" alt="logo" />
            {
                cookie.load('username') ? (
                    <Dropdown overlay={menu}>
                        <div onClick={goPersonal} className="login">
                            <span>{cookie.load('username')}</span>
                            <Avatar icon={<UserOutlined />} src={cookie.load('avatar')}/>
                            
                        </div>
                    </Dropdown>
                ) : (
                        <div onClick={setIfshow} className="login">
                            <span>登录</span>
                            <Avatar icon={<UserOutlined />} />
                        </div>
                    )
            }

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        ifshow: state.ifShow
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setIfshow: () => { dispatch({ type: 'setIfShow' }) }
    }
}
const ReduxConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)
export default ReduxConnect(withRouter(HeadBar));
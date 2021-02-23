import React, { useState } from 'react';
import './index.less';
import { Input, Button,message } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies'
const Login = (props) => {
    const { ifshow, setIfshow } = props;
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const hide = () => {
        setIfshow();
        setEmail('');
        setPwd('');
    }
    const login = () => {
        axios.post('/api/login', {
            email: email,
            password: pwd
        }).then(res => {
            if (res.data.code === 200) {
                cookie.save('username', res.data.username, { path: '/' });
                cookie.save('avatar', res.data.avatar, { path: '/' });
                cookie.save('id', res.data.id, { path: '/' });
                message.info('登录成功');
                hide();
                props.history.replace('/index/index');
            } else {
                message.info(res.data.msg);
            }
        })
    }
    return (
        <div className="Login" style={ifshow ? { display: 'flex' } : { display: 'none' }}>
            <div className="Form">
                <label>邮箱</label>
                <Input onChange={(e) => { setEmail(e.target.value) }} value={email} />
                <label>密码</label>
                <Input.Password onChange={(e) => { setPwd(e.target.value) }} value={pwd} />
                <Button type="primary" onClick={login}>登录</Button>
                <a target="_blank" href="#/register">注册</a>
            </div>
            <div className="shadow" onClick={hide}>

            </div>
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
export default ReduxConnect(withRouter(Login));
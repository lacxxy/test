import React from 'react';
import './index.less';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const HeadBar = () => {
    return (
        <div className="HeadBar">
            <img src="./logo.jpg" alt="logo" />
            <div className="login">
                <span>登录</span>
                <Avatar icon={<UserOutlined />} />
            </div>
        </div>
    )
}
export default HeadBar;
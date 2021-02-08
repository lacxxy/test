import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { guide } from '../../const/index';
import './index.less'
const Nav = () => {
    return (
        <div className="Nav">
            <Menu className="Nav-inner" mode="horizontal">
                <Menu.Item className="Nav-inner-item" key='index'>
                    <Link to={`/index/index`}>首页</Link>
                </Menu.Item>
                {
                    guide.map(item => {
                        return (
                            <Menu.Item className="Nav-inner-item" key={item.key}>
                                <Link to={`/index/${item.key}`}>{item.text}</Link>
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
        </div>
    )
}
export default Nav;
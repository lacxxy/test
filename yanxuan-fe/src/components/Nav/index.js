import React from 'react';
import { Menu, Button } from 'antd';
import './index.less'
const Nav = () => {
    const guide = [
        { key: 'index', text: '首页' },
        { key: 'home', text: '居家生活' },
        { key: 'cloth', text: '服饰鞋包' },
        { key: 'food', text: '美食酒水' },
        { key: 'clean', text: '个护清洁' },
        { key: 'child', text: '母婴亲子' },
        { key: 'sport', text: '运动旅行' },
        { key: 'digit', text: '数码家电' },
        { key: 'world', text: '严选全球' },
    ]
    return (
        <div className="Nav">
            <Menu className="Nav-inner" mode="horizontal">
                {
                    guide.map(item => {
                        return (
                            <Menu.Item className="Nav-inner-item" key={item.key}>
                                {item.text}
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
        </div>
    )
}
export default Nav;
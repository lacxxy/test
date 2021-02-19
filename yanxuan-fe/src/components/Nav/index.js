import React,{useEffect,useState} from 'react';
import { Menu } from 'antd';
import { Link,withRouter } from 'react-router-dom';
import { guide } from '../../const/index';
import './index.less'
const Nav = (props) => {
    const [selectKey,setSelectKey]=useState('');
    useEffect(()=>{
        const pathname=props.location.pathname;
        const arr=pathname.split('/');
        const key=arr[arr.length-1]
        setSelectKey(key);
    },[props])
    return (
        <div className="Nav">
            <Menu selectedKeys={selectKey} onClick={(item)=>{setSelectKey(item.key)}} theme="dark" className="Nav-inner" mode="horizontal">
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
export default withRouter(Nav);
import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import PtsList from '../../components/PtsList/index';
import ReplyList from '../../components/ReplyList/index';
import PersonSide from '../../components/PersonSide/index';
import './index.less';
import axios from 'axios'
const Personal = () => {
    const [ListData, setListData] = useState([]);
    const [myData, setMydata] = useState({});
    const [selectKey, setSelectKey] = useState('posting');
    const handelChange = (item) => {
        const key = item.key;
        setSelectKey(key);
        if (key == 'posting') {
            getHistory()
        } else if (key == 'reply') {
            getReply()
        }
    }
    const getReply = () => {
        axios.get(`/api/getRlyHistory`).then(res => {
            if (res.data.code === 200) {
                setListData(res.data.data)
            }
        });
    }
    const getHistory = () => {
        axios.get(`/api/getHistory`).then(res => {
            if (res.data.code === 200) {
                setListData(res.data.data)
            }
        });
    }
    const getMyData = () => {
        axios.get('/api/getMes').then(res => {
            if (res.data.code === 200) {
                setMydata(res.data.data[0])
            }
        })
    }
    useEffect(() => {
        getHistory();
        getMyData();
    }, [])
    return (
        <div className="Personal">
            <div className="menu">
                <Menu onClick={handelChange} defaultSelectedKeys="posting" mode="horizontal">
                    <Menu.Item key="posting">
                        历史发帖
                    </Menu.Item>
                    <Menu.Item key="reply">
                        历史回复
                    </Menu.Item>
                </Menu>
                <div>
                    {selectKey === 'posting' ? <PtsList className="list" data={ListData} /> : <ReplyList data={ListData} />}
                </div>
            </div>
            <PersonSide data={myData} />
        </div>
    )
}
export default Personal;
import React, { useState } from 'react';
import { Avatar, List, Image } from 'antd';
import { withRouter } from 'react-router-dom';
import {
    RollbackOutlined,
    ReadOutlined
} from '@ant-design/icons';
import './index.less';
import Quote from '../Quote/index';
import moment from 'moment';
import axios from 'axios';
import cookie from 'react-cookies';
const Comment = (props) => {
    const [reply, setReply] = useState([]);
    const [ifshow, setIfshow] = useState(false);
    const dateFormatter = (value) => {
        var date = moment.parseZone(value).local().format('YYYY-MM-DD HH:mm');
        return date;
    }
    const toBottom = () => {
        window.scroll({ top: document.body.clientHeight, left: 0, behavior: 'smooth' });
    }
    const getReply = () => {
        axios.get(`/api/getReply?id=${props.data.id}`).then(res => {
            if (res.data.code === 200) {
                setReply(res.data.data)
            }
        })
    }
    const dlt = () => {
        const ifDlt = window.confirm('确认删除?');
        if (!ifDlt) return;
        axios.delete('/api/dltCmt', {
            data: {
                id: props.data.id
            }
        }).then(res => {
            alert(res.data.msg);
            props.history.replace(props.history.location.pathname);
        })
    }
    return (
        <div className="Comment">
            <Avatar style={{ width: '50px', height: '50px' }} className="avatar" src={props.data.avatar} />
            <div className="comment-msg">
                <span className="username">{props.data.username}</span>
                <span className="date">{dateFormatter(props.data.date)}</span>
                <span className="num">{props.data.index + 1}楼</span>
                {props.data.quote ? <Quote username={props.data.quote.username} word={props.data.quote.word} cancel={false} /> : ''}
                <p dangerouslySetInnerHTML={{ __html: props.data.word }}></p>
                <span className="bottom-icon" onClick={() => { props.setReplyData(props.data); toBottom() }}><RollbackOutlined />回复</span>
                {props.data.nextCount ? <span className="bottom-icon" onClick={() => { getReply(); setIfshow(!ifshow) }}><ReadOutlined />查看评论 ( {props.data.nextCount} )</span> : ''}
                {cookie.load('id') == props.data.authorid ? <span onClick={dlt} className="delete">删除</span> : ''}
                {
                    ifshow ? <List
                        style={{ marginBottom: '20px' }}
                        dataSource={reply}
                        bordered
                        pagination={{
                            pageSize: 5
                        }
                        }
                        renderItem={(item, index) => (
                            <List.Item>
                                <div className="Comment">
                                    <Avatar style={{ width: '50px', height: '50px' }} className="avatar" src={item.avatar} />
                                    <div className="comment-msg">
                                        <span className="username">{item.username}</span>
                                        <span className="date">{dateFormatter(item.date)}</span>
                                        <p dangerouslySetInnerHTML={{ __html: item.word }}></p>
                                        <span className="bottom-icon" onClick={() => { props.setReplyData(item); toBottom() }}><RollbackOutlined />回复</span>
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    /> : ""
                }
            </div>
        </div>
    )
}
export default withRouter(Comment);
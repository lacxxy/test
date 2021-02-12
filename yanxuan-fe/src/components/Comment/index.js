import React, { useState } from 'react';
import { Avatar, List } from 'antd';
import {
    RollbackOutlined,
    ReadOutlined
} from '@ant-design/icons';
import './index.less';
import Quote from '../Quote/index';
import moment from 'moment';
import axios from 'axios';
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
    return (
        <div className="Comment">
            <Avatar style={{ width: '50px', height: '50px' }} className="avatar" src={props.data ? props.data.avatar : ''} />
            <div className="comment-msg">
                <span className="username">{props.data.username}</span>
                <span className="date">{dateFormatter(props.data.date)}</span>
                <span className="num">{props.data.index + 1}楼</span>
                {props.data.quote ? <Quote username={props.data.quote.username} word={props.data.quote.word} cancel={false} /> : ''}
                <p dangerouslySetInnerHTML={{ __html: props.data.word }}></p>
                <span className="bottom-icon" onClick={() => { props.setReplyData(props.data); toBottom() }}><RollbackOutlined />回复</span>
                {props.data.nextCount ? <span className="bottom-icon" onClick={() => { getReply(); setIfshow(!ifshow) }}><ReadOutlined />查看评论 ( {props.data.nextCount} )</span> : ''}
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
                                <div className="comment-msg">
                                    <span className="username">{item.username}</span>
                                    <span className="date">{dateFormatter(item.date)}</span>
                                    <p dangerouslySetInnerHTML={{ __html: item.word }}></p>
                                    <span className="bottom-icon" onClick={() => { props.setReplyData(item); toBottom() }}><RollbackOutlined />回复</span>
                                </div>
                            </List.Item>
                        )}
                    /> : ""
                }
            </div>
        </div>
    )
}
export default Comment;
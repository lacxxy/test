import React from 'react';
import { Avatar } from 'antd';
import {
    RollbackOutlined
} from '@ant-design/icons';
import './index.less';
import Quote from '../Quote/index';
import moment from 'moment';
const Comment = (props) => {
    const dateFormatter = (value) => {
        var date = moment.parseZone(value).local().format('YYYY-MM-DD HH:mm');
        return date;
    }
    const toBottom = () => {
        window.scroll({ top: document.body.clientHeight, left: 0, behavior: 'smooth' });
    }
    return (
        <div className="Comment">
            <Avatar style={{ width: '50px', height: '50px' }} className="avatar" src={props.data ? props.data.avatar : ''} />
            <div className="comment-msg">
                <span className="username">{props.data ? props.data.username : ''}</span>
                <span className="date">{props.data ? dateFormatter(props.data.date) : ''}</span>
                <span className="num">{props.data ? props.data.index + 1 : ''}楼</span>
                {props.data.quote ? <Quote username={props.data.quote.username} word={props.data.quote.word} cancel={false} /> : ''}
                <p dangerouslySetInnerHTML={{ __html: props.data ? props.data.word : '' }}></p>
                <span className="reply" onClick={() => { props.setReplyData(); toBottom() }}><RollbackOutlined />回复</span>
            </div>
        </div>
    )
}
export default Comment;
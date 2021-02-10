import React from 'react';
import { Avatar } from 'antd';
import './index.less';
import moment from 'moment';
const Comment = (props) => {
    const dateFormatter = (value) => {
        var date = moment.parseZone(value).local().format('YYYY-MM-DD HH:mm');
        return date;
    }
    return (
        <div className="Comment">
            <Avatar style={{ width: '50px', height: '50px' }} className="avatar" src={props.data ? props.data.avatar : ''} />
            <div className="comment-msg">
                <span className="username">{props.data ? props.data.username : ''}</span>
                <span className="date">{props.data ? dateFormatter(props.data.date) : ''}</span>
                <span className="num">{props.data?props.data.index+1:''}楼</span>
                <p dangerouslySetInnerHTML={{ __html: props.data ? props.data.word : '' }}></p>
            </div>
        </div>
    )
}
export default Comment;
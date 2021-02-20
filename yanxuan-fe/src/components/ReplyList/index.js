import React from 'react';
import { List } from 'antd';
import './index.less';
import moment from 'moment';
const ReplyList = (props) => {
    function dateFormatter(value) {
        var date = moment.parseZone(value).local().format('YYYY-MM-DD HH:mm');
        return date;
    }
    return (
        <div className="ReplyList">
            <List
                size="large"
                pagination={{
                    pageSize: 8,
                }}
                bordered
                dataSource={props.data}
                renderItem={item => <List.Item>
                    <a target="_blank" href={`#/detail/${item.postingId}`} dangerouslySetInnerHTML={{ __html: item.word }} />
                    <span>{dateFormatter(item.date)}</span>
                </List.Item>}
            />

        </div>
    )
}
export default ReplyList;
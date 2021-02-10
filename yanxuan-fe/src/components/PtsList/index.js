import React from 'react';
import { List } from 'antd';
import './index.less';
import moment from 'moment';
const PtsList = (props) => {
    function dateFormatter(value) {
        var date = moment.parseZone(value).local().format('YYYY-MM-DD HH:mm');
        return date;
    }
    return (
        <div className="PtsList">
            <List
                size="large"
                pagination={{
                    pageSize: 15,
                }}
                bordered
                dataSource={props.data}
                renderItem={item => <List.Item>
                    <a target="_blank" href={`#/detail/${item.id}`}>{item.title}</a>
                    <span>{dateFormatter(item.date)}</span>
                </List.Item>}
            />

        </div>
    )
}
export default PtsList;
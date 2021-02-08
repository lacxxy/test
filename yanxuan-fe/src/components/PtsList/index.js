import React from 'react';
import { List } from 'antd';
import './index.less';
import moment from 'moment';
const PtsList = (props) => {
    function dateFormatter(value) {
        var date = moment.parseZone(value).local().format('HH:mm:ss YYYY-MM-DD');
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
                    <a href={''}>{item.title}</a>
                    <span>{dateFormatter(item.date)}</span>
                </List.Item>}
            />

        </div>
    )
}
export default PtsList;
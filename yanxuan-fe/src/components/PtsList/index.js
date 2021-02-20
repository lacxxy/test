import React from 'react';
import { List } from 'antd';
import './index.less';
import moment from 'moment';
import { guide } from '../../const/index';
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
                    pageSize: props.pageSize,
                    total:props.data.total,
                    onChange:(current)=>{props.handleChange(current-1)}
                }}
                bordered
                dataSource={props.data.data}
                renderItem={item => <List.Item className="item">
                    <span className="front">
                        <a target="_blank" href={`#/detail/${item.id}`}>{item.title}</a>
                        <span className="type">{item.type ? guide[item.type - 1].text : ''}</span>
                    </span>
                    <span>
                        <span className="num">{(item.num||0)  + '条回复'}</span>
                        <span>{dateFormatter(item.date)}</span>
                    </span>

                </List.Item>}
            />

        </div>
    )
}
export default PtsList;
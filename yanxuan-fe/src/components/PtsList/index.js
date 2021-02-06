import React from 'react';
import { List } from 'antd';
import './index.less';
const PtsList = (props) => {

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
                </List.Item>}
            />

        </div>
    )
}
export default PtsList;
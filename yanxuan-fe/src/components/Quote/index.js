import React from 'react';
import './index.less';
import {
    CloseOutlined
} from '@ant-design/icons';
const quote = (props) => {

    return (
        <div className="Quote" >
            {props.cancel ? <CloseOutlined className="close" onClick={() => { props.cancel() }} /> : ''}
            <p>引用 {props.username} 发表的: </p>
            <p dangerouslySetInnerHTML={{ __html: props.word }}></p>
        </div>
    )
}
export default quote;
import React from 'react';
import './index.less';
import { Avatar, Image } from 'antd';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const PersonSide = (props) => {
    const config = {
        name: 'file',
        action: '/api/editHead',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    }
    return (
        <div className="PersonSide">
            <Avatar className="avatar" src={<Image src={props.data.avatar} />}></Avatar>
            <div>
                <Upload {...config}>
                    <Button icon={<UploadOutlined />}>上传头像</Button>
                </Upload>
            </div>
            <p>{props.data.email}</p>
            <p>{props.data.username}</p>
        </div>
    )
}
export default PersonSide;
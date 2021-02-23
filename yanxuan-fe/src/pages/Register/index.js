import React from 'react';
import { Form, Input, Button, message } from 'antd';
import './index.less';
import axios from 'axios';
import Nav from '../../components/Nav/index';
import cookie from 'react-cookies';
const Rgst = (props) => {
    const [form] = Form.useForm();
    const submit = () => {
        axios.post('/api/register', form.getFieldsValue()).then(res => {
            message.info(res.data.msg);
            if (res.data.code == 200) {
                const { username, avatar, id } = res.data;
                cookie.save('username', username, { path: '/' });
                cookie.save('avatar', avatar, { path: '/' });
                cookie.save('id', id, { path: '/' });
                props.history.push('/index/index')
            }
        })
    }
    return (
        <div className="Rgst">
            <Form form={form} onFinish={submit} className="form">
                <Form.Item
                    className="form-item"
                    name="email"
                    label="邮箱"
                    rules={[{ required: true, message: '请输入邮箱' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    name="username"
                    label="用户名"
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    name="password"
                    label="密码"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    name="confirm"
                    label="确认密码"
                    dependencies={['password']}
                    rules={[{ required: true, message: '请确认密码' }, ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('密码不一致');
                        },
                    }),]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">注册</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default Rgst;
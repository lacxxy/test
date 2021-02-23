import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Edit from '../../components/Edit/index';
import Comment from '../../components/Comment/index';
import Quote from '../../components/Quote/index';
import './index.less';
import moment from 'moment';
import cookie from 'react-cookies';
import { Avatar, Button, List, Image,message } from 'antd';
const Detail = (props) => {
    const id = props.match.params.id;
    const [current, setCurrent] = useState(0);
    const [detailData, setDetailData] = useState([]);
    const [headData, setHeadData] = useState({});
    const [replyData, setReplyData] = useState({});
    const edit = useRef();
    const dateFormatter = (value) => {
        var date = moment.parseZone(value).local().format('YYYY-MM-DD HH:mm');
        return date;
    }
    const clearInput = () => {
        edit.current.setVal('');
    }
    const submit = () => {
        const text = edit.current.getVal();
        if (!text.length) {
            message.info('无法为空!')
            return;
        }
        if (!cookie.load('username')) {
            message.info('请先登录!')
            return;
        }
        const params = {
            word: text,
            postingId: id,
            superiorId: replyData.id || -1,
        };
        axios.post('/api/newCmt', params).then(res => {
            const data = res.data;
            message.info(data.msg);
            if (data.code == 200) {
                clearInput();
                props.history.go(0)
            }
        })
    }
    const dataFormatter = (value) => {
        let res = [];
        const find = (val) => {
            for (let item of value) {
                if (item.id == val) {
                    return {
                        username: item.username,
                        word: item.word
                    }
                }
            }
            return {
                username: '',
                word: ''
            }
        }
        res = value.map(item => {
            if (item.superiorId === -1) {
                return item
            } else {
                return {
                    ...item,
                    quote: find(item.superiorId)
                }
            }
        })
        return res;
    }
    const handleCurrentChange = (page) => {
        setCurrent(page);
        axios.get(`/api/getDetail?id=${id}&index=${page}`).then(res => {
            const data = res.data;
            if (data.code == 200) {
                data.data.comments = dataFormatter(data.data.comments)
                setDetailData(data.data);
            }
        });
    }
    const deletePst = () => {
        const ifDlt = window.confirm('确认删除?');
        if (!ifDlt) return;
        axios.delete('/api/dltPst', {
            data: {
                id: id
            }
        }).then(res => {
            message.info(res.data.msg);
        })
    }
    useEffect(() => {
        axios.get(`/api/getDetail?id=${id}&index=0`).then(res => {
            const data = res.data;
            if (data.code == 200) {
                data.data.comments = dataFormatter(data.data.comments)
                setDetailData(data.data);
                setHeadData(data.data.head);
            }
        });
    }, [props])

    return (
        <div className="Detail">
            <div className="title-area">
                <span className="title">{headData.title}</span>
                {cookie.load('id') == headData.id ? <span className="delete" onClick={deletePst}>删除</span> : ''}
            </div>
            <div className="comment">
                <Avatar style={{ width: '50px', height: '50px' }} className="avatar" src={detailData.head ? detailData.head.avatar : ''} />

                <div className="comment-msg">
                    <span className="username">{headData.username}</span>
                    <span className="date">{dateFormatter(headData.date)}</span>
                    <p dangerouslySetInnerHTML={{ __html: headData.word }}></p>
                </div>
            </div>
            {
                <List
                    style={{ marginBottom: '20px' }}
                    dataSource={detailData.comments}
                    pagination={{
                        pageSize: 8,
                        total: headData.count | 0,
                        onChange: (index) => { handleCurrentChange(index - 1) }
                    }
                    }
                    renderItem={(item, index) => (
                        <List.Item>
                            <Comment data={{ ...item, index: index + current * 8 }} setReplyData={setReplyData} key={item.id} />
                        </List.Item>
                    )}
                />
            }
            {
                replyData.id ? <Quote username={replyData.username} word={replyData.word} cancel={() => { setReplyData({}) }} /> : ''
            }
            <Edit ref={edit} />
            <Button onClick={() => { submit() }}>回复</Button>
        </div>
    )
}
export default Detail;
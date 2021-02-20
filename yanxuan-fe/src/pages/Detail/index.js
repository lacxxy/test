import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Edit from '../../components/Edit/index';
import Comment from '../../components/Comment/index';
import Quote from '../../components/Quote/index';
import './index.less';
import moment from 'moment';
import cookie from 'react-cookies';
import { Avatar, Button, List, Image } from 'antd';
const Detail = (props) => {
    const id = props.match.params.id;
    const [current, setCurrent] = useState(0);
    const [detailData, setDetailData] = useState([]);
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
            alert("不能为空");
            return;
        }
        if (!cookie.load('username')) {
            alert("请先登录");
            return;
        }
        const params = {
            word: text,
            postingId: id,
            superiorId: replyData.id || -1,
        };
        axios.post('/api/newCmt', params).then(res => {
            const data = res.data;
            alert(data.msg);
            if (data.code == 200) {
                clearInput();
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
    useEffect(() => {
        axios.get(`/api/getDetail?id=${id}&index=0`).then(res => {
            const data = res.data;
            if (data.code == 200) {
                data.data.comments = dataFormatter(data.data.comments)
                setDetailData(data.data)
            }
        });
    }, [props])

    return (
        <div className="Detail">
            <p className="title">{detailData.head ? detailData.head.title : ''}</p>
            <div className="comment">
                <Avatar style={{ width: '50px', height: '50px' }} className="avatar" src={detailData.head ? detailData.head.avatar : ''} />

                <div className="comment-msg">
                    <span className="username">{detailData.head ? detailData.head.username : ''}</span>
                    <span className="date">{detailData.head ? dateFormatter(detailData.head.date) : ''}</span>
                    <p dangerouslySetInnerHTML={{ __html: detailData.head ? detailData.head.word : '' }}></p>
                </div>
            </div>
            {
                <List
                    style={{ marginBottom: '20px' }}
                    dataSource={detailData.comments}
                    pagination={{
                        pageSize: 8,
                        total: detailData.head ? detailData.head.count : 0,
                        onChange: (index) => { handleCurrentChange(index-1) }
                    }
                    }
                    renderItem={(item, index) => (
                        <List.Item>
                            <Comment data={{ ...item, index: index+current*8 }} setReplyData={setReplyData} key={item.id} />
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
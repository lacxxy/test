import React, { useState, useEffect, useRef } from 'react';
import PtsList from '../../components/PtsList/index';
import Edit from '../../components/Edit/index';
import { Input, Select, Button } from 'antd';
import './index.less';
import axios from 'axios';
import { guide } from '../../const/index';
import cookie from 'react-cookies';
const { Option } = Select;
const Index = (props) => {
    const [ListData, setListData] = useState([]);
    const [title, setTitle] = useState('');
    const [selectVal, setSelectVal] = useState(guide[0].key);
    const edit = useRef();
    useEffect(() => {
        const type = props.match.params.type;
        axios.get(`/api/getPstList?type=${type}&index=${0}&num=${12}`).then(res => {
            if (res.data.code === 200) {
                setListData(res.data.data)
            }
        });
    }, [props.match.params.type])
    const handleChange = (current) => {
        const type = props.match.params.type;
        axios.get(`/api/getPstList?type=${type}&index=${current}&num=${2}`).then(res => {
            if (res.data.code === 200) {
                setListData(res.data.data)
            }
        });
    }
    const selectChange = (value) => {
        setSelectVal(value);
    }
    const clearInput = () => {
        setTitle('');
        setSelectVal(guide[0].key);
        edit.current.setVal('');
    }
    const submit = () => {
        if (title == '') {
            alert("无法为空");
            return;
        }
        if (!cookie.load('username')) {
            alert("请先登录!");
            return;
        }
        const params = {
            title: title,
            text: edit.current.getVal(),
            type: selectVal,
        }
        axios.post('/api/newPst', params).then((res) => {
            alert(res.data.msg);
            if (res.data.code == 200) {
                clearInput();
            }
        })
    }
    return (
        <div id="Index">
            <div id="mylist">
                <PtsList data={ListData} pageSize={12} handleChange={handleChange} />
            </div>
            <div className="edit">
                <Input placeholder="请输入标题" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                <Edit ref={edit} />
                <div className="btn-area">
                    <Select defaultValue={guide[0].key} onChange={selectChange} className="select" >
                        {
                            guide.map(item => {
                                return (
                                    <Option value={item.key} key={item.key}>{item.text}</Option>
                                )
                            })
                        }
                    </Select>
                    <Button onClick={submit}>发布</Button>
                </div>
            </div>
        </div>
    )
}

export default Index;
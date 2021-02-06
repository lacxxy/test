import React, { useState, useEffect } from 'react';
import PtsList from '../../components/PtsList/index';
import axios from 'axios';
const Index = (props) => {
    const [ListData, setListData] = useState([]);
    useEffect(() => {
        const type=props.match.params.type;
        axios.get(`/api/getPstList?type=${type}`).then(res=>{
            if(res.data.code===200){
                setListData(res.data.data)
            }
        });
    }, [props.match.params.type])
    return (
        <div id="Index">
            <PtsList data={ListData} />
        </div>
    )
}

export default Index;
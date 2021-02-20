import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import E from 'wangeditor';
import './index.less';
let editor = null
const Edit = (props, ref) => {
    const [content, setContent] = useState('');
    useImperativeHandle(ref, () => ({
        getVal: () => {
            return content
        },
        getText: () => {
            return editor.txt.text()
        },
        setVal: (val) => {
            setContent(val);
            editor.txt.html(val)
        }
    }))
    useEffect(() => {
        editor = new E("#edit")
        editor.config.menus = [
            'image'
        ]
        editor.config.showFullScreen = true;
        editor.config.onchange = (newHtml) => {
            setContent(newHtml)
        }
        editor.config.height = 200;
        editor.config.zIndex = 0;
        editor.create()
        return () => {
            editor.destroy()
        }
    }, []);
    return (
        <div id="edit"></div>
    )
}
export default forwardRef(Edit);
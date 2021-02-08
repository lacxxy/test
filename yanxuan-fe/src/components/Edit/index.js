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
        // 注：class写法需要在componentDidMount 创建编辑器
        editor = new E("#edit")
        editor.config.menus = [
            'image'
        ]
        editor.config.showFullScreen = true;
        editor.config.onchange = (newHtml) => {
            setContent(newHtml)
        }
        //editor.config.height = 800;
        editor.config.zIndex = 0;
        /**一定要创建 */
        editor.create()
        return () => {
            // 组件销毁时销毁编辑器  注：class写法需要在componentWillUnmount中调用
            editor.destroy()
        }
    }, []);
    return (
        <div id="edit"></div>
    )
}
export default forwardRef(Edit);
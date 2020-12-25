// let utils = {
//     randCord (a) {//获取指定位数随机字符
//         var b = "",num;
//         for(var i = 0; i < a; i++){
//             num = myRondom(48,122);
//             if(num >= 58 && num <= 64 || num >= 91 && num <= 96 ){
//                 i--;
//             }else{
//                 b += String.fromCharCode(num);
//             }
//         }
//         return b;
//     },
//     copyText (ele) {//参数为需要复制的文本节点ref
//         //window.getSelection返回selection一个对象，表示用户选择的文本范围或光标的当前位置
//         let selection = window.getSelection();
//         //清楚其他选中状态
//         selection.removeAllRanges();
//         //Range 接口表示一个包含节点与文本节点的一部分的文档片段
//         //这里创建一个range
//         let range = document.createRange();
//         //获取元素节点内容并选择
//         range.selectNodeContents(this.$refs[ele]);
//         selection.addRange(range)
//         //复制步骤，copy为浏览器命令
//         if(document.execCommand('copy', true)){
//             this.$message({
//                 type:'success',
//                 message:'已成功复制到剪贴板'
//             })
//         }
//         //activeElement 只读属性，用来返回当前在DOM中处于聚焦状态的Element
//         document.activeElement.focus();
//         //清楚选中状态
//         selection.removeAllRanges();
//     }
// }

// export { utils }

export default function copyText (ele) {//参数为需要复制的文本节点ref
    //window.getSelection返回selection一个对象，表示用户选择的文本范围或光标的当前位置
    let selection = window.getSelection();
    //清楚其他选中状态
    selection.removeAllRanges();
    //Range 接口表示一个包含节点与文本节点的一部分的文档片段
    //这里创建一个range
    let range = document.createRange();
    //获取元素节点内容并选择
    range.selectNodeContents(this.$refs[ele]);
    selection.addRange(range)
    //复制步骤，copy为浏览器命令
    if(document.execCommand('copy', true)){
        this.$message({
            type:'success',
            message:'已成功复制到剪贴板'
        })
    }
    //activeElement 只读属性，用来返回当前在DOM中处于聚焦状态的Element
    document.activeElement.focus();
    //清楚选中状态
    selection.removeAllRanges();
}
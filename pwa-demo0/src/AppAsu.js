/* 这是我们用来测试的一个APP */
import React, { useState, useRef, useEffect } from 'react'


// 一个计时器的实现
const MyDiv = () => {
    let [count, setCount] = useState(0);  // count变量，初始值是0
    const latestCount = useRef(count);    // 定义一个ref，初始值是0

    useEffect(() => {  // 通过useEffect来执行逻辑
        latestCount.current = count;  // 修改这个ref
    }, [count]);  // 每当count变化就执行一次

    useEffect(() => {  // 这个逻辑，就是执行定时任务，不干别的
        let loopDo = () => {
            console.log(`目前的count值 = ${latestCount.current}`);
            // if (latestCount.current === 0) {
            //     clearInterval(timer);
            //     return;
            // }
            setCount(latestCount.current+1);  // 修改变量
        }
        // setInterval 每xx毫秒，执行函数
        let timer = setInterval(loopDo, 1000);
    }, []); // 只执行一次

    let resetFn = () => {
        setCount(0)
    }

    return (
        <div className="App">
            <p>当前值：</p>
            <p>{latestCount.current}</p>
            <button onClick={resetFn}>Reset</button>
        </div>
    )
}


export default MyDiv;



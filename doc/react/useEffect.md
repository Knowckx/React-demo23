- [useState()：用变量记录状态](#usestate用变量记录状态)
- [useContext()：共享状态钩子](#usecontext共享状态钩子)
- [useReducer()：action 钩子](#usereduceraction-钩子)
- [useRef 保持一个对象的引用](#useref-保持一个对象的引用)



## useState()：用变量记录状态
useState()用于为函数组件引入状态（state）。
纯函数不能有状态，所以把状态放在钩子里面。  
相当于类的变量吧。

```javascript
const [num,setNum] = useState<number>(1)
```

有个num变量，必须是number类型的（<>尖括号里边的是Typescript限制类型的写法），初始值为一个数字1，  
然后setNum就是一个方法，通过setNum(10)，num的值就为10了。

```javascript
<div onClick= {()=>setNum(10)}>
```


## useContext()：共享状态钩子

如果一个父组件有两个子组件，现在这两个子组件之间需要共享状态，就可以使用useContext

现在有两个组件 Navbar 和 Messages，我们希望它们之间共享状态。

```javascript
<AppContext.Provider value={{
  username: 'name1'
}}>
  <div className="App">
    <Navbar/>
    <Messages/>
  </div>
</AppContext.Provider>
```

AppContext.Provider是一个父组件，他里面有一个username的变量

第一步就需要使用React Context API，在组件外部建一个Context
```javascript
const AppContext = React.creactContext({})
```

Navbar是一个子组件，他需要获取这个username的值

```javascript
const Navbar = () => {
  const { username } = useContext(AppContext); 
  return (
    <div className="navbar">
      <p>AwesomeSite</p>
      <p>{username}</p>
    </div>
  );
}
```



## useReducer()：action 钩子
React 本身不提供状态管理功能，通常需要使用外部库。这方面最常用的库是 Redux。

Redux 的核心概念是，组件发出 action 与状态管理器通信。状态管理器收到 action 以后，使用 Reducer 函数算出新的状态，

Reducer 函数的形式是(state, action) => newState。

useReducers()钩子用来引入 Reducer 功能。

const [state, dispatch] = useReducer(reducer, initialState);

上面是**useReducer()的基本用法，它接受 Reducer 函数和状态的初始值作为参数，返回一个数组。数组的第一个成员是状态的当前值，第二个成员是发送**action 的dispatch函数。

下面是一个计数器的例子。用于计算状态的 Reducer 函数如下。

```javascript
const myReducer = (state, action) => {
  switch(action.type)  {
    case('countUp'):
      return  {
        ...state,
        count: state.count + 1
      }
    default:
      return  state;
  }
}

```

组件代码如下。

```javascript
function App() {
  const [state, dispatch] = useReducer(myReducer, { count:   0 });
  return  (
    <div className="App">
      <button onClick={() => dispatch({ type: 'countUp' })}>
        +1
      </button>
      <p>Count: {state.count}</p>
    </div>
  );
}
```


## useRef 保持一个对象的引用

useRef 返回一个ref对象， 这个ref对象只有一个current属性。
这个ref对象在组件的整个生命周期内保持不变

```javascript
import React, { useRef } from "react";
export default function App() {
  const r = useRef(0); // r的初始值是0
  console.log(r);
  const add = () => {
    r.current += 1;
    console.log(`r.current:${r.current}`);
  };
  return (
    <div className="App">
      <h1>r的current:{r.current}</h1>
      <button onClick={add}>点击+1</button>
    </div>
  );
}
```

点击按钮，让current+1, 新的current的值已经变成了1， 但是页面没有主动渲染
useRef的值变化不会触发页面刷新

加强版：

```javascript
import React, { useEffect, useRef, useState } from "react";
export default function App() {
  const r = useRef(0);
  const [n, setN] = useState(0);
  useEffect(() => {
    r.current += 1;
    if (r.current > 1) {
      console.log("r.current:" + r.current);
      console.log("n:" + n);
    }
  });
  return (
    <div className="App">
      <h1>n:{n}</h1>
      <h1>r.current{r.current}</h1>
      <button
        onClick={() => {
          setN(n + 1);
        }}
      >
        {" "}
        +1
      </button>
    </div>
  );
}
```






import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// react的基础代码学习

// 最简单的React组件类
class Square extends React.Component {  // 定义一个自己的类，继承React的组件类
    render() {  // 写一个render方法, 表示他是怎么被渲染的
      return (  // return一个对象，这个对象是一个jsx  jsx被括号包裹 里面可以直接写HTML标签
        <button className="square">
          {this.props.val1}
        </button>
      );
    }
}

// 当Square类定义完了之后，我们就可以通过<Square />这个html标签来使用这个元素了。
// <Square /> 等同于 React.createElement('Square')
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Square />);  


class Board extends React.Component {
    renderSquare(i) {  
      return <Square val1={i} />;   // 传递数据的方法，在这里 父组件Board 通过prop把值 传递给了子组件 Square
    }

    render() {
      const status = 'Next player: X';
      return (
        <div>
          <div className="status">{status}</div>  // 在jsx中使用变量值
          <div className="board-row">
            {this.renderSquare(0)}   // 在jsx中可以直接调用本类的其他方法
            {this.renderSquare(1)}
          </div>
        </div>
      );
    }
}


// 通过state来在组件里记录状态
class Square extends React.Component {
    constructor(props) {  // 声明一个构造函数
      super(props); // super需要手动调
      this.state = {
        value: null,
      };
    }
    render() {
        return (  // 示例， state的Get和Set
          <button className="square"  onClick={() => this.setState({value: 'X'})} >
            {this.state.value}
          </button>
        );
      }
}


// 场景，当A和B两个组件之间需要相互通讯时 通常做法是把子组件包含的state数据提升至共同的父组件当中保存。
// 之后父组件拥有所以的数据，然后可以通过 props 将状态数据传递到子组件当中。
class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = { // Board作为一个父组件，直接保存9个square的状态，
        squares: Array(9).fill(null),
      };
    }
  
    renderSquare(i) {
      return <Square value={this.state.squares[i]} />;  // 这些square的状态通过props向下传递给子组件
      
    }
}

// 假如子组件想要修改父组件的state, 直接做是不行的，因为state是私有的
// 正常方式 从父组件向下传递一个onClick方法，这个onClick方法是父组件的， 子组件点击执行时，实际上是在执行父组件的逻辑
class Board extends React.Component {
    // ...省略其他代码

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}  // 这个新建的Square对象含有两个props，keyName = "value"  值 = squares[i]
                onClick={() => this.handleClick(i)} // 第二个props，keyName = "onClick"  值 = handleClick
            />
        );
    }

    handleClick(i) {
        const squares = this.state.squares.slice();  // .slice() 方法创建了 squares 数组的一个副本
        squares[i] = 'X';
        this.setState({squares: squares});  // 整体赋值  而不是单独修改一个属性  这好像是react的不可变性
      }
}

class Square extends React.Component {
    render() {
        return (  // 如何使用传递过来的props
          <button className="square"  onClick={() => this.props.onClick()} >  
            {this.props.value}
          </button>
        );
      }
}



// 函数组件 有些react类组件类只有一个render方法  此时可以定义一个函数，这个函数接收 props 作为参数，然后返回需要渲染的元素。
// 写起来会简单一点
function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }



// 坑
hanldClick = () => {
    // 假如设置之后马上读取，这个值还是旧的。 初始counter=0
    this.setState({
       counter: this.state.counter + 1
    });
    console.log(this.state.counter); // 0
 };

// 要改为
hanldClick = () => {
    // 初始counter=0
    this.setState({
       counter: this.state.counter + 1
    },()=>{
       console.log(this.state.counter); // 1
    });
 };
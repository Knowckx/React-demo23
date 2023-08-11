import React, { useState, useRef, useEffect } from 'react'

class MyDiv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: 55,
            inpWeight: 0,
            inpPv: 0,
            resultPv: 0,

        };
    }
    OnInpWeight(e){
		this.setState(
			{inpWeight:e.target.value},
            this.Calc
            )
	}

    OnInpPv(e){
		this.setState(
            {inpPv:e.target.value},
            this.Calc
		)
	}
    Calc(){
        let res = this.state.inpWeight===0 ? 0 : Number(this.state.inpPv)*500/Number(this.state.inpWeight);
        res = res.toFixed(2)
        this.setState({
            resultPv: res
        },this.PrintStatus)
    }
    PrintStatus(){
        console.log(this.state)
    }
    render() { 
        return (
        <div>
            <div>
                价格(元)： 
                <input type="number" onChange={this.OnInpPv.bind(this)}/>
            </div>
            <div>
                重量(g)： 
                <input type="number" onChange={this.OnInpWeight.bind(this)}/>
            </div>
            <div>500g 价格：{this.state.resultPv}</div>
        </div>
    )}
}
export default MyDiv;

import React from "react";

class Matrix extends React.Component {

    constructor(props) {
        super(props)

        var data = [];
        var index = 0;

        for(let i = 0; i < props.location.state.rows; i++){
            var temp_array = [];
            for(let j = 0; j < props.location.state.cols; j++){
                temp_array.push({id: index++, amount: Math.floor(Math.random()*(999-100+1)+100)})
            }
            data.push({id: i, array: temp_array})
        }

        this.state = {
            highlight: props.location.state.highlight,
            data: data,
        }

        this.increaseAmount = this.increaseAmount.bind(this);
    }

    increaseAmount(arrayId, itemId){
        this.setState({
            data: this.state.data.filter(x => {
                if(x.id == arrayId){
                    x.array.filter(y =>  y.id == itemId ? y.amount++ : y.amount)
                }
                return x;
            })
        })
    }

    render() {
        return (
          <div>
            <table id="matrix-table">
              <tbody>
                {this.state.data.map((array) => (
                    <tr key={array.id}> 
                        {array.array.map((item) => (
                            <th key={item.id}
                                className="matrix-field"
                                onClick={() => this.increaseAmount(array.id, item.id)}
                            > {item.amount} </th>
                        ))}
                        <th className="matrix-field matrix-sum-field"
                        > {array.array.map(num => num.amount).reduce((a, b) => a + b, 0)} </th>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    }
}


export default Matrix;
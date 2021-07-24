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
            highlightedNumbers: []
        }

        this.increaseAmount = this.increaseAmount.bind(this);
        this.getColumnAverage = this.getColumnAverage.bind(this);
        this.highlightNumbers = this.highlightNumbers.bind(this);
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

    getColumnAverage(index) {
        var column = this.state.data.map(e => e.array[index]);
        var sum = column.map(num => num?.amount).reduce((a, b) => a + b, 0);
        return Math.floor(sum / this.state.data.length);
    } 

    highlightNumbers(event){
        var currentNumber = event.target.innerText;
        var closestNumbers = [];
        var numbers = [];
        this.state.data.map(x => {
            numbers = numbers.concat(x.array);
        });

        numbers = numbers.filter(x => x.id != event.target.getAttribute('field-id'));   
        for(let i = 0; i < this.state.highlight; i++){
            var closest = numbers.reduce((a, b) => {
                return Math.abs(b?.amount - currentNumber) < Math.abs(a?.amount - currentNumber) ? b : a;
            });

            closestNumbers.push(closest);
            numbers = numbers.filter(x => x != closest);            
        }

        this.setState({
            highlightedNumbers: closestNumbers.map(x => x.id)
        })
    }

    render() {
        var average = [];
        for(let i = 0; i < this.state.data[0].array.length; i++){
            average.push(this.getColumnAverage(i));
        }

        return (
          <div>
            <table id="matrix-table">
              <tbody>
                {this.state.data.map((array) => (
                    <tr key={array.id}> 
                        {array.array.map((item) => (
                            <th key={item.id}
                                field-id={item.id}
                                className={this.state.highlightedNumbers.includes(item.id) ? "matrix-field field-highlight" : "matrix-field"}
                                onMouseOver={this.highlightNumbers}
                                onMouseLeave={() => { this.setState({
                                    highlightedNumbers: []
                                })}}
                                onClick={() => this.increaseAmount(array.id, item.id)}
                            > {item.amount} </th>
                        ))}
                        {/* row sum */}
                        <th className="matrix-field matrix-sum-field"
                        > {array.array.map(num => num.amount).reduce((a, b) => a + b, 0)} </th>
                    </tr>
                ))}

                {/* average */}
                <tr> 
                    {average.map((item, key) => (
                        <th key={key} className="matrix-field matrix-sum-field"> {item} </th>
                    ))}
                    <th className="matrix-field matrix-sum-field"> Add </th>
                </tr>
              </tbody>
            </table>
          </div>
        );
    }
}


export default Matrix;
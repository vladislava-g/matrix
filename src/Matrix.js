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
            cols: props.location.state.cols,
            data: data,
            highlightedNumbers: [],

            selectedRowPercentage: -1
        }

        this.increaseAmount = this.increaseAmount.bind(this);
        this.getColumnAverage = this.getColumnAverage.bind(this);
        this.highlightNumbers = this.highlightNumbers.bind(this);
        this.addRow = this.addRow.bind(this);
        this.removeRow = this.removeRow.bind(this);
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

    addRow(){
        var index = this.state.data[this.state.data.length - 1].array[this.state.data[this.state.data.length - 1].array.length - 1].id + 1;
        var arrayIndex = this.state.data[this.state.data.length - 1].id + 1;
        var new_data = this.state.data;
        var new_array = [];
        for(let j = 0; j < this.state.cols; j++){
            new_array.push({id: index++, amount: Math.floor(Math.random()*(999-100+1)+100)})
        }

        new_data.push({id: arrayIndex, array: new_array});
        this.setState({
            data: new_data
        })
    }

    removeRow(event){
        var id = event.target.getAttribute('array-id');
        var array = this.state.data.filter(x => x.id != id);
        this.setState({
            data: array
        })

        if(array.length == 0){
            this.props.history.push('/')
        }
    }

    getPercentage(partialValue, array) {
        return ((100 * partialValue) / array.map(num => num.amount).reduce((a, b) => a + b, 0)).toFixed(1);
    } 

    getPercentageStyle(percentage){
        return Math.ceil(percentage / 10) * 10;
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
                    <th className="remove-btn">
                        <div onClick={this.removeRow} array-id={array.id}> ⌧ </div>
                    </th>
                        {this.state.selectedRowPercentage == array.id ? 
                            array.array.map((item) => (
                               <th key={item.id}
                                className={"matrix-field matrix-field-"+this.getPercentageStyle(this.getPercentage(item.amount, array.array))}
                               > {this.getPercentage(item.amount, array.array)}% </th>
                        ))
                        :
                         array.array.map((item) => (
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
                            onMouseOver={() => this.setState({
                                selectedRowPercentage: array.id 
                            })}
                            onMouseLeave={() => this.setState({
                                selectedRowPercentage: -1 
                            })}
                        > {array.array.map(num => num.amount).reduce((a, b) => a + b, 0)} </th>
                    </tr>
                ))}

                {/* average */}
                <tr> 
                    <th className=""></th>
                    {average.map((item, key) => (
                        <th key={key} className="matrix-field matrix-sum-field"> {item} </th>
                    ))}
                    <th className="matrix-field matrix-sum-field"
                        onClick={this.addRow}
                    > Add </th>
                </tr>
              </tbody>
            </table>
          </div>
        );
    }
}


export default Matrix;
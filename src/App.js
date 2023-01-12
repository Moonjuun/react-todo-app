import React, {Component} from "react";
import "./App.css";
export default class App extends Component {
  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  }

  getStyle = (complted) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: complted ?"line-through" : 'none'
    }
  }
state = {
  todoData: [],
  value: ""
}

  handleClick = (id) => {
    let newTodoData = this.state.todoData.filter(data => data.id !== id)
    console.log('newTodoData', newTodoData);
    this.setState({todoData: newTodoData})
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let newTodo = {
      id: Date.now(),
      title: this.state.value,
      complted: false,
    }
    // ... 전개연산자
    this.setState({ todoData: [...this.state.todoData, newTodo], value: ''}) //원래 있던 할 일에 새로운 일을 더해줌
  }

  handleCompleteChange = (id) => {
    let newTodoData = this.state.todoData.map(data => {
      if(data.id === id) {
        data.complted = !data.complted;
      }
      return data;
    })

    this.setState({todoData:newTodoData})
  }


  render() {
    return(
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>
              할 일 목록
            </h1>
          </div>
          
          {this.state.todoData.map(data => (
          <div style={this.getStyle(data.complted)} key={data.id}> 
          {/* key 속성을 넣어줘야한다! 리액트에서 리스트를 나열할때는 꼭 넣어줘야 함, 안정적인 ID를 제공하기 위함*/}
            <input type="checkbox" defaultChecked={false} onChange={() => this.handleCompleteChange(data.id)} />
              {data.title}
            <button style={this.btnStyle} onClick={() => this.handleClick(data.id)}>X</button>
          </div>
           ))}

           <form style={{display:'flex'}} onSubmit={this.handleSubmit}>
            <input 
              type='text' name='value' style={{ flex:'10', padding:'5px'}} 
              placeholder="해야 할 일을 입력하세요."
              value={this.state.value}
              onChange={this.handleChange}
            />
            <input 
              type='submit'
              value='입력'
              className="btn"
              style={{flex:'1'}}
            />
           </form>


        </div>
      </div>
    )
  }
}
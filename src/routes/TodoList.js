import React, { Component } from 'react';
import styles from './TodoList.css';
import { connect } from 'dva';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }
    componentDidMount() { }
    removeItem(index) {
        this.props.dispatch({
            type: 'todo/delete',
            payload: index
        })
    }

    toggleItem(index) {
        this.props.dispatch({
            type: 'todo/toggle',
            payload: index
        })
    }

    modify(value, index) {
        this.props.dispatch({
            type: 'todo/modify',
            payload: { value, index }
        })
    }

    addTodo(value) {
        this.props.dispatch({
            type: 'todo/addTodo',
            payload: value
        })
        this.setState({ value: '' })
    }
    selectAllItem() {
        this.props.dispatch({
            type: 'todo/selectAll'
        })
    }
    removeAllItem() {
        this.props.dispatch({
            type: 'todo/removeAll'
        })
    }

    render() {
        const { list } = this.props;
        let count = 0;
        list.map(item => count = !item.finished ? count + 1 : count);
        let selectAllShow = (list.length === 0) ? "none" : "list-item";
        return (
            <div className={styles.container}>
                <span>
                    <h1>我的待办清单</h1>
                    <h3>你有{count}项待办事项未处理</h3>
                </span>
                <input
                    style={{ borderWidth: 1, borderColor: 'red' }}
                    placeholder="请输入代办事项"
                    value={this.state.value}
                    onChange={(e) => this.setState({ value: e.target.value })}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            let title = e.target.value
                            title.length > 0 ? this.addTodo(title) : null
                        }
                    }}
                />
                <button onClick={this.addTodo.bind(this,this.state.value)}>addItem</button>
                <span>
                    <ul>
                        <li style={{ display: selectAllShow }}>
                            <input 
                            type="checkbox" onChange={() => this.selectAllItem()} 
                            />
                            <button onClick={this.removeAllItem.bind(this)}>删除全部</button>
                        </li>
                        {
                            list.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={item.finished}
                                            onChange={() => this.toggleItem(index)}
                                        />
                                        <input
                                            style={{ width: 200, height: 20 }}
                                            defaultValue={item.title}
                                            autoFocus={false}
                                            onKeyDown={(e) => {
                                                if (e.keyCode === 13) {
                                                    let title = e.target.value
                                                    this.modify(title, index)
                                                }
                                            }}
                                        />
                                        <button onClick={this.removeItem.bind(this, index)}>删除</button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </span>
            </div>
        )
    }
}

function mapStateToProps(state) {
    // console.log(state);
    return {
        list: state.todo.list
    }
}

export default connect(mapStateToProps)(TodoList);
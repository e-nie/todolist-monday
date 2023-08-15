import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

type PropsType = {
    todolistId:string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (todolistId: string,taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string,title: string) => void
    toggleStatus: (todolistId: string,id:string,isDone:boolean) => void
    removeTodolist:(  todolistId: string)=> void
}

export function Todolist(props: PropsType) {
    const [error,setError] = useState<string | null>(null)
    let [title, setTitle] = useState("")
    const addTask = () => {
        setError('Title is required')
        if(title.trim().length !== 0) {
            props.addTask(props.todolistId, title.trim());
            setTitle("");
            setError('')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask();
        }
    }
    const handleSetFilter = (value:FilterValuesType) => {
        props.changeFilter(props.todolistId,value)
    }
    const handleChangeStatus = (id: string, isDone:boolean) => {
        props.toggleStatus(props.todolistId, id,isDone)
    }

    const onclickremoveTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    return <div>
        <h3>{props.title}</h3>
        <button onClick={onclickremoveTodolistHandler}>X</button>
        <div>
            <input value={title}
                   onChange={ onChangeHandler }
                   onKeyDown={ onKeyPressHandler }
                   className={error ? "error" : ''}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={error ? "error-message" : ''}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistId, t.id)
                    return <li key={t.id} className={t.isDone ? 'completed' : ''}>
                        <input type="checkbox" checked={t.isDone} onChange={(e) => handleChangeStatus(t.id,e.currentTarget.checked)}/>
                        <span>{t.title}</span>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'filter' : ''} onClick={() => handleSetFilter('all')}>All</button>
            <button className={props.filter === 'active' ? 'filter' : ''} onClick={() => handleSetFilter('active')}>Active</button>
            <button className={props.filter === 'completed' ? 'filter' : ''} onClick={() => handleSetFilter('completed')}>Completed</button>
        </div>
    </div>
}

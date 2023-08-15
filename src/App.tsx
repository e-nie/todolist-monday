import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [todolistId: string]: Array<TaskType>
}


export type FilterValuesType = "all" | "active" | "completed";

function App() {

    //global state BLL
    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Fish", isDone: false},
            {id: v1(), title: "Tea", isDone: false},
        ]
    })

    // const [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);

    // const [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(todolistId: string, id: string) {
        // const filteredTasks =   tasks[todolistId].filter(t => t.id != id)
        // tasks[todolistId] = filteredTasks
        setTasks({...tasks})
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id != id)});
    }

    function addTask(todolistId: string, title: string) {
        const newTask: TaskType = {id: v1(), title: title, isDone: false};
        const tasksWithAddedTask = [newTask, ...tasks[todolistId]];
        tasks[todolistId] = tasksWithAddedTask
        setTasks({...tasks});
    }


    const toggleStatus = (todolistId: string, id: string, isDone: boolean) => {
        const updatedTasks = tasks[todolistId].map(el => el.id === id ? {...el, isDone: isDone} : el)
        tasks[todolistId] = updatedTasks
        setTasks({...tasks})
        // setTasks(tasks.map(el => el.id === id ? {...el, isDone: isDone} : el))
    }

    function changeTodolistFilter(todolistId: string, value: FilterValuesType) {
        const updatedTodoLists = todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl)
        // setFilter(value);
        setTodolists(updatedTodoLists)
    }

    // function getFilteredTasksForRender(someTasks: Array<TaskType>, someFilterValue: FilterValuesType): Array<TaskType> {
    //     let tasksForTodolist = someTasks;
    //     if (someFilterValue === "active") {
    //         tasksForTodolist = someTasks.filter(t => !t.isDone);
    //     }
    //     if (filter === "completed") {
    //         tasksForTodolist = someTasks.filter(t => t.isDone);
    //     }
    //     return tasksForTodolist
    // }

    function removeTodolist(todolistId: string) {
        const filteredTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolists)
        const copyTasksState = {...tasks}
        delete copyTasksState[todolistId]
        setTasks(copyTasksState)
    }


    function getFilteredTasksForRender(someTasks: Array<TaskType>, someFilterValue: FilterValuesType): Array<TaskType> {
        let tasksForTodolist = someTasks;
        if (someFilterValue === "active") {
            tasksForTodolist = someTasks.filter(t => !t.isDone);
        }
        if (someFilterValue === "completed") {
            tasksForTodolist = someTasks.filter(t => t.isDone);
        }
        return tasksForTodolist
    }


    const todolistsForRender: Array<JSX.Element> = todolists.map(tl => {
        const tasksForRender = getFilteredTasksForRender(tasks[tl.id], tl.filter)
        return (
            <Todolist key = {tl.id}
                      title = "What to learn"
                      tasks = {tasksForRender}
                      filter = {tl.filter}
                      todolistId = {tl.id}
                      removeTask = {removeTask}
                      changeFilter = {changeTodolistFilter}
                      addTask = {addTask}
                      toggleStatus = {toggleStatus}
                      removeTodolist = {removeTodolist}
            />
        )
    })


    return (
        <div className = "App">
            {todolistsForRender}

        </div>
    );
}

export default App;

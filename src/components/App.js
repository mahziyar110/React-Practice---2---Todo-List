import React, { useState } from "react";
import "./../styles/App.css";

function Task(props) {
	const { task, index, removeTask, changeTask } = props;
	const [editMode, setEditMode] = useState(false);
	const [newTask, setNewTask] = useState(task);

	return (
		!editMode ?
			(
				<>
					<li className="list">{task}</li>
					<button className="edit" onClick={() => {
						setEditMode(true);
					}}>Edit</button>
					<button className="delete" onClick={() => removeTask(index)}>Delete</button>
				</>
			) :
			(
				<>
					<li>
					<textarea className="editTask" onChange={(ev) => {
						setNewTask(ev.target.value);
					}} value={newTask}></textarea>
					{
						newTask !== "" &&
						<button className="saveTask" onClick={() => {
							setEditMode(false);
							changeTask(newTask, index);
						}}>Save</button>
					}
					</li>
				</>
			)
	)
}

function App() {
	const [task, setTask] = useState("");
	const [taskArray, setTaskArray] = useState([]);

	function changeTask(newTask, index) {
		const newArr = taskArray.map((el,i) => {
			if(i === index) {
				return newTask;
			}
			return el;
		})
		setTaskArray(newArr);
	}

	function removeTask(index) {
		const newArr = taskArray.filter((el, i) => {
			return i !== index;
		})
		setTaskArray(newArr);
	}

	return (
		<div id="main">
			{/* Do not alter main div
			Please do not alter the functional component as tests depend on the type of component. */}
			<h1>ToDo List</h1>

			<textarea id="task" onChange={(ev) => {
				setTask(ev.target.value);
			}} value={task}></textarea>

			<button id="btn" onClick={() => {
				if (task !== "") {
					setTaskArray([...taskArray, task]);
					setTask("");
				}
			}}>ADD</button>

			<ul>
				{taskArray.map((el, i) => {
					return (
						<Task key={i} task={el} index={i} removeTask={removeTask} changeTask={changeTask} />
					)
				})}
			</ul>
		</div>
	);
}


export default App;

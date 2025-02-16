
import React,{useState, useEffect } from 'react';
import axios from 'axios';

const TodoList =({refreshTodo})=>{

  const[task,setTask]=useState('');
  const[getalltask, setAlltask]=useState([]);

  const getTask=async()=>{
try{
const resp= await axios.get('http://localhost:8000/');
setAlltask(resp.data);
}
catch(e){
console.log("error",e);
}
  }
  
  const handleTask= async(e)=>{
    e.preventDefault();
    if(!task)
      return alert('plz enter taks');
    try{
      await axios.post('http://localhost:8000/',{task});
      setTask('');
      refreshTodo();
      getTask();
    }
    catch(e){
      console.log('error',e);
    }
  };
  useEffect(() => {
    getTask();
  }, []);
  const markComp=async(id)=>{
    try{
      await axios.patch(`http://localhost:8000/${id}`,{completed:true});
      getTask();
    }
    catch(e){
      console.log('error',e);
    }
  }

  const remTask=async (id)=>{
    try{
      await axios.delete(`http://localhost:8000/${id}`,{task});
      getTask();
    }
    catch(e){
      console.log('error',e);
    }
  }


  return(
    <div>
      <form onSubmit={handleTask}>
      <input id="input_text" type='text' value={task} onChange={(e)=>setTask(e.target.value)}/>
      <button class="butts" type='submit'>Add</button>
    </form>
    <ul id="task_aaye">
      {getalltask.map((todo)=>(
        <li  key={todo._id}>
          <span style={{textDecoration:todo.completed?'line-through':'none'}}>
            {todo.task}
          </span>
          {!task.completed && (<button class="inButt" onClick={() => markComp(todo._id)}>Done</button>)}
          <button class="inButt" onClick={()=>remTask(todo._id)}>Delete</button>
        </li>
      ))}
    </ul>
    </div>
  );

};
export default TodoList;
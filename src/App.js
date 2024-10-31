import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Form from 'react-bootstrap/Form';
import { useCallback, useEffect, useState } from 'react';
import Todo from './Todo';
import Button from 'react-bootstrap/Button';

function App() {
  /*
  로컬스토리지에 데이터 쓰기
  window.localStorage.setItem('name', '홍길동');
  
  로컬스토리지에 데이터 읽기
  let test = window.localStorage.getItem('name');
  
  로컬스토리지에 데이터 삭제
  window.localStorage.removeItem('name');

  let obj = {id:1, text:'learn web'};
  console.log(obj.id); // {id: 1, text: 'learn web'}

  //객체 -> JSON 문자열,  JSON.stringify(대상)
  let objString = JSON.stringify(obj);
  console.log(objString); // '{"id":1,"text":"learn web"}'

  //로컬스토리지에는 문자열만 쓰기 가능
  window.localStorage.setItem('todo', objString);

  let test = window.localStorage.getItem('todo');
  //JSON 문자열 -> 객체 JSON.parse(대상)
  let testObj =  JSON.parse(test);
  console.log(testObj.text);
  */

  const [todo, setTodo] = useState([]);
  const [todoId, setTodoId] = useState(0);
  console.log(todoId)

  // 로컬스토리지에서 todo key에 값이 있으면 조회 -> todo에 목록 저장

  let getTodoList = useCallback(()=>{
    console.log('getTodoList 실행')
    const todoStrFromLocalStorage = window.localStorage.getItem('todo');
    if(todoStrFromLocalStorage !== null && todoStrFromLocalStorage !== '[]'){ // 값이 있으면
      //JSON 문자열 -> 객체 JSON.parse(대상)
      const todoObj = JSON.parse(todoStrFromLocalStorage);
      setTodo(todoObj);
      setTodoId(todoObj[todoObj.length-1].id);
    }
  },[]) // useCallback 함수로 getTodoList 함수의 결과가 변경되었는지 여부 알려줌

  let updateTodoId = useCallback(()=>{
    console.log('updateTodoId 실행')
    if(todo.length > 0){
      setTodoId(todo[todo.length-1].id);
    } else {
      setTodoId(0);
    }
    
  },[todo])

  let setStorage = useCallback(()=>{
    console.log('setStorage 실행')

    const todoString = JSON.stringify(todo);
    window.localStorage.setItem('todo', todoString)
  },[todo]); // 최초 한 번 실행, todo가 변경되면

  /*
  let setStorage = ()=>{
    console.log('setStorage 실행')

    const todoString = JSON.stringify(todo);
    window.localStorage.setItem('todo', todoString)
  }
  */

  useEffect(()=>{
    getTodoList();

  },[getTodoList]) // 최초 한 번 실행, getTodoList 객체의 값이 변경되면 실행

  useEffect(()=>{
    setStorage();

  },[setStorage]) // 최초 한 번 실행, setStorage 객체의 값이 변경되면 실행

  useEffect(()=>{
    updateTodoId();

  },[todo,updateTodoId]) // todo, updateTodoId 값이 변경되면 todoId 업데이트
  
  let addTodo = (value)=>{
    console.log('addTodo 실행')
    let newTodos = [...todo];
    let newId = todoId + 1;
    setTodoId(newId);
    newTodos.push({id:newId, text:value, checked:false});
    setTodo(newTodos);
    document.querySelector('#todo').value = ''; // 인풋에 입력 전송 후 인풋 창 비워지게
  }
  
  let checkUpdate = (id,value)=>{
    // console.log(id,value)
    console.log('checkUpdate 실행')
    let newTodos = todo.
    map(item=> item.id === id ? {...item, checked:value} : item);
    
    setTodo(newTodos);
  }

  let deleteTodo = (id)=>{
    console.log('deleteTodo 실행')
    let newTodos = [...todo];
    let idx = newTodos.findIndex(item=> item.id === id);
    newTodos.splice(idx, 1);
    setTodo(newTodos);
  }

  let updateTodo = (id, text)=>{
    let newTodos = todo.map(item=> item.id === id ? {...item, text:text} : item);
    setTodo(newTodos);
  }
  
    let todos = todo.map((item, idx)=> 
    <Todo data={item} key={idx} updateTodo={updateTodo} checkUpdate={checkUpdate} deleteTodo={deleteTodo}/>)
  
  return (
    <div className="container">
      <h1>Todo List</h1>
      <Form onSubmit={(e)=>{
        e.preventDefault();
        addTodo(e.target.todo.value);
      }}>
        <Form.Group className="mb-3" controlId="todo">
          <Form.Label>할일 입력</Form.Label>
          <Form.Control type="text" name="todo" placeholder="할일을 입력하세요." />
        </Form.Group>
        <Button type="submit" variant="success">입력</Button>
      </Form>
      <hr/>
      <div>
        {todos}
      </div>
    </div>
  );
}

export default App;
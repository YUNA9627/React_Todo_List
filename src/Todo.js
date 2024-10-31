import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/*
const Todo = (props)=>{
  return(
    <div>
      {props.data.text}
    </div>
  )
}
*/

const Todo = ({data, checkUpdate, deleteTodo, updateTodo})=>{
  const [mode,setMode] = useState('read');
  const [isChecked, setIsChecked] = useState(false);
  const [text, setText] = useState(data.text);

  let className = '';
  let formClass = 'visually-hidden';
  const handleCheckboxClick = (e)=>{
    let value = !isChecked;
    setIsChecked(value);
    checkUpdate(data.id, value)
  }
  if(isChecked){
    className = 'checked';
  }

  if(mode === 'edit'){
    className += ' visually-hidden';
    formClass = '';
  }

  let todoDelete = ()=>{
    deleteTodo(data.id);
  }

  let changeMode = ()=>{
    setMode('edit');
  }

  let changeText = (value)=>{
    setText(value);
  }

  let todoUpdate = ()=>{
    updateTodo(data.id, text);
    setMode('read');
  }

  let cancelEdit = ()=>{
    setText(data.text);
    setMode('read');
  }

  return(
    <div>
      <Form.Check type="checkbox" id={data.id} className="mt-3">
        <Form.Check.Input type="checkbox" onClick={handleCheckboxClick}/>
        <Form.Check.Label className={className} >{text}</Form.Check.Label>
          <Form className="d-flex gap-1" onSubmit={todoUpdate}>
            <Form.Group className={formClass} >
              <Form.Control type="text" value={text} onChange={(e)=>{changeText(e.target.value);}}/>
            </Form.Group>
            <Button type="submit" className={formClass} variant="outline-secondary" size="sm" onClick={changeMode}>입력</Button>
            <Button type="button" className={formClass} variant="outline-secondary" size="sm" onClick={cancelEdit}>취소</Button>
          </Form>
        <Button className="button" variant="dark" size="sm" onClick={changeMode}>수정</Button>
        <Button className="button" variant="danger" size="sm" onClick={todoDelete}>삭제</Button>
      </Form.Check>
    </div>
  )
}


export default Todo;
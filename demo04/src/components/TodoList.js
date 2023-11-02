import { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import Jumbotron from "./Jumbotron";

const Exam01 = ()=> {

    const [todoList, setTodoList] = useState([
        {no:1, title:"학원가기", type:"공부", edit:false},
        {no:2, title:"영어단어외우기", type:"공부", edit:false},
        {no:3, title:"헬스장가기", type:"운동", edit:false},
        {no:4, title:"친구만나기", type:"일상", edit:false}
    ]);

    const [backup, setBackup] = useState([]);

    const [data, setData] = useState({
        title : "",
        type : ""
    });

    const bsModal = useRef();

    const changeData = e=>{
        const newData = {
            ...data,
            [e.target.name] : e.target.value
        };
        setData(newData);
    };

    useEffect(()=>{
        setBackup(todoList.map(todo=>{
            const newTodo = {...todo};
            return newTodo;
        }));
    },[]);

    const changeToEdit = (target)=>{
        const newTodos = todoList.map(todo=>{
            if(todo.no === target.no){
                return{
                    ...todo,
                    edit:true
                }
            }
            return todo;
        });
        setTodoList(newTodos);
    };

    const changeTodo = (target, e)=>{
        const newTodos = todoList.map(todo=>{
            if(todo.no === target.no){
                return {
                    ...todo,
                    [e.target.name] : e.target.value
                }
            }
            return todo;
        });
        setTodoList(newTodos);
    };

    const cancelTodo = (target) => {
        const findResult = backup.filter(todo=>todo.no === target.no);

        const newTodos = todoList.map(todo=>{
            if(todo.no === target.no){
                return{
                    ...findResult[0],
                    edit:false
                }
            }
            return todo;
        });
        setTodoList(newTodos);
    };

    const saveTodo = (target)  => {
        const newBackup = backup.map(todo=>{
            if(todo.no === target.no){
                return {
                    ...target,
                    edit:false
                }
            }
            return todo;
        });
        setBackup(newBackup)

        const newTodos = todoList.map(todo=>{
            if(todo.no === target.no){
                return{
                    ...todo,
                    edit:false
                }
            }
            return todo;
        });
        setTodoList(newTodos);
    };

    const deleteTodo =(target)=>{
        const newTodos = todoList.filter(todo=>todo.no !== target.no);
        setTodoList(newTodos);

        const newBackup = todoList.filter(todo=>todo.no !== target.no);
        setBackup(newBackup);
    };

    const addTodo = e=>{

        const no = todoList.length == 0 ? 1 : todoList[todoList.length-1].no + 1;

        const newTodos = [
            ...todoList, 
            {
                ...data, 
                edit:false,
                no:  no
            }
        ];
        setTodoList(newTodos);

        const newBackup = [
            ...backup, 
            {
                ...data, 
                edit:false,
                no:  no
            }
        ];
        setBackup(newBackup);

        setData({
            title:"",
            type:"",
        });

        closeModal();
        
    };

    const cancelAddTodo = ()=>{
        setData({
            title:"",
            type:"",
        });

        closeModal();
    };

    const openModal = ()=>{
        var modal = new Modal(bsModal.current);
        modal.show();
    };

    const closeModal = ()=>{
        var modal = Modal.getInstance(bsModal.current);
        modal.hide();
    };



    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10 offset-md-1">

                    {/* 점보트론을 만들면서 제목과 내용을 전달 */}
                   <Jumbotron title="일정 관리 프로그램" content="KH정보교육원 수업자료"/>

                    <div className="row mt-4">
                        <div className="col">
                            <button type="button" className="btn btn-primary"
                                onClick={openModal}>
                                추가하기
                            </button>
                        </div>
                    </div>

                    <div class="row mt-4">
                        <div class="col">
                            <table class="table table-striped text-center">
                                <thead>
                                    <tr>
                                        <th width="15%">번호</th>
                                        <th width="35%">제목</th>
                                        <th width="20%">종류</th>
                                        <th width="30%">관리</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {todoList.map((todo, index)=>(
                                    todo.edit ? (
                                    <tr key={todo.no}>
                                        <td>{todo.no}</td>
                                        <td>
                                            <input className="form-control" type="text" value={todo.title}
                                            name="title" onChange={e=>changeTodo(todo, e)}/>
                                        </td>
                                        <td>
                                            <input className="form-control" type="text" value={todo.type}
                                            name="type" onChange={e=>changeTodo(todo, e)}/>
                                        </td>
                                        <td>
                                        <button className="btn btn-sm btn-info" onClick={e=>cancelTodo(todo)}>취소</button>
                                        <button className="btn btn-sm btn-primary ms-1" onClick={e=>saveTodo(todo)}>완료</button>
                                        </td>
                                    </tr>
                                    ) : (
                                        <tr key={todo.no}>
                                        <td>{todo.no}</td>
                                        <td>{todo.title}</td>
                                        <td>{todo.type}</td>
                                        <td>
                                        <button className="btn btn-sm btn-warning"
                                        onClick={e=>changeToEdit(todo)}>수정</button>
                                        <button className="btn btn-sm btn-danger ms-1"
                                        onClick={e=>deleteTodo(todo)}>삭제</button>
                                        </td>
                                    </tr>
                                    )
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="modal fade" ref={bsModal} id="exampleModal" 
                    data-bs-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">할일 등록</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <div className="row">
                        <div className="col">
                            <label className="form-label">제목</label>
                            <input name="title" value={data.title} onChange={changeData}
                                    className="form-control"/>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <label className="form-label">종류</label>
                            <input name="type" value={data.type} onChange={changeData}
                                    className="form-control"/>
                        </div>
                    </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                                            onClick={cancelAddTodo}>취소</button>

                            <button type="button" className="btn btn-primary"
                                                            onClick={addTodo}>추가</button>
                        </div>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
    );
};

export default Exam01;
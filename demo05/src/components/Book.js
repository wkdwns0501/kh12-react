import { useEffect, useRef, useState } from "react";
import { AiOutlineEdit,AiOutlinePlus,AiOutlineDelete} from "react-icons/ai";
import axios from "axios";

import "./Book.css"
import { Modal } from "bootstrap";

const Book = (props) => {
    const [bookList, setBookList] = useState([]);

    const loadBook2 = () => {
        axios({
            //서버에 있는 도서 정보를 불러와서 state에 반영하는 코드
            url: `${process.env.REACT_APP_REST_API_URL}/book/`,
            method: "get"
        })
            .then(response => {
                //console.log(response);
                setBookList(response.data);
            })
            .catch(err => {
                window.alert("통신 오류 발생");
            });
    };

    const loadBook = async ()=>{
        const response = await axios({
            url:`${process.env.REACT_APP_REST_API_URL}/book/`,
            method:"get",
        });
        setBookList(response.data);
    };

    useEffect(() => {
        loadBook();
    }, []);

    const deleteBook = (book) => {
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if (choice === false) return;

        //axios({옵션}).then(성공시 실행할 함수). catch(실패시 실행할 함수);
        axios({
            // url:`${process.env.REACT_APP_REST_API_URL}/book/` + book.bookId,
            url: `${process.env.REACT_APP_REST_API_URL}/book/${book.bookId}`, //백틱은 jsp에서 못쓴다
            method: "delete"
        })
            .then(response => {
                loadBook();//목록 갱신
            })
            .catch(err => { });
    };

    //modal 관련된 처리
    const bsModal = useRef();
    const openModal = () => {
        const modal = new Modal(bsModal.current);
        modal.show();
    };

    const closeModal = () => {
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();
        clearBook();
    };

    const [book, setBook] = useState({
        bookTitle:"",
        bookAuthor:"",
        bookPublicationDate:"",
        bookPrice:0,
        bookPublisher:"",
        bookPageCount:0,
        bookGenre:""
    });

    const changeBook = e=>{
        setBook({
            ...book,
            [e.target.name] : e.target.value
        });
    };

    const clearBook = e=>{
        setBook({
            bookTitle:"",
            bookAuthor:"",
            bookPublicationDate:"",
            bookPrice:"",
            bookPublisher:"",
            bookPageCount:"",
            bookGenre:""
        });
    };

    const saveBook2 = ()=>{

        axios({
            url:`${process.env.REACT_APP_REST_API_URL}/book/`,
            method:"post",
            data:book
            // data:{...book}
        })
        .then(response=>{
            loadBook();
            closeModal();
        })
        .catch(err=>{});
    };

    //async 함수와 await 키워드를 사용한 간소화 작업이 가능
    //- 비동기 작업을 동기화된 코드로 작성할 수 있다
    const saveBook = async ()=>{
        const response = await axios({
            url:`${process.env.REACT_APP_REST_API_URL}/book/`,
            method:"post",
            data:book
        });
        loadBook();
        closeModal();
    };

    const editBook = (target)=>{
        setBook({...target});
        openModal();
    };

    const updateBook2 = ()=>{
        //검사 후 차단 코드

        //const copyBook= {...book};
        //delete copyBook.bookId;
        
        const {
                    bookId,
                    bookTitle, 
                    bookAuthor, 
                    bookPublicationDate, 
                    bookPrice, 
                    bookPublisher, 
                    bookPageCount, 
                    bookGenre
                                             } = book;
            
        axios({
            url:`${process.env.REACT_APP_REST_API_URL}/book/${bookId}`,
            method:"put",
            data:{
                bookTitle : bookTitle,
                bookAuthor : bookAuthor,
                bookPublicationDate : bookPublicationDate,
                bookPrice : bookPrice,
                bookPublisher : bookPublisher,
                bookPageCount : bookPageCount,
                bookGenre : bookGenre
            }
            //data:{...book}
            //data: copyBook
        })
        .then(response=>{
            loadBook();
            closeModal();
        })
        .catch(err=>{});
    };

    const updateBook = ()=>{
        //검사 후 차단 코드

        const copyBook = {...book};
        delete copyBook.bookId;
        axios({
            url:`${process.env.REACT_APP_REST_API_URL}/book/${book.bookId}`,
            method:"put",
            data: copyBook
        })
        .then(response=>{
            loadBook();
            closeModal();
        });
    };

    return (
        <>
            <div className="row">
                <div className="col">
                    <h1>도서 관리</h1>
                    <hr></hr>
                </div>
            </div>

            {/* 추가 버튼 */}
            <div className="row mt-4">
                <div className="col text-end">
                    <button className="btn btn-success" onClick={openModal}>
                        <AiOutlinePlus/>
                        추가
                    </button>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <table className="table table-striped text-center">
                        <thead>
                            <tr>
                                <th className="pc-only">번호</th>
                                <th>제목</th>
                                <th>저자</th>
                                <th className="pc-only">출간일</th>
                                <th>가격</th>
                                <th className="pc-only">출판사</th>
                                <th className="pc-only">페이지수</th>
                                <th className="pc-only">장르</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookList.map(book => (
                                <tr key={book.bookId}>
                                    <td className="pc-only">{book.bookId}</td>
                                    <td>{book.bookTitle}</td>
                                    <td>{book.bookAuthor}</td>
                                    <td className="pc-only">{book.bookPublicationDate}</td>
                                    <td>{book.bookPrice}</td>
                                    <td className="pc-only">{book.bookPublisher}</td>
                                    <td className="pc-only">{book.bookPageCount}</td>
                                    <td className="pc-only">{book.bookGenre}</td>
                                    <td>
                                        {/* 아이콘 처리 */}
                                        <AiOutlineEdit className="text-warning me-1"
                                            onClick={e=>editBook(book)}/>
                                        <AiOutlineDelete className="text-danger"
                                            onClick={e => deleteBook(book)}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <div className="modal fade" ref={bsModal} id="exampleModal"
                data-bs-backdrop="static" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {book.bookId === undefined ? '신규 도서 등록' : `${book.bookId}번 도서 수정`}
                            </h5>
                            <button type="button" className="btn-close" onClick={closeModal}
                             data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">제목</label>
                                    <input type="text" name="bookTitle" className="form-control"
                                        value={book.bookTitle} onChange={changeBook}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">저자</label>
                                    <input type="text" name="bookAuthor" className="form-control"
                                        value={book.bookAuthor} onChange={changeBook}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">출간일</label>
                                    <input type="date" name="bookPublicationDate" className="form-control"
                                        value={book.bookPublicationDate} onChange={changeBook}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">가격</label>
                                    <input type="number" name="bookPrice" className="form-control"
                                        value={book.bookPrice} onChange={changeBook}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">출판사</label>
                                    <input type="text" name="bookPublisher" className="form-control"
                                        value={book.bookPublisher} onChange={changeBook}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">페이지수</label>
                                    <input type="number" name="bookPageCount" className="form-control"
                                        value={book.bookPageCount} onChange={changeBook}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">장르</label>
                                    <select name="bookGenre" className="form-select"
                                        value={book.bookGenre} onChange={changeBook}>
                                        <option value="">선택하세요</option>
                                        <option>공포</option>
                                        <option>스릴러</option>
                                        <option>로맨스</option>
                                        <option>추리</option>
                                        <option>판타지</option>
                                        <option>범죄</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={closeModal}>닫기</button>
                            {book.bookId === undefined ? 
                                <button className="btn btn-success" onClick={saveBook}>저장</button> 
                                : 
                                <button className="btn btn-success" onClick={updateBook}>수정</button> 
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Book;
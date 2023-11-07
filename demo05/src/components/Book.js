import { useEffect, useRef, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";

import "./Book.css"
import { Modal } from "bootstrap";

const Book = (props) => {
    const [bookList, setBookList] = useState([]);

    const loadBook = () => {
        axios({
            //서버에 있는 도서 정보를 불러와서 state에 반영하는 코드
            url: "http://localhost:8080/book/",
            method: "get"
        })
            .then(response => {
                //console.log(response);
                setBookList(response.data);
            })
            .catch(err => {
                window.alert("통신 오류 발생");
            });
    }

    useEffect(() => {
        loadBook();
    }, []);

    const deleteBook = (book) => {
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if (choice === false) return;

        //axios({옵션}).then(성공시 실행할 함수). catch(실패시 실행할 함수);
        axios({
            // url:"http://localhost:8080/book/" + book.bookId,
            url: `http://localhost:8080/book/${book.bookId}`, //백틱은 jsp에서 못쓴다
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
    };

    return (
        <>
            <div className="row">
                <div className="col">
                    <h1>도서 관리</h1>
                    <hr></hr>
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
                                        <AiOutlineEdit className="text-warning me-1" />
                                        <AiOutlineDelete className="text-danger"
                                            onClick={e => deleteBook(book)} />
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
                            <h5 className="modal-title">일정 변경</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                        </div>
                        <div className="modal-footer">

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Book;
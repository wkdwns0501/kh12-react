import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";

import "./Book.css"

const Book = (props)=>{
    const [bookList, setBookList] = useState([]);
    useEffect(()=>{
        axios({
            //서버에 있는 도서 정보를 불러와서 state에 반영하는 코드
            url:"http://localhost:8080/book/",
            method:"get"
        })
        .then(response=>{
            //console.log(response);
            setBookList(response.data);
        })
        .catch(err=>{
            window.alert("통신 오류 발생");
        });
    },[]);
    return (
        <>
            <div className="row">
                <div className="col">
                    <h1>도서 관리</h1>
                    <p>React CRUD 연습 예제</p>
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
                            {bookList.map(book=>(
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
                                        <AiOutlineEdit className="text-warning me-1"/>
                                        <AiOutlineDelete className="text-danger"/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
};

export default Book;
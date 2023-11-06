import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";

const Pocketmon = (props)=>{
    const [pocketmonList, setPocketmonList] = useState([]);

    const loadPocketmon = ()=>{
        //서버에서 pocketmon list를 불러와서 state에 설정하는 코드
        axios({
            url:"http://localhost:8080/pocketmon/",
            method:"get"
        })
        .then(response=>{
            //console.log(response);
            setPocketmonList(response.data);
        })
        .catch(err=>{});
    };

    useEffect(()=>{
        loadPocketmon();
    },[]);

    //axios chain : 엑시오스가 꼬리에 꼬리를 무는것

    //포켓몬스터 삭제
    //- 이제는 state에서 삭제하는 것이 아니라 서버에 통신을 보낸 뒤 목록을 갱신하면 된다
    const deletePocketmon = (pocketmon) => {
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if(choice === false) return;

        //axios({옵션}).then(성공시 실행할 함수). catch(실패시 실행할 함수);
        axios({
            url:`http://localhost:8080/pocketmon/${pocketmon.no}`,
            method:"delete"
        })
        .then(response=>{
            loadPocketmon();//목록 갱신
        })
        .catch(err=>{});
    };

    return (
        <>
            <div className="row">
                <div className="col">
                    <h1>포켓몬스터 관리</h1>
                    <p>React CRUD 연습 예제</p>
                </div>
            </div>
            
            <div className="row mt-4">
                <div className="col">
                    <table className="table table-striped text-center">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>이름</th>
                                <th>속성</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pocketmonList.map(pocketmon=>(
                                <tr key={pocketmon.no}>
                                    <td>{pocketmon.no}</td>
                                    <td>{pocketmon.name}</td>
                                    <td>{pocketmon.type}</td>
                                    <td>
                                        {/* 아이콘 처리 */}
                                        <AiOutlineEdit className="text-warning me-1"/>
                                        <AiOutlineDelete className="text-danger"
                                            onClick={e=>deletePocketmon(pocketmon)}/>
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

export default Pocketmon;
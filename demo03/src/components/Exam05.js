import { useEffect, useState } from "react";

const Exam05 = ()=> {

    const[score1, setScore1] = useState(0);
    const[score2, setScore2] = useState(0);
    const[score3, setScore3] = useState(0);
    const[total, setTotal] = useState(0);
    const[average, setAverage] = useState(0);

    useEffect(() => {
        setTotal(score1 + score2 + score3);
    }, [score1, score2, score3]);
    useEffect(() => {
        setAverage(total/3);
    }, [total]);

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10 offset-md-1">

                    <div className="row">
                        <div className="col">
                            <h1>다섯 번째 예제</h1>                    
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col">
                            <h2>성적 계산기</h2>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>자바</th>
                                        <td align="center">
                                            <input type="number" className="form-control" 
                                            value={score1} onChange={e=>setScore1(parseInt(e.target.value))}/>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>데이터베이스</th>
                                        <td align="center">
                                        <input type="number" className="form-control" 
                                        value={score2} onChange={e=>setScore2(parseInt(e.target.value))}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>스프링부트</th>
                                        <td align="center">
                                        <input type="number" className="form-control" 
                                        value={score3} onChange={e=>setScore3(parseInt(e.target.value))}/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <hr/>

                    <div className="row mt-2">
                        <div className="col">
                            <h3 className="text-center">총점 = {total}점 , 평균 = {average}점</h3>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Exam05;
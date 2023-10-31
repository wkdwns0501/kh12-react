import { useState } from "react";

const Exam04 = ()=>{
    //const[필드명, 세터메소드명] = useState(초기값);
    const [text, setText] = useState(0);
    //fragment : 조각
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10 offset-md-1">

                    <div className="row">
                        <div className="col">
                          <h1>네번째 예제</h1>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                          <h2>(Q) 주말에 뭐하세요?</h2>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col">
                            <textarea rows={4} cols={100} minLength="0" maxLength="1000" onChange={e=>setText(e.target.textLength)}/>
                        </div>
                    </div>
                    
                    <div className="row mt-2">
                        <div className="col text-end">
                            <span>{text} / 1000</span>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    );
};

export default Exam04;
import styled, { css } from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';


import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';




const PhoneLoginBodyAllwrapper = styled.div`

& .headerarea{
 width: 90%;
 margin: 0 auto;
 & p{   
        text-align: center;
        font-family: "Noto Sans KR";
    font-weight: 100;
    font-size: 30px;
    color: #000;
    line-height: 1.35;
    }

}

& .formloginarea{
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;

    & .sign{

        display: flex;
        flex-direction: column;

        & span{
            font-family: "Noto Sans KR";
    font-weight: 800;
    font-size: 16px;
    color: #000;
    line-height: 1.5;
            display: inline-block;
        }

        & input {
            border: none;
            display: inline-block;
            width: 100%;
    height: 40px;
    font-family: "Noto Sans KR";
    font-weight: 400;
    font-size: 18px;
    color: #000;
    /* padding: 0 20px; */
    border-bottom: 1px solid #ddd;
    vertical-align: middle;
    background: #fff;
    position: relative;
        }

    & #submit{
        display: block;
    width: 100%;
    height: 50px;
    font-family: "Noto Sans KR";
    font-weight: 400;
    font-size: 18px;
    color: #000;
    text-align: center;
    line-height: 50px;
    background: #fff;
    border: 1px solid #777;
    border-radius: 16px;
    -webkit-box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
}
       
    }

    & .cutline .singup{
        display: flex;
        justify-content: space-between;
    }


    & .cutline>p{
        font-family: "Noto Sans KR";
    font-weight: 800;
    font-size: 24px;
    color: #000;
    line-height: 1.5;
    }

    & .naverlogo{
    width: 86px;
    height: 16px;
    background-image: url(/assets/web/img/sign/logo_naver.png);
    }


    & #duplicid{
        display: flex;
        justify-content:space-between
    }

   & #yesduplic{
    display: none;
   }

    .yesduplicidaction{
        display:block !important;
        background-color: #03c75a;
    -webkit-box-shadow: 0 2px 4px 0 rgba(3, 199, 90, .12);
    box-shadow: 0 2px 4px 0 rgba(3, 199, 90, .12);
    text-decoration: none;
    color: #fff !important;
   }


   & #yesregexpw{
    display: none;
   }
      .yesregexaction{
        display:block !important;
        background-color: #03c75a;
    -webkit-box-shadow: 0 2px 4px 0 rgba(3, 199, 90, .12);
    box-shadow: 0 2px 4px 0 rgba(3, 199, 90, .12);
    text-decoration: none;
    color: #fff !important;
      }

   & #noregexpw{
     display: none;   
    }

    .noregexaction{
        display:block !important;
        background-color: #f4361e;
    -webkit-box-shadow: 0 2px 4px 0 rgba(3, 199, 90, .12);
    box-shadow: 0 2px 4px 0 rgba(3, 199, 90, .12);
    text-decoration: none;
    color: #fff !important;
        
    }



    & #yesregexpw2{
    display: none;
   }
      .yesregexaction2{
        display:block !important;
        background-color: #03c75a;
    -webkit-box-shadow: 0 2px 4px 0 rgba(3, 199, 90, .12);
    box-shadow: 0 2px 4px 0 rgba(3, 199, 90, .12);
    text-decoration: none;
    color: #fff !important;
      }

   & #noregexpw2{
     display: none;   
    }

    .noregexaction2{
        display:block !important;
        background-color: #f4361e;
    -webkit-box-shadow: 0 2px 4px 0 rgba(3, 199, 90, .12);
    box-shadow: 0 2px 4px 0 rgba(3, 199, 90, .12);
    text-decoration: none;
    color: #fff !important;
        
    }





}

`

export const MemberJoinBodyCompoent = () => {
    const [cookies, setCookie] = useCookies(['userid']); // 쿠키 훅 

    let [idsigncheck, setIdSigncheck] = useState(false);
    let [pwsigncheck, setPwSigncheck] = useState(false);
    let [idstate, setIdstate] = useState(null);
    let [passwordstate, setpasswordstate] = useState(null);

    ;

    let navi = useNavigate();

    let id;
    let password;



    let IdChange = () => {
        id = document.getElementById('id').value;

    }


    //주의:
    // 1차 2차 비번에서 논리가 꼬일 수 있다.
    //먼저 1차에서 비번 1을작성
    // 2차에서 1을 작성
    //이때 1을 바꾸면 여전히 자바스크립트에선 둘이 같다고 하니 
    let password2
    let 비번형식검증
    let PwChange1 = () => {
        let reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,10}$/
        password = document.getElementById('pw').value;
        비번형식검증 = reg.test(password);
        console.log("영문 숫자 특수기호 조합 8자리 이상 10자리 이하:  " + reg.test(password));

        if (password2 != undefined) {
            document.getElementById('pw2').value = null;
        }


        if (reg.test(password)) {
            document.getElementById("yesregexpw").classList.add("yesregexaction");
            document.getElementById("noregexpw").classList.remove("noregexaction");
        }
        else {
            document.getElementById("noregexpw").classList.add("noregexaction");
            document.getElementById("yesregexpw").classList.remove("yesregexaction");
        }



    }


    let 비번검증;
    let PwChange2 = () => {

        if (!비번형식검증) {
            alert("비밀번호 형식을 먼저 확인해주세요")
            document.getElementById('pw2').value = null;
            return;
        }

        password2 = document.getElementById('pw2').value;
        비번검증 = password == password2;
        if (비번검증) {
            document.getElementById("yesregexpw2").classList.add("yesregexaction2");
            document.getElementById("noregexpw2").classList.remove("noregexaction2");
        }
        else {
            document.getElementById("noregexpw2").classList.add("noregexaction2");
            document.getElementById("yesregexpw2").classList.remove("yesregexaction2");
        }


    }



    let IP;
    if (window.location.href.indexOf("localhost") == -1) {
        IP = process.env.REACT_APP_SMARTPHONE_IP;
    } else {
        IP = "localhost"
    }
    let MemberJoin = () => {

        console.log("사용가능아이디검증 " + 사용가능아이디검증)
        console.log("비번검증 " + 비번검증)
        console.log("비번형식검증 " + 비번형식검증)


        if (사용가능아이디검증 && 비번검증 && 비번형식검증) {


            let data = { "id": id, "password": password };
            let headers = { "content-type": "application/json" }

            axios.post(`http://${IP}:4000/user/memberjoin`, data, { headers })
            .then((res)=>{
                let {joinstatuscode}=res.data;
                if(joinstatuscode==1){
                    alert("회원가입 하셨습니다. 로그인 페이지로 이동합니다.")
                    navi("/login")
                }

            })
            



        }
        else {
            alert("사용가능 아이디 체크와 비밀번호 입력을 다시해주세요");
            document.getElementById('id').value = null;
            document.getElementById('pw1').value = null;
            document.getElementById('pw2').value = null;
            사용가능아이디검증 = null;
            비번검증 = null;
            비번형식검증 = null;
        }


        // if (idsigncheck && pwsigncheck) {

        //     let data = { "id": idstate, "password": passwordstate }

        //     let headers = { "content-type": "application/json" }

        //     axios.post("http://" + IP + ":4000/user/login", data, { headers })
        //         .then(
        //             (res) => {

        //                 console.log(res)
        //                 if (res.data.statuscode == -1) {
        //                     alert("비밀번호 또는 id를 다시 확인해주세요")
        //                     return;
        //                 }


        //                 alert("로그인하셨습니다. 메인홈으로 이동합니다.");
        //                 let { userid } = res.data;
        //                 setCookie('userid', userid);

        //                 navi('/pmain');
        //                 // console.log(cookies)
        //                 //주의:원리는 모르겟으나, express 서버에서 세션 저장시 리액트에서
        //                 //아무것도 않해도 쿠키탭테 쿠키가 저장됨!!
        //                 //다음함수 주석 해재하면 실제로 출력됨
        //                 // axios.get("http://" + IP + ":4000/getcookie")
        //             }

        //         ).catch((err) => {
        //             alert(err)
        //         })

        // } else {
        //     alert("아이디 비빌번호를 입력해주세요");
        // }


    }



    let 사용가능아이디검증;
    const DuplicIdCheck = () => {

        if (id == null || id == undefined) {
            alert("사용할 아이디를 먼저 입력해주세요");
            return;
        }

        let data = { "id": id }
        let headers = { "content-type": "application/json" }
        axios.post(`http://${IP}:4000/user/duplicid`, data, { headers })
            .then((res) => {
                console.log(res.data)
                let { dulicstatuscode } = res.data;
                console.log("dulicstatuscode:   ", dulicstatuscode)
                if (dulicstatuscode == 1) {

                    document.getElementById("yesduplic").classList.add("yesduplicidaction")
                    사용가능아이디검증 = true;


                } else {
                    alert("이미 사용중인 아이디 입니다.")
                    사용가능아이디검증 = false;
                    document.getElementById("yesduplic").classList.remove("yesduplicidaction")
                }



            })
            .catch((err) => {
                console.log(err)
            })

    }



    return (<>
        <PhoneLoginBodyAllwrapper className="PhoneLoginBodyAllwrapper">
            <div className="headerarea">
                <p>
                    회원가입
                </p>
            </div>


            <div className="formloginarea" >

                <div className="inputarea">
                    <div className="idarea sign">
                        <span>ID</span>
                        <input type="text" id="id" placeholder="아이디 입력" onChange={IdChange}></input>
                        <span id="duplicid" onClick={DuplicIdCheck}>
                            <span>중복확인 하기</span>

                            <span id="yesduplic">사용가능</span>
                        </span>
                    </div>
                </div>

                <div className="inputarea">
                    <div className="pwarea sign">
                        <span>비밀번호</span>
                        <input type="password" id="pw" placeholder="사용할비밀번호확인" onChange={PwChange1}></input>
                        <span id="regexpw">
                            <span id="yesregexpw">사용가능한비밀번호입니다.</span>
                            <span id="noregexpw">사용불가능한비밀번호입니다.</span>
                        </span>
                    </div>

                </div>

                <div className="inputarea">

                    <div className="pwarea sign">
                        <input type="password" id="pw2" placeholder="입력한비밀번호확인" onChange={PwChange2}></input>
                        <span id="regexpw2">
                            <span id="yesregexpw2">비밀번호일치</span>
                            <span id="noregexpw2">불일치</span>
                        </span>


                    </div>
                </div>



                <div className="inputarea" id='submit'>
                    <div className="pwarea sign">
                        <span>회원가입</span>
                        <button id='submit' onClick={MemberJoin}>확인</button>
                    </div>

                </div>
                <div className="cutline">
                    <div className="singup">
                        <div onClick={() => {

                            navi('/psingup')

                        }}>회원가입</div>
                        <div>아이디찾기</div>
                        <div>비밀번호찾기</div>
                    </div>
                </div>
                <div className="cutline">
                    <p>쉽고 간편한 로그인</p>
                </div>

            </div>
        </PhoneLoginBodyAllwrapper>
    </>);
}
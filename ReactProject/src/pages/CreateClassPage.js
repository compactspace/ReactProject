import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {CreateClassComponent} from '../component/createclassComponent/CreateClassComponent'

import axios from "axios";



export const AllWrapper = styled.div`

position: relative;
top:100px;

margin: 0 auto;
max-width: 720px;
display: flex;
flex-direction: column;

gap:20px;

    & .stepheaderarea{
        display: flex;
        justify-content: space-between;


        .headeraction{
            height: 100%;
    color: #ff5862;
    font-size: 18px;
    font-weight: bold;
    box-shadow: 0px 3px 0px 0 #ff5862;
        }
    }


    & .stepbodyarea{
        display: flex;
        flex-direction: column;


        & .alert{
            font-size: 20px;
    font-weight: bold;
    padding: 0 0 5px 0;
        }

        & .alerttext{
            font-size: 13px;
        }


        & .teacherauthoarea{
            display: flex;
    flex-direction: column;
    gap: 20px;
    text-align: center;
    background: #f3f5f7;
    padding: 50px 0;
    height: 400px;

            & img{
                height: 200px;
             

            }


            & .getauthobtn{
                border: 1px solid #ff5862;
    background-color: #ff5862;
    color: #fff;
    padding: 10px 10px;
    width: 30%;
    margin: 10px auto;

            }
             .getauthobtnaction{
                display: none;
             }

             & #goauthoarea{
                display: none;
             }
             
            }
            .goauthoareaaction{
               display: block !important;
            }


    }


`;


export const CreateClassPage = () => {

    let 공공데이터서비스키="GhRJv8ycxRRBetiPJrJJn0wvxKyRWvfo%2B2%2FLp7Ei65PuIROQI7IcZ48p%2F71i%2FpNLUzaRgv9nVNsqXRNNIW4I6w%3D%3D";

    let naiv = useNavigate();

    let IP;

    if (window.location.href.indexOf("localhost") == -1) {
        IP = process.env.REACT_APP_SMARTPHONE_IP;
    } else {
        IP = "localhost";
    }

    useEffect(()=>{
        document.getElementById("header1").classList.add("headeraction");
    },[])


    const 인증번호받기 = () => {

        axios.post(`http://${IP}:4000/teacher/messageautho`)
            .then((res) => {


                if (res.data.statuscode == -1) {
                    alert("회원가입시  \n 핸드폰번호를 기입하지 않으셨습니다. \n 개인정보 수정란에서 \n 핸드폰번호를 입력해주세요");
                    naiv("/generallogin");
                    return;
                }



                if (res.data.statuscode == 0) {
                    alert("먼저 로그인을 필요로 합니다. \n 로그인창으로 이동합니다.");
                    naiv("/generallogin");
                    return;
                }


                alert("발송해드린 인증번호로 \n 인증을 진행해주세요")
                document.getElementById("getauthobtn").classList.add("getauthobtnaction");
                document.getElementById("goauthoarea").classList.add("goauthoareaaction");
              



            })
            .catch((err) => {

            })




    }



    let authonumber;
    const 인증번호입력 = () => {

       

        if (authonumber == '' || authonumber == " ") {
            document.getElementById("authonumber").value = null;
            return;
        }
        authonumber = document.getElementById("authonumber").value;



    }



    let [사업자등록하러가기,set사업자등록하러가기]=useState(false);

    const 인증하기 = () => {



        if (authonumber == null || authonumber == undefined) {
            alert("발급받으신 인증번호를 입력해주세요")
            return;
        }


        let data = { "authonumber": authonumber };
        let headers = { "content-type": "application/json" };



        axios.post(`http://${IP}:4000/teacher/authocheck`, data, { headers })
            .then((res) => {

                if(res.data.authostatuscode==1){
                    alert("인증되셨습니다.\n 이제 등록 단계로 넘어갑니다.")
                    set사업자등록하러가기(true);
                    document.getElementById("header1").classList.remove("headeraction");
                    document.getElementById("header2").classList.add("headeraction");

                }



            })
            .catch((err) => { console.log(err) })

    }

    
    const 사업자번호입력 = ()=>{};
    
    const 사업자번호검증 =()=>{
        // axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
        // axios.defaults.baseURL = "http://api.odcloud.kr/api";
    //     let data = {
    //         "b_no": "588-87-00966" // 사업자번호 "xxxxxxx" 로 조회 시,
    //        }; 
    //     let headers={"content-type":"application/json"}   
    //     let url=`api/nts-businessman/v1/status?serviceKey=${공공데이터서비스키}`
    //    // axios.post(url,data,{headers})
         axios.post(`http://${IP}:4000/`)
        .then(
            (res)=>{console.log(res)}
        )
        .catch((err)=>{
            console.log(err)
        })
    }


    return (<>

        <AllWrapper>
            <div className='stepheaderwrapper'>

                <div className='stepheaderarea'>
                    <div className='header'id='header1'>01.본인인증</div>
                    <div className='header'id='header2'>02.사업자인증</div>
                    <div className='header'id='header3'>03.선생님으로전환완료</div>
                </div>

            </div>
            <div className='stepbodywrapper'>
                {/* 쫌있다 조건을  사업자등록하러가기 으로 바꿔라 */}
               
                {사업자등록하러가기 ?

                 <>


                <CreateClassComponent></CreateClassComponent>
                 {/* <h1 onClick={사업자번호검증}>클릭</h1> */}




                 </>
                :
                <>
                <div className='stepbodyarea'>
                    <div className='teacheralertarea'>
                        <div className='alert'>주의사항</div>
                        <div className='alerttext'>먼저 회원가입을 하신후, 작가 인증을 진행해주셔야 합니다.
                            외원가입 없이 작가 인증은 할 수 없습니다.
                            로그인을 반드시 로그인을 진행하신후 눌러주세요

                        </div>
                    </div>
                    <div className='teacherauthoarea'>
                        <div className='samsecss img'>
                            <img className='imgarea' src='phoneicon/phonemainicon.png'></img>
                        </div>
                        <div className='samsecss'>
                            <div className='alert' style={{ color: "#596a88" }}>선생님 등록은 한번더 인증이 필요해요</div>
                            <div className='alerttext'>먼저 로그인을 진행해주시고  작가 인증을 진행해주셔야 합니다.
                                외원가입 없이 작가 인증은 할 수 없습니다.

                            </div>
                        </div>
                        <div className='samsecss'>
                            <div className='getauthobtn'  id="getauthobtn"onClick={인증번호받기}>인증번호받기</div>
                        </div>

                        <div className='samsecss' id="goauthoarea">

                            <input id="authonumber" type='password' placeholder='발급받으신 인증번호를 입력해주세요' onChange={인증번호입력}></input>
                            <div className='getauthobtn' onClick={인증하기}>인증하기</div>
                        </div>



                    </div>
                </div>
                
                </>
                }



            </div>
            <div className='stepfooterwrapper'></div>

        </AllWrapper>


    </>);



}
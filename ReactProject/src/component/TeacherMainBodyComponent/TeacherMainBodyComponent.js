import React, { useEffect, useState } from "react";



import { CalandarComPo } from '../CalandarComPo/CalandarComPo'
import {PlayerCountUpdateComPo} from '../PlayerCountUpdateComPo/PlayerCountUpdateComPo'
import { ReserveListComPo } from '../ReserveListComPo/ReserveListComPo'
import Calendar from 'react-calendar';
import styled, { css } from "styled-components";

import oneday42 from '../../img2/oneday41.jpg'
// 리랜더링 테스트 용도임
import { DetailMypage } from '../../body/detailmypage'

import { useNavigate } from "react-router-dom";

import { MyInfoBodyComponent } from '../../component/MyInfoBodyComponent/MyInfoBodyComponent'

const MyPageAllWrapper = styled.div`
    display: flex;
    gap: 24px;
    /* margin: 20px auto 0; */
    /* max-width: 1200px; */
//css
 & .LeftAllwrapper{

    border: 1px solid #ebebeb;
    border-radius: 12px;
    /* flex: 0 0 282px; */
    width: 10%;
    height: fit-content;
    margin-top: 12px;

 & ul{
    padding: 0 0;
    margin: 0 0;
 }
    & #last{
        border-bottom:none !important;
    }
    & li{
        border-bottom: 1px solid #ebebeb;
    height: 60px;
    line-height: 24px;
    list-style: none;
    padding: 0 24px;

  & a{   
    color: #333;
    display: flex;
    height: inherit;
    justify-content: space-between;
    text-decoration: none;
/* 주의 하라, 텍스트의 align-items: center; 를 쓰러면 해당 태그를 grid나, flex로 선언해야한다고한다. */
    align-items: center;
  }

    }
 }

& .RightAllwrapper{

    ${(props) =>
        props.예약리스트펼치기 ? css` width:85%;` : css` width:100%;`
    }


${(props) =>
        props.인원수조정등 ? css` width:85%;` : css` width:100%;`
    }







//달력시작

 & .schedul{
    width: 100% !important;

    & .react-calendar{
        width: 100% !important;
        height: 820px !important;
    display: flex;
    flex-direction: column;

        & .react-calendar__navigation{
            height: 5% !important;
        }

        & .react-calendar__viewContainer{
            height: 95% !important;
        }

        & .react-calendar__month-view{
            height: 100% !important;

           & .react-calendar__month-view__weekdays{
            height: 100px !important;
           }
           & .react-calendar__month-view__days{
            height: 700px !important;
           }
        }

    }

 }

//달력종료









   


    & .Rightwrapper{
        
        margin-left: 24px;
        display: flex;
 
    }

    & h1{
        -webkit-line-clamp: 2;
    
    color: #333;    
    line-height: 29px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-line;
    word-break: keep-all;

    }

    & .pageheader{

        line-height: 21px;
    padding: 16px 0;
    font-size: 18px;
    font-weight: 700;
    color: #333;
    }


 & .reserveul{

    margin-bottom: 24px;

& .reservelist{
    display: flex;
    flex-direction: row;
    padding: 16px 0;
    position: relative;

& .reserveimg{

    background-color: #eee;
    border: none;
    border-radius: 8px;   
    flex-shrink: 0;
    height: 120px;
    margin-right: 16px;
    padding: 0;
    width: 120px;
    background-color: #f5f7fa;
    background-position: 50%;
    background-size: cover;
  
    
}

& .infobox{
    display: flex;
    flex-direction: column;

    & .reservestatus{

        align-items: center;
    display: flex;
    flex-direction: row;
    }

    & .detail{

        display: flex;
    flex-direction: row;
    margin-top: 16px;

        & a{
            align-items: center;
    background: #ebebeb;
    border-radius: 8px;
    color: #333;
    display: flex;
    height: 32px;
    justify-content: center;
    line-height: 14px;
    width: 80px;
        }

    }


}


}

 }


}



    & .managerWrapper{



    }



`





export const TeacherMainBodyComponent = (props) => {



    let [showdetail, setShowdetail] = useState(false);


    let [choicedetail, setChoiceDetail] = useState(null);



    let [myinfo, setMyInfo] = useState(false);
    let [예약리스트펼치기, set예약리스트펼치기] = useState(false)
    let [인원수조정등, set인원수조정등] = useState(false)
    let infolist = props.reservelist;
    // console.log(props)
    let navi = useNavigate();
    let btn;



    const OpenMyInfo = () => {
        setMyInfo(true);
        set예약리스트펼치기(false);
        set인원수조정등(false)

    }


    const 예약리스트로가기 = () => {
        set예약리스트펼치기(true);
        setMyInfo(false);
        set인원수조정등(false)
    }


    const 인원수정및마감등수정하기 = () => {
        set인원수조정등(true)
        setMyInfo(false);
        set예약리스트펼치기(false);

    }







    return (<>
        <MyPageAllWrapper className="MyPageAllWrapper" 예약리스트펼치기={예약리스트펼치기} 인원수조정등={인원수조정등}>
            <div className="LeftAllwrapper">
                <ul>
                    <li onClick={예약리스트로가기}><a>예약내역 리스트</a></li>
                    <li onClick={OpenMyInfo}><a>날짜 개설하기</a></li>
                    <li id='last' onClick={인원수정및마감등수정하기}><a>인원수정/마감수정하기</a></li>
                </ul>

            </div>







            {showdetail ? <>


                <DetailMypage showdetail={showdetail} choicedetail={choicedetail}></DetailMypage>
                {/* <DetailMypage infolist={infolist} choicedetail={choicedetail}></DetailMypage>    */}
            </>
                : <>

                    <div className="RightAllwrapper">

                        <div className="Rightwrapper">


                            {예약리스트펼치기 ?
                                <>
                                    <ReserveListComPo></ReserveListComPo>

                                </>
                                :
                                <>

                                </>

                            }
                            {인원수조정등 ?
                                <>
                                <PlayerCountUpdateComPo></PlayerCountUpdateComPo>
                                </>
                                :
                                <>
                                </>
                            }





                            {myinfo ?
                                <>

                                    <CalandarComPo></CalandarComPo>
                                    {/* <div className="schedul">
                                        <Calendar>

                                        </Calendar>

                                        <div className="restseat">
                                            <div className="restseats">
                                                <div>

                                                </div>
                                                <div className="one">

                                                </div>

                                            </div>
                                            <div className="restseats">
                                                <div className="two">

                                                </div>
                                            </div>
                                            <div className="restseats">
                                                <div className="three">

                                                </div>
                                            </div>
                                        </div>

                                    </div> */}











                                    {/* <MyInfoBodyComponent></MyInfoBodyComponent> */}
                                </>

                                : <>
                                    {/* <div className="pagetitle" id='pagetitle'>
                                        <h1>예약내역</h1>

                                    </div>
                                    <div className="pagecontent">
                                        <div className="pageheader">
                                            이용완료 및 예약취소
                                        </div>

                                        <ul className="reserveul">
                                            {infolist != null ? infolist.map((obj, idx) => {
                                                return (<>
                                                    <li className="reservelist">
                                                        <div className="reserveimg" style={{ backgroundImage: `url(${obj.reserve_img})` }}>

                                                        </div>

                                                        <div className="infobox">
                                                            <div className="reservestatus">
                                                                <span>
                                                                    {
                                                                        obj.reservestatus == 'payment' && obj.reserve_using == 'true' ? '이용완료'
                                                                            : obj.reservestatus == 'payment' ? '결제완료' : '환불완료'
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="onedayname">
                                                                <h4>{obj.onedayclass_name}</h4>
                                                            </div>
                                                            <div className="detail">
                                                                <a>{obj.reservestatus == 'payment' ?


                                                                    <a onClick={() => {

                                                                        if (!showdetail) {
                                                                            setShowdetail(true);
                                                                            setChoiceDetail(obj);

                                                                        } else {
                                                                            setShowdetail(false)
                                                                        }
                                                                    }}>예약상세</a>


                                                                    :

                                                                    <a onClick={() => {
                                                                        navi(`/onedayclass/${obj.onedayclass_num}`)
                                                                    }}>다시예약</a>


                                                                }</a>

                                                                {
                                                                    obj.reservestatus == 'paycancle' ?
                                                                        <a onClick={() => {
                                                                            navi(`/onedayclass/${obj.onedayclass_num}`)
                                                                        }}>다시예약</a>
                                                                        :

                                                                        obj.reserve_using == 'false' ?

                                                                            <a onClick={async () => {

                                                                                let 취소를위한JSON정보 = obj;


                                                                                let url = "http://localhost:4000/user/paycancle"

                                                                                await axios.post(url, 취소를위한JSON정보)

                                                                                    .then((res) => {
                                                                                        console.log(res.data);
                                                                                        console.log("환불성공코드는 1: " + res.data.statusCode);
                                                                                        if (res.data.statusCode == 1) {
                                                                                            alert("환불하였습니다.")
                                                                                            window.location.href = '/mypage';
                                                                                        }


                                                                                    }).catch((err) => {

                                                                                        console.log(err);
                                                                                    })
                                                                            }}>환불하기</a>


                                                                            :



                                                                            <></>



                                                                }


                                                            </div>



                                                        </div>


                                                    </li>
                                                </>);

                                            }) : <h3>불러오는중</h3>}


                                        </ul>


                                    </div> */}
                                </>}

                        </div>

                    </div>


                </>}








        </MyPageAllWrapper>

    </>);
}

import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";




const 예약리스트올래퍼 = styled.div`

display: flex;
flex-direction: column;

width: 100%;
gap: 50px;
& .headercontent{
    display: flex;
   justify-content: space-between;
}


 & .headerwarea{

    height: 100px;
    background-color: #fafafa;
    border: 1.5px solid #fafafa;

    & .headercontent{
    height: 100%;
    align-items: center;

    & .choiceCalrendar{

        display: flex;
        flex-direction: column;
        & .sameinputcss{
            display: inline-block;
            
        }
    }


}
 }


 & .cutline{
    color: #fff;
    background: #2189FF;
    height: 70px;
    align-items: center;
    display: flex;
    justify-content: center;

    & .cutlinecontent{
        width: 90%;
        display: flex;
        justify-content:space-between
    }

 }



 & .reservelistarea{

    display: flex;
    flex-direction: column;
    gap:10px;

    & .eachlistarea{
        display: flex;
        justify-content: space-between;
        background-color: #fafafa;
    border: 1.5px solid #fafafa;

        & .samecontentcss{
            display: flex;
            flex-direction: column;
            width: 200px;
            height: 100px;
            color: #333;
            align-items: center;
            font-weight: 600px;
            & .header{
                padding: 10px 10px;
                text-align: center;
                height:10%

            }

            & .content{
                padding: 10px 10px;
                height:90%;
                text-align: center;

            }
            & .samebtncss{
                width: 50%;
                background: #FF5862;
border-radius: 7px;
font-style: normal;
font-weight: 800;
font-size: 16px;
line-height: 18px;
text-align: center;
color: #FFFFFF;
            }

           

        }


    }

    
 }


`

export const PlayerCountUpdateComPo = () => {


    let IP
    if (window.location.href.indexOf("localhost") == -1) {
        IP = process.env.REACT_APP_SMARTPHONE_IP;
    } else {
        IP = "localhost"
    }


    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜

    if (month.length == 1) {
        month = "0" + month;
    }




    let [선택한날짜, set선택한날짜] = useState(null);
    console.log("date ", date, " date.length:  ", date.toString().length)
    if (date.toString().length == 1) {
        date = "0" + date;
    }

    let 오늘년월일 = year + "-" + month + "-" + date;

    console.log("오늘년월일 ", 오늘년월일)



    // let 
    //    { application_day,

    //     id,

    //     merchant_uid,

    //     onedayclass_num,

    //     openday,

    //     reserve_name,

    //     reserve_tell,

    //     reserve_using,

    //     reserveinfo_num,

    //     reservestatus}





    let [예약자객체배열, set예약자객체배열] = useState(null);


    useEffect(() => {


        let data = { "openningday": 오늘년월일 };

        //또 자바스크립트의 한박자 느린 버그있을듯
        if (오늘년월일 == undefined) {
            alert("새로고침해주세용")
            return;
        }

        let headers = { "content-type": "application/json" }



        axios.post(`http://${IP}:4000/teacher/getTheFullReservelist`, data, { headers })
            .then((res) => {

                let 예약자배열객체 = res.data;

                set예약자객체배열(예약자배열객체)
                set선택한날짜(오늘년월일)
                console.log(예약자배열객체)
            })
            .catch((err) => {
                console.log(err);
            })




    }, [])

    let 선택한날;
    let [선택한날상태, set선택한날상태] = useState(null)
    const 날짜체인지 = () => {
        선택한날 = document.getElementById("date").value;
        set선택한날상태(선택한날);
    }


    const 선택한날짜로조회 = () => {

        if (선택한날상태 == "" || 선택한날상태 == undefined || 선택한날상태 == null) {
            alert("날짜를 먼저 선택해주세요");
            return;
        }

        let data = { "openningday": 선택한날상태 };



        let headers = { "content-type": "application/json" }



        axios.post(`http://${IP}:4000/teacher/getTheFullReservelist`, data, { headers })
            .then((res) => {

                let 예약자배열객체 = res.data;

                set예약자객체배열(예약자배열객체)
                set선택한날짜(오늘년월일)
                console.log(예약자배열객체)
            })
            .catch((err) => {
                console.log(err);
            })


    }




    return (<>
        <예약리스트올래퍼 className="reservelistAllWrapper">
            <div className="headerwarea">
                <div className="headercontent">
                    <div className="headername">날짜선택</div>
                    <div className="choiceCalrendar">
                        <input type="date" className="sameinputcss" id="date" onChange={날짜체인지}></input>
                        <input type="text" placeholder="핸드폰번호" className="sameinputcss" id="phone" ></input>
                    </div>
                </div>
            </div>

            <div className="cutline">
                <div className="cutlinecontent">
                    <div>
                        {선택한날짜 == null ?
                            <>
                                --조회중입니다.--
                            </>
                            :
                            <>
                                선택한 날짜 {선택한날짜} 조회 검색 결과

                            </>
                        }

                    </div>
                    <div onClick={선택한날짜로조회}>
                        조회하기
                    </div>

                </div>
            </div>

            <div className="reservelistarea">
                {예약자객체배열 == null ?
                    <>
                        <span>해당 날짜의 예약건이 없습니다.</span>

                    </>
                    :


                    예약자객체배열.map((obj, idx) => {
                        let 결제년월일 = obj.openday.split("T")[0].replace("T", "");
                        let 결제시간 = obj.openday.split("T")[1].split(".")[0]


                        let 한번자르고=obj.Playinguser.split("최대")[1];
                        let 실재재고=한번자르고.split("명")[0];

                        return (

                            <div className="eachlistarea">
                                <div className="samecontentcss">
                                    <div className="header"> 클래스명</div>
                                    <div className="content"> {obj.onedayclass_name}</div>
                                </div>
                                <div className="samecontentcss">
                                    <div className="header">개강날짜</div>
                                    <div className="content">  {
                                        결제년월일 + "-" + 결제시간


                                    }</div>
                                </div>
                                <div className="samecontentcss">
                                    <div className="header">이용요금</div>
                                    <div className="content"> {obj.onedayclass_price}</div>
                                </div>
                                <div className="samecontentcss">
                                    <div className="header">현재남은자리/실재고</div>

                                    <div className="content"> {
                                        obj.rest

                                    }/{실재재고}</div>
                                    <div className="content samebtncss" >수정하기</div>

                                </div>
                                <div className="samecontentcss">
                                    <div className="header">마감/개강</div>



                                    <div className="content"> {
                                        obj.isopenning == 'yes' ?
                                            <>개강중</>
                                            :
                                            <>마감</>
                                    }</div>

                                    <div className="content samebtncss">수정하기</div>
                                </div>
                            </div>
                        )




                    })



                }
                {
                    예약자객체배열 != null && 예약자객체배열.length == 0 ?
                        <>
                            <span>해당 날짜의 예약건이 없습니다.</span>
                        </>
                        :
                        <>

                        </>
                }

                <div className="cutlinecontent"></div>
            </div>
        </예약리스트올래퍼>

    </>);


}
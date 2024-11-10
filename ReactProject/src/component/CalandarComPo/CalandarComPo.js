import Calendar from "react-calendar";
import styled from "styled-components";
import axios from "axios";

import { useEffect, useState } from "react";

const 달력올레퍼 = styled.div`

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


`

const 개강등마감올레퍼 = styled.div`

    box-shadow: 0 0 17px 3px rgb(171 171 171 / 50%);
    
    background-color: #FFF !important;



& .managerWrapper{
    gap: 100px;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0px 10px;

    & .managerheaderarea{
    color: rgb(255, 121, 126);
    font-weight: 800;
    font-size: 20px;
    line-height: 41px;

}


& .managerbodyarea{
display: flex;
flex-direction: column;
    height: 300px;
    justify-content: space-between;

  & .openningstatusarea{
    display: flex;
    flex-direction: column;
    background: #FF5862;
    border-radius: 7px;
    padding: 20px 6px;
    font-style: normal;
    font-weight: 800;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    color: #FFFFFF;
  }


  & .choicedayarea{
    display: flex;
    flex-direction: column;
    background: #8094FF;
    border-radius: 7px;
    padding: 20px 6px;
    font-style: normal;
    font-weight: 800;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    color: #FFFFFF;
  }

 & #openandclose{
    display: flex;
    justify-content: space-between;


    & .detailarea{
        display: flex;
    flex-direction: column;
    background: #FF5862;
    border-radius: 7px;
    padding: 20px 6px;
    font-style: normal;
    font-weight: 800;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    color: #FFFFFF;

    }


    & .btnarea{
        display: flex;
    flex-direction: column;
    background: #8094FF;
    border-radius: 7px;
    padding: 20px 6px;
    font-style: normal;
    font-weight: 800;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    color: #FFFFFF;
    }


 }

}




}




`

export const CalandarComPo = () => {




    let [개강등상태, set개강등상태] = useState(null);


    let IP
    if (window.location.href.indexOf("localhost") == -1) {
        IP = process.env.REACT_APP_SMARTPHONE_IP;
    } else {
        IP = "localhost"
    }




    let [개강상태DB, set개강상태DB] = useState(new Object());
    useEffect(() => {



      



        let 달력날짜버튼 = document.getElementsByClassName("react-calendar__tile react-calendar__month-view__days__day");



        let managerheader = document.getElementById("managerheaderarea");

        for (let k = 0; k < 달력날짜버튼.length; k++) {

            달력날짜버튼[k].addEventListener("click", (e) => {

                //이게 이벤트가 너무 협소하게 들어가서 null경우가 있어 막아버림
                if (e.target.getAttribute("aria-label") == null) {
                    return;
                }

                let 날짜 = e.target.getAttribute("aria-label");

                console.log("날짜:   ",날짜)




                let data = { "openningday": 날짜 };
                let headers = { "content-type": "application/json" }

                //역시 이벤트가 너무 협소하게 들어가서 널이라면 리턴처리
                set개강등상태(날짜)
                if (날짜 == null) {
                    alert("다시 시도해주세요")
                }

                axios.post(`http://${IP}:4000/teacher/showmanagerinfo`, data, { headers })
                    .then(
                        (res) => {

                            console.log(res.data)
                            let 개강상태코드 = res.data.openningstatuscode
                            let deep = { ...개강상태DB };
                            deep.openningday = 날짜;
                            if (개강상태코드 == -1) {

                                deep.isopenning = "no"
                                set개강상태DB(deep)
                            } else {
                                deep.isopenning = "yes"
                                set개강상태DB(deep)

                            }
                        }
                    )
                    .catch((err) => {
                        console.log(err)
                    })



            }
            )


        }








    }, [])



    const GoOpenClass = () => {

        console.log("클릭날찌:  ", 개강상태DB.openningday)
        let data = { "openningday": 개강상태DB.openningday };
        let headers = { "content-type": "application/json" };
        axios.post(`http://${IP}:4000/teacher/goopnenclass`, data, { headers })
            .then((res) => {


                console.log(res.data)
                let 개강성공코드 = res.data.updatestatuscode
                let deep = { ...개강상태DB };               
                if (개강성공코드 == -1) {

                    deep.isopenning = "no"
                    set개강상태DB(deep)
                } else {
                    deep.isopenning = "yes"
                    set개강상태DB(deep)

                }





            })

    }

    const GoCloseClass = () => {

        console.log("클릭날찌:  ", 개강상태DB.openningday)
        let data = { "openningday": 개강상태DB.openningday, "classclose": "close" };
        let headers = { "content-type": "application/json" };
        axios.post(`http://${IP}:4000/teacher/goopnenclass`, data, { headers })
            .then((res) => {


                console.log(res.data)
                let 개강성공코드 = res.data.updatestatuscode
                let deep = { ...개강상태DB };
              
                if (개강성공코드 == -1) {

                    deep.isopenning = "yes"
                    set개강상태DB(deep)
                } else {
                    deep.isopenning = "no"
                    set개강상태DB(deep)

                }
            })
    }



    return (<>


        <달력올레퍼>
            <div className="schedul">
                <Calendar
                >

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

            </div>
        </달력올레퍼>

        <개강등마감올레퍼>
            <div className="managerWrapper">
                <div className="managerheaderwrapper">
                    <div className="managerheaderarea" id="managerheaderarea">
                        {개강등상태 == null ?

                            <>
                                <div>관리하실 날짜를 선택하세요</div>
                            </>

                            :
                            <>
                                <div>
                                    관리하실 날짜 :{개강등상태}

                                </div>

                            </>
                        }
                    </div>
                </div>
                {개강등상태 == null ?

                    <>

                    </>

                    :
                    <>
                        <div className="managerbodywrapper">
                            <div className="managerbodyarea">
                                <div className="samecss">
                                    <div className="openningstatusarea">
                                        {개강상태DB.isopenning == "no" ?
                                            <>
                                                <div>상태: 해당 날짜는 개강 하지 않으셨습니다.</div>

                                            </>
                                            :
                                            <>

                                                <div>상태: 해당 날짜는 개강중 입니다.</div>

                                            </>
                                        }
                                    </div>
                                </div>

                                <div className="samecss">
                                    <div className="choicedayarea">

                                        선택하신 날짜 : {개강상태DB.openningday}
                                    </div>

                                </div>
                                <div className="samecss" id="openandclose">
                                    <div className="detailarea">Detail</div>
                                    <div className="btnarea">
                                        {개강상태DB.isopenning == "no" ?
                                            <>
                                                <div className="goopenclass" onClick={GoOpenClass}>개강하기</div>
                                            </>
                                            :
                                            <>

                                                <div className="goopenclass" onClick={GoCloseClass}>마감하기</div>

                                            </>
                                        }



                                    </div>
                                </div>
                            </div>


                        </div>

                    </>
                }


            </div>

        </개강등마감올레퍼>


    </>);
}
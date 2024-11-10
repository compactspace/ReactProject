import React from 'react';

import { io } from 'socket.io-client';
import styled, { css } from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom'

import { useCookies } from 'react-cookie';
const QuestionAllWrapper = styled.div`


  & #gobottom{
    width: 100px;
    height: 100px;
    width: 100px;
    height: 100px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url("/icon/downIcon.png");
  }



.actionadd{
    display: block;
    position: fixed;
  
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
   
    bottom: 100px;
    right: 0px;
   
    width: 100px;
    height: 100px;
    width: 100px;
    height: 100px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url("icon/downIcon.png");
}

.actionadd2{
   display: none;
}







margin: 0 auto;

display: flex;
flex-direction: column;

  & .header{
    background: #5988FE;
   // background: #FFF0F1;
    border-radius: 7px;
    padding: 20px 41px;
    font-style: normal;
    text-align: left;
    color: #FFFFFF !important;
    font-style: normal;
    font-weight: 800;
    font-size: 16px;
   // color: #FF5862;
  }

  

  & .chatarea{
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    /* height: 1080px; */
      background: #E9F1FE;
      /* background-color: red; */ 



    & .chatinfo{
        overflow: auto;
        padding: 20px 20px;
      /* background-color: black; */

      & .me{
    display:flex;
    justify-content: end;
  
    & .messageheaderme{

        display: flex;
        justify-content: end;
    }

    & .timeme{
        display: flex;
        justify-content: end;
    }
    }


        & .massagecontenme {

            display: flex;
            justify-content: end;

            & .massageconten{   
          
          background:white !important;
          color: black !important;
        
        }

        }
  
     
      & .other{
        display:flex;
        justify-content:start;
  
        & .massageconten{   
  
   background:#306afe !important;
   color: #FFFFFF !important;
}



        }  

    & .messagearea{
      display: flex;
      flex-direction: column;

  & .massageconten{
   
      margin-bottom: 5px;
     
     
    border-radius: 7px;
    padding: 20px 50px;
    font-style: normal;
    font-weight: 800;
    font-size: 16px;   
    

  }

    } 
        
    }


  }




  

 


`
const SubmitArea = styled.div`
& .submitarea{
    background-color: #5988FE;


    /* height: 20%; */
  
    

    display: flex;
    flex-direction: column;
    

    & .textareaarea{
        
        /* height:80%; */
        display: grid;
        grid-template-columns: 10% 80% 10% ;
        align-items: center;



        & .textarea{
    
            width: 100%;
            border: none;
            height: 100%;
                padding: 5px;
                box-sizing: border-box;
                /* border: solid 2px #1E90FF; */
                /* border-radius: 5px; */
                font-size: 16px;
                resize: both;
        }
    }


  & .submitbtnarea{
      display: flex;
    justify-content: center;
    height: 20%;
    align-items: center;


    & #toserver {
        border: none;
       // border-radius: 10px 10px;
    font-size: 10px;
    background: #306afe !important;
    color: #FFFFFF !important;
    width: 70px;
    height: 30px;
    
    }

    & #addfile{
        border: none;
       // border-radius: 10px 10px;
    font-size: 10px;
    background: #306afe !important;
    color: #FFFFFF !important;
    width: 70px;
    height: 30px;
    }

  }



  }

`

export const QnABody = () => {
    const [cookies, setCookie] = useCookies(['tid']);

    //주의할건 쿼리스트링값으로 넘어오는 id는 학생의 아이디임.
    let { onedayclass_num, id } = useParams();

    // 이는 쿠키에 저장되어있는 선생아이디
    let testid = cookies.tid;
    // console.log("testid:  " + testid);

    let [myvalue, setMyValue] = useState(null);
    let [othervalue, setOthervalue] = useState(null);


    let [allmessage, setAllmessage] = useState([]);

    let [cntcheck, setCntcheck] = useState(false);
    let [mysocket, setMysocket] = useState(null);
    let [room_num, setRoom_num] = useState(null);
    // let [chatlist, setchatlist] = useState(new Array());
    // let [mychatlist, setmychatlist] = useState(new Array());




    let navi = useNavigate();

    var value;

    //   let socket;


    const messages = useRef();


    useEffect(() => {
        let socket = io('http://localhost:5000/enterance');
        let newarr;
        let newobj;
        socket.emit("enterancedata", { "id": id, "onedayclass_num": onedayclass_num })
        socket.on("enterancedata", (data) => {
            console.log(data)
            setRoom_num(data.room_num);
            newarr = new Array();
            data.excute.map((content) => {

                let dialogue_createdA = content.dialogue_createdAt.substr(0, content.dialogue_createdAt.indexOf("T"))


                newobj = new Object();
                if (content.writer == `${testid}`) {
                    newobj.writerMe = content.writer;
                    newobj.contentMe = content.content;
                    newobj.createdAt = content.dialogue_createdAt;
                } else {
                    newobj.writerOther = content.writer;
                    newobj.contentOther = content.content;
                    newobj.createdAt = content.dialogue_createdAt;
                }
                newarr.push(newobj);
                newobj = null;
            })
            // console.log("socket.connected:  " + socket.connected);
            // console.log(socket);
            if (socket.connected) {
                setCntcheck(true);
                setMysocket(socket);
            }
            // setAllmessage(newarr);
            // console.log(newarr);
            setAllmessage(newarr);

        })


    }, [])



    let [isbottom, setIsbottom] = useState("false")
    window.addEventListener('scroll', () => {

        let scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치
        let windowHeight = window.innerHeight; // 스크린 창
        let fullHeight = document.body.scrollHeight; //  margin 값은 포함 x      

        let currentscroll = parseInt(scrollLocation) + parseInt(windowHeight);

        console.log("scrollLocation:   " + scrollLocation)
        if (currentscroll >= fullHeight) {
            setIsbottom("true");
        }
        else if (scrollLocation <= 560) {
            setIsbottom("false");

        }
    });


    useEffect(() => {
        console.log("유즈이펙트후: " + isbottom)

        if (isbottom == "true") {
            setStyle("true");
        }
        if (isbottom == "false") {
            setStyle("false");
        }

    }, [isbottom])

    let [style, setStyle] = useState(null);
    useEffect(() => {
        console.log("style 유즈이펙트후: " + style)

        if (style == "true") {

            let gobottom = document.getElementById("gobottom");

            gobottom.classList.remove("actionadd")
            gobottom.classList.add("actionadd2")
        }
        else {

            let gobottom = document.getElementById("gobottom");

            gobottom.classList.add("actionadd");
            gobottom.classList.remove("actionadd2")


        }


    }, [style])






    const TextChange = (e) => {
        value = document.getElementById('text').value;

    }

    const KeyDown = (e) => {
        //윈도우 기준 
        // 13=엔터 스페이스바32
        console.log(e.keyCode)
        if (e.keyCode == 13) {



        }
    }



    //웹소켓으로 서버로 채팅내역을 보낸다.
    const ToServer = () => {
        mysocket.emit('chatstart', { value, testid, room_num });
        let newobj = new Object();
        newobj.writerMe = testid
        newobj.contentMe = value
        //  newobj.createdAt=content.dialogue_createdAt;
        let deep = [...allmessage];
        deep.push(newobj)
        setAllmessage(deep);
        document.getElementById('text').value = null;
    }



    //클라이언트 쪽의 웹소캣으로 서버가 주는 데이터를 듣고 상데방의 채팅내역을 받는다.
    if (mysocket != undefined && mysocket != null) {
        mysocket.on('chatstart', (res) => {
            console.log(res);
            let newobj = new Object();
            newobj.writerOther = res.writerOther
            newobj.contentOther = res.contentOther
            newobj.createdAt = res.createdAt;
            let deep = [...allmessage];
            deep.push(newobj)
            setAllmessage(deep);
        })
    }

    const ToJoinOnedayclass = () => {
        alert("선생님이 상담중입니다 잠시만 기다려주세용");
    }



    //   if (allmessage != undefined && allmessage != undefined) {
    //     allmessage.map((e) => {
    //       console.log(e);
    //     })
    //   }


    //밑 컴포넌트의 리턴부의 map에서 반복적으로 호출할 채팅내역을 담는 함수
    let Showlist = (e) => {

        let chatlist = new Array();

        // console.log((e.me!=undefined)+ " "+(e.other!=''))

        for (let key of Object.keys(e)) {
               console.log("key:  "+key)

            if (key == 'writerMe') {

                if (e[key] == null) { }
                else {
                    let today = new Date();
                    chatlist.push(
                        <div className='me'>
                            <div className='messagearea'>

                                <div className='messageheaderme'>
                                    <div className='messageheader'>{e.writerMe}</div>
                                </div>



                                <div className='massagecontenme'>
                                    <div className='massageconten' style={{ whiteSpace: 'pre-line' }} > {e.contentMe}</div>
                                </div>
                                <div className='timeme'>
                                    <div className='time'>
                                        {e.createdAt}
                                    </div>

                                </div>


                            </div>
                        </div>
                    );
                }



            } else if (key == 'writerOther') {

                if (e[key] == '' || e[key] == '') {

                } else {



                    let today = new Date();
                    chatlist.push(
                        <div className='other'>
                            <div className='messagearea'>
                                <div className='messageheader'>{e.writerOther}</div>
                                <div className='massageconten' style={{ whiteSpace: 'pre-line' }}> {e.contentOther}</div>
                                <div className='time'>{e.createdAt}</div>

                            </div>
                        </div>);
                }

            }


        }
        return chatlist;

    }

    // const messages = useRef();



    // //리액트 state에선 불린 말고 문자열 불린을 쓰라고 자꾸 오류나옴
    // let [isbottom,setIsbottom]=useState("false")
    // // setIsbottom(true)

    const scrollToBottom = () => {
        messages.current?.scrollIntoView({ behavior: 'smooth' });
    };



    const Gobottom = () => {

        messages.current?.scrollIntoView({ behavior: 'smooth' });
    }

    return (


        <>



            <QuestionAllWrapper className='QuestionAllWrapper' >
                <div className='header'>선생님질문방</div>
                <div className='chatarea'   >

                    <div className='chatinfo'   >

                        {allmessage.map((e, idx) => {
                            return Showlist(e);
                        })}

                    </div>

                    {/* ref={messages} */}



                </div>
                {/* <div className='submitarea'  >
                    
                        <div className='textareaarea'>
                            <textarea  className='textarea' id='text' style={{ whiteSpace: 'pre-line' }} onKeyDown={KeyDown} onChange={TextChange}>
                            </textarea>
                        </div>
                        <div className='submitbtnarea' >
                            <button id='toserver' onClick={ToServer}>전송</button>
                        </div>

                        <input id='id' type='hidden' value={testid}></input>
                      
                    </div> */}



                <SubmitArea className='SubmitArea' ref={messages} >
                    {cntcheck ?
                        <>

                            <div className='submitarea' >
                                {/* <input id='text' onChange={TextChange}></input> */}

                                <div className='textareaarea'>

                                    <div className='addfilearea submitbtnarea'>

                                        <button id='addfile' >+</button>
                                    </div>

                                    <textarea className='textarea' id='text' onChange={TextChange}>
                                    </textarea>

                                    <div className='submitbtnarea'>
                                        <button id='toserver' onClick={ToServer}>전송</button>
                                    </div>



                                </div>

                                <input id='id' type='hidden' value={id}></input>

                            </div>
                        </>

                        : <>
                            <button onClick={ToJoinOnedayclass}>연결지연중입니다.</button>
                        </>}

                </SubmitArea>
                {/* {cntcheck ?
                    <>

                        <div className='submitarea'   >
                        
                            <div className='textareaarea'>
                                <textarea className='textarea' id='text' onChange={TextChange}>
                                </textarea>
                            </div>
                            <div className='submitbtnarea'>
                                <button id='toserver' onClick={ToServer}>전송</button>
                            </div>

                            <input id='id' type='hidden' value={testid}></input>
                           
                        </div>
                     
                    </>

                    : <>
                        <button onClick={ToJoinOnedayclass}>연결지연중입니다.</button>
                    </>} */}

                <div className='gobottom' id="gobottom"  onClick={Gobottom}>
                    <div id="gobottombtn">

                    </div>
                </div>
            </QuestionAllWrapper>
        </>
    );
}
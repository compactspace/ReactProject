import { TeacherMainBodyComponent } from '../component/TeacherMainBodyComponent/TeacherMainBodyComponent'
import { Header } from '../header/header'

import {TeacherManagerHeader} from '../header/TeacherManagerHeader'

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
//import {ExistCookie} from '../component/ExistCookie/ExistCookie'

export const TeacherMainPage =  () => {

    let [myinfobtn, setMyinfobtn] = useState(true);

    let [myreservepage, setMyreservepage] = useState(true);

    let [reservelist, setReserveList] = useState(null);

    let [cookie,setCookies]=useCookies(['tid']);
    let IP 
    if(window.location.href.indexOf("localhost")==-1){
        IP= process.env.REACT_APP_SMARTPHONE_IP;
    }else{
        IP= "localhost"
    }

    let navi=useNavigate();

    //선생은 아직 쿠키 있는지 미들웨어 없어 주석처리함
//    useEffect(   () => {

//         axios.get(`http://${IP}:4000/hascookie`)
//             .then((res) => {
//                 console.log(res.data)
//                 if(res.data.cookiestatuscode!=1){
//                     alert("로그인이필요합니다.");
//                     navi('/phonelogin');
//                 }
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//         let id = cookie.userid;
//         let data = { "id": id };
//         let headers = { 'Content-Type': 'application/json' }

//         axios.post(`http://${IP}:4000/user/mypage`, data, headers).then((res) => {
//             console.log(res.data);

//             setReserveList(res.data);

//         }).catch((err) => { console.log("뭔가망") })

//     }, [])




    return (<>


        <TeacherManagerHeader vmatch={"true"} myinfobtn={myinfobtn} myreservepage={myreservepage}>
        </TeacherManagerHeader>

        <TeacherMainBodyComponent reservelist={reservelist}>

        </TeacherMainBodyComponent> 
    </>)

}
import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
// import {changeauthtoken} from '../store/store'
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';

export const HeaderWrapper = styled.div`

border-bottom:${(props) => {
        if (props.myinfobtn) {

            return '1px solid #ebebeb';
        } else {
            return 'none';
        }
    }};

    z-index: 92;
    position:${(props) => {


        if (props.myreservepage) { return 'relative'; }
        else {
            return 'fixed';
        }

    }};

    height: 75px;
    width: 100%;
    top: 0;
    left: 0;
    background-color: ${props => {



        if (props.vmatch == "true") {
            return "white";
        } else {

            return '';
        }

    }
    };



    
    
    
`;



export const HeaderGrid = styled.div`

${(props) => props.match == "true" ? css`

width: 90%;
    margin: 0 auto;
display: grid;
     grid-template-rows: 100%;
    grid-template-columns: auto 180px;
    align-items: center;

`:
        css`

width: 90%;
    margin: 0 auto;
display: grid;
     grid-template-rows: 100%;
    grid-template-columns: 40% auto 180px;
    align-items: center;


`


    }

`;






export const LeftCol = styled.div`
height: 50px;
${(props) => props.match == "true" ? css`
background-color: yellow;
display: none;
`:
        css`
/* background-color: red; */
display: block;
`


    }

`;


export const CenterColNav = styled.div`
/* background-color: black; */




height: 50px;
`;

export const Navul = styled.ul`
width: 100%;
display:inline-block;



${(props) => props.match == "true" ? css`

padding: 0;

`:
        css`

`


    }






`;

export const Navulli = styled.li`

.findoutclass{
    background-image: linear-gradient(256deg, #8094ff 30%, #ff5862);

}
   

${(props) => props.vmatch == "true" ? css`
    
    &  a{
        color: black;
    padding-bottom: 3px;
    font-weight: 600;
    text-decoration: none;
    font-size: 18px;
}
    

        `: css``};





${(props) => props.vmatch == "true" ?
        css`
 display:inline-block;
margin-left: 30px;
 li{
    color :black; 
 
    padding-bottom: 3px;
    font-weight: 600;
    text-decoration: none;
    font-size: 18px;
  
}
 
 `
        :
        css`
 display:inline-block;
margin-left: 30px;
>a{
    color :rgb(255, 255, 255); 

    padding-bottom: 3px;
    font-weight: 600;
    text-decoration: none;
    font-size: 18px;
    
}
 `
    } 





`;






export const RightCol = styled.div`

height: 50px;
& .RigthNavul{

& .mypagewrapper{
    & .mypagearea{
        /* 버튼 클릭시에만 blockㅇ,로 바꾼다. */
        
        ${(props) => props.myinfobtn ? css`

display: block;

`:
        css`
        display: none;

`


    }

        max-width: 320px;
        position: absolute;
        //위치 확인용 강제 height 임
        //height: 100vh;
        
        background-color: white;

        width: 320px;
    right: 130px;
    border-radius: 4px 4px 4px 4px;





    }

//인포박스
    & .myinfoarea{
      
    width: 320px;
}


& .myinfobox{
    padding-top: 12px;
    padding-left: 16px;
    padding-right: 16px;
}

& .myreservearea{
    /* padding-top: 6px;
    padding-bottom: 6px;
    border-top-width: 1px;     */
    /* border-color: rgb(245 245 245 / var(--tw-border-opacity)); */

}

& a{
    display: flex;
    width: 100%;
    font-size: 0.875rem;
    line-height: 1.25rem;
    letter-spacing: 0px;
    font-weight: 500;   
  
    }


& .mylist{
    padding: 12px 16px;
}

/* 주의! 스크롤 내릴씨 여기다가 프롭스로 폰트 컬러를 블랙으로 맞추어 줄것 */
& #myinfobtn{
    border:none;
    background-color: transparent;
    font-size: 18px;
    color: ${(props) => {
        if (props.vmatch == "true") {
            return "black";
        } else {
            return "rgb(255, 255, 255)";
        }

    }};
    
   
}

& #myalertinfobtn{
    display: inline-block;
    position: relative;
}




& #actionSheet {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    transition: 1s;

    /* 서서히 나타나는 효과 */
    visibility: hidden;
    opacity: 0;
  }

  & #actionSheet.active {
    /* 서서히 나타나는 효과 */
    visibility: visible;
    opacity: 1;
  }

  & .action-options {
    background-color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    /* 세로 컨텐츠가 늘어나는 경우 스크롤이 생기도록 설정 */
    overflow: auto;

    max-height: 300px;
    /* 아래에서 위로 나타나는 효과, max-height과 동일하게 작성 */
    position: relative;
    bottom: -300px;

    transition: 1s;
  }
  & #actionSheet.active .action-options {
    /* 아래에서 위로 나타나는 효과, max-height과 동일하게 작성 */
    bottom: 0;
  }

  & .option {
    display:flex;
   justify-content:space-between; 
    padding: 15px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    
    & .confirm{
        width: 100px;
        display: flex;
        justify-content: space-between;
    }

  }


  & .close {
    text-align: center;
    
  }

  &  .option:hover {
    background-color: #f2f2f2;
  }







}



}






`

    ;



export const Alert = styled.div`


    position: fixed;
    top: 75px;
    width: 50%;
    right: -1600px;
    z-index: 22;
    background-color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transition: right 1s;    

    & h3{
        text-align: center;
        margin: 0px 0px;
    }

    &.aleropen{
        right: 0px;
    }
    


        & .alertarea{
        display:flex;
        flex-direction:column;
        padding:10px 10px;    


             & .alertlist{                 
                padding:10px 10px; 

            & .alerttarget{
            display:flex;
            width: 100%;
            justify-content:space-between;

                & .alertconfirm{
                display:flex;
                justify-content: space-between;
                width: 100px;
                    & div{

                    }
            }
        }

    }

}


`


export const TeacherManagerHeader = (props) => {

    let IP 
    if(window.location.href.indexOf("localhost")==-1){
        IP= process.env.REACT_APP_SMARTPHONE_IP;
    }else{
        IP= "localhost"
    }

    const STATE = "flase";


    const location = useLocation();

    // console.log(location );

    let navi = useNavigate();
    useEffect(() => {
    }, [location])


    const [cookies, setCookie] = useCookies(['tid']); // 쿠키 훅 주의:




    return <>
        <HeaderWrapper vmatch={props.vmatch} myinfobtn={props.myinfobtn} myreservepage={props.myreservepage} className='HeaderWrapper'>
            < HeaderGrid match={props.match} className='HeaderGrid'>
                <LeftCol vmatch={props.vmatch} match={props.match} className='LeftCol'>
                    {cookies.tid == null ? <>
                        <Navul>
                            <Navulli vmatch={props.vmatch} className='Navulli'>
                                <a onClick={() => {
                                    navi("/generallogin");
                                }}>로그인하기</a>
                            </Navulli>                        


                        </Navul>
                    </> : <>
                        <Navul>
                            <Navulli vmatch={props.vmatch} className='Navulli' >
                                <a onClick={() => {

                                    axios.get(`http://${IP}:4000/teacher/logout`)
                                        .then((res) => {
                                            if (res.data.logoutstatuscode == 1) {
                                                console.log("로그아웃 성공은 1:  " + res.data.logoutstatuscode);
                                                alert("로그아웃 하셨습니다.");
                                                localStorage.clear();
                                                navi('/openclass');
                                                return;

                                            }
                                        })



                                }}>로그아웃</a>

                            </Navulli>
                        </Navul>
                    </>}


                </LeftCol>
                <CenterColNav vmatch={props.vmatch} >
                    <Navul match={props.match} >
                
                    </Navul>
                </CenterColNav>
                <RightCol vmatch={props.vmatch} myinfobtn={props.myinfobtn} className='RightCol'>
                    <Navul className='RigthNavul'>
                        <Navulli className='mypagewrapper' vmatch={props.vmatch}>
                        {cookies.tid == null ?<></> :
                            <a id='myinfobtn' onClick={() => {
                                navi('/openclass')

                            }}>Home</a>

                        }
                            

                        </Navulli>
                    </Navul>

                </RightCol>
            </HeaderGrid>
        </HeaderWrapper>

    </>;
}


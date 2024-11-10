import React, { useState } from "react";



import { BrowserRouter, Route, Routes, Link, Switch } from "react-router-dom";

//디펄트 익스폴트는 파일명까지 이름붙이면 아무이름가져올수있는듯.
import { Provider } from 'react-redux';


import store from '../store/store.js'


import { QueryClient, QueryClientProvider } from '@tanstack/react-query';




import { Mainpage } from "../pages/Mainpage";
import { OpenClassPage } from "../pages/OpenClass"
import { OneDayClasspage } from "../pages/OneDayClass.js"
import { LoginLoadingComponent } from '../component/loadingcomponent/LoginLoadingcomponent.js'









import {Error404page} from '../pages/Error404page.js'



import {JustRegisteredOneDayClass} from '../pages/JustRegisteredOneDayClass.js'





import { CookiesProvider } from "react-cookie";

import {PSingUP} from '../pages/SingUP.js'


import { NewMainpage } from '../pages/NewMainPage.js'
import { MainMyPage } from '../pages/MainMyPage.js'
import { QnABody } from '../component/mainbodycomponent/QnABody.js'
import { GeneralTeacherLogin } from '../pages/GeneralTeacherLogin.js'
import { WritingReview } from '../pages/WritingReview.js'


import { PhoneMainPage } from '../pages/PhoneMainPage.js'

import { PhoneOnedayClassPage } from '../pages/smartphoneonedaypage.js'
import { PhoneQnABody } from '../pages/PhoneQnaPage.js'
import { PhoneLogin } from '../pages/PhoneLogin.js'

import {PcUserLogin} from '../pages/PcUserLogin.js'
import {MemberJoin} from '../pages/MemberJoin.js'


import { PhoneMyPage } from "../pages/PhoneMyPage.js";


import {JustOnePickProductPage} from '../pages/JustOnePickProductPage.js'



//선생님 전용
import {TeacherMainPage} from '../pages/TeacherMainPage.js'

import {CreateClassPage} from '../pages/CreateClassPage.js'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 이는 오직 한번만 리페칭 된다. 2초마다가 아니라 2초뒤에 한번 리페칭
      // 물론 탭으로는 계속 별도로가능
      gcTime: 1000,
      staleTime: 0,

     
      //  refetchInterval:5000
    }
  },
});



// const queryClient = new QueryClient(


// )   //2번

//index.js 에서 호출될 컴포넌트임
function StartRouter2() {
  let [query, setqeury] = useState(queryClient)
  return (
    <CookiesProvider >
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>

          
            <BrowserRouter>

              <Routes>

                <Route path='/main' element={<Mainpage />} />
               
               {/* 선생버전 이고 PC만 있음 */}
                <Route path='/openclass' element={<OpenClassPage />} />
                <Route path='/generallogin' element={<GeneralTeacherLogin></GeneralTeacherLogin>}></Route>
                <Route path='/createclass' element={<CreateClassPage></CreateClassPage>}></Route>
                <Route path='/TeacherMainPage' element={<TeacherMainPage></TeacherMainPage>}></Route>
               
               


               {/* 사용자 pc버전 */}
                <Route path="/pmain" element={<NewMainpage></NewMainpage>}></Route>
                <Route path='/mypage' element={<MainMyPage></MainMyPage>}></Route>
                <Route path='/login' element={<PcUserLogin></PcUserLogin>}></Route>                 
                <Route path='/psingup'   element={<PSingUP></PSingUP>} ></Route>           
                <Route path="/memberjoin" element={<MemberJoin></MemberJoin>}></Route>
                <Route path="/product/:id" element={<JustOnePickProductPage></JustOnePickProductPage>}></Route>
             
                {/* 주의: 현재 id는 0 1 2 만 있음  또한 해당 컴포넌트의 useParam훅을 보아라 반드시 
                또 주의: id=3는 사진이 5개 이고, 한개는 외부호스팅 영상 사용할꺼라
                그쪽 사이트 영상 사라지면   <Route path='/onedayclass/3' 는 map 에러 뿜을수있음
            */}
                <Route path="/justregisteredonedayclass/:id" element={<JustRegisteredOneDayClass></JustRegisteredOneDayClass>} ></Route>
                <Route path='/onedayclass/:id' element={<OneDayClasspage></OneDayClasspage>} />
                <Route path="/writingreview/:id" element={<WritingReview></WritingReview>} />
                <Route path='/LoginLoadingComponent' element={<LoginLoadingComponent></LoginLoadingComponent>} />
                <Route path='/qna/:onedayclass_num/:id' element={<QnABody></QnABody>}></Route>





                {/* 스마트폰 전용 */}
                <Route path="/smain" element={<PhoneMainPage></PhoneMainPage>}></Route>
                <Route path='/phoneonedayclass/:classid' element={<PhoneOnedayClassPage></PhoneOnedayClassPage>}></Route>
                <Route path='/phoneqna/:onedayclass_num/:id' element={<PhoneQnABody></PhoneQnABody>}></Route>
                <Route path='/phonelogin' element={<PhoneLogin></PhoneLogin>}></Route>
                <Route path='/phonemypage' element={<PhoneMyPage></PhoneMyPage>}></Route>
               
               

                <Route path="*" element={<Error404page></Error404page>}></Route>


            

              </Routes>

            </BrowserRouter>
          
            

        </Provider>
      </QueryClientProvider>

    </CookiesProvider>

  )


}

export default StartRouter2;
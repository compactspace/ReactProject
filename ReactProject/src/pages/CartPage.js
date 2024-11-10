import { Header } from "../header/header";

import { useState, useEffect } from "react";

import { useMediaQuery } from "react-responsive";

import styled from "styled-components";


const CartPageAllWrapper = styled.div`

top:0px;
left:0px;
position: fixed;
width: 100%;
height: 100vh;
display: flex;
background-color: rgba(210, 212, 217, .9);
z-index: 100;
& .leftarea{

    width: 75%;
}


& .rigtharea{

width: 25%;
background-color: #f3f3f3;

display: flex;

flex-direction: column;

 & .headerarea{
    display: flex;

 }


}


`




export const CartPage = () => {



    return (
        <>

          

        </>

    );
}
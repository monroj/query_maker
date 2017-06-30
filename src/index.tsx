import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import QueryMaker from "./querymaker"
import registerServiceWorker from './registerServiceWorker';
import styled from 'styled-components';
document.getElementById("mainbod").style.backgroundColor = "#FAFAFA";

const MainWrapper = styled.div`
   width: 1184px;
   margin: 0 auto;
   padding: 0;
   border: none;
  
`;

const Head = styled.h1`{
  color: #333333;	
  font-family: "Work Sans";	
  font-size: 32px;	
  letter-spacing: -1px;	
  line-height: 34px;
  font-weight: normal;
}`

const Instructions = styled.text`{	
  color: #333333;	
  font-family: "Work Sans";	
  font-size: 12px;	
  font-weight: 500;
  	line-height: 14px;
}`

const SepRect = styled.div`{
	height: 2px;
	width: 1183px;
	background-color: #EFEFEF;
}`

ReactDOM.render(
  <MainWrapper>
    <Head>Build a Query</Head>
    <Instructions>Select a smart filter category</Instructions>
    <SepRect />
    <QueryMaker />

  </MainWrapper>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

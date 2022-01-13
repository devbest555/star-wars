import React from "react";
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications';
import styled, { ThemeContext } from 'styled-components'
import cn from "./cn.module.scss";
import logo from '../../logo.svg';
import { ButtonSecondary } from "../Button";

const app_name_version:string = process.env.REACT_APP_NAME + '-' + process.env.REACT_APP_VERSION;

const IconWrapper = styled.div<{ size?: number }>`
  display: inline-flex;
  word-spacing: -4px;
  margin-right: 8px; 
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`
const Header: React.FC<any> = () => {

  const history = useHistory();

  const goHome = () => {
    history.push('/');
  }

  return (
    <div>
      <div className={cn.headerElement}>
        <div className={cn.logoElement}>
          <IconWrapper size={100} onClick={()=> goHome()} style={{cursor:'pointer'}}>
            <img src={logo} alt="logo" /> 
          </IconWrapper>
        </div>
        <div className={cn.divElement}>  
          <div className={cn.rightElement}>
          {/* <ButtonSecondary
                onClick={() => window.open("http://"+window.location.host, "_self")}
                padding={'9px 10px'}
                BGColor={'#2a4365'}
                margin={'5px !important'}
                width={'100%'} >
                home
            </ButtonSecondary> */}
          </div>          
        </div>
      </div>
    </div>
  )}

export default Header;

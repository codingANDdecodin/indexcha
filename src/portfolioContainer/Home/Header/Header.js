
import React, { useState } from 'react'
import { from } from 'rxjs';
import "./Header.css";
import ScrollService from '../../../utilities/ScrollService';
import {TOTAL_SCREENS,GET_SCREEN_INDEX} from "../../../utilities/CommonUtils";
import { faBars } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Header() {
    const [selectedScreen,setSelectedScreen]=useState(0);
    const [showHeaderOption,setShowHeaderOption]=useState(false);

    const updateCurrentScreen=(currentScreen)=>{
        if(!currentScreen || !currentScreen.screenInView)
        return;
        let screenIndex=GET_SCREEN_INDEX(currentScreen.screenInView);
        if(screenIndex<0)
        return; 
    };

        let currentScreenSubscription=ScrollService.currentScreenBroadCasater.subscribe(updateCurrentScreen);


        const getHeaderOptions=()=>{
            return(
                TOTAL_SCREENS.map((screen,i)=>{
              
                  return ( <div key={screen.screen_name} className={getHeaderOptionsClasses(i)} 
                    onClick={()=>{
                      return  switchScreen(i,screen);
                        
                    }}>
                        <span>
                            {screen.screen_name}
                        </span>
                    </div>
                  )
                })
            );
        };
        const getHeaderOptionsClasses=(index)=>{
              let classes="header-option";
              if(index < TOTAL_SCREENS.length -1)
              classes += " header-option-seperator";

            if(selectedScreen===index)
            classes += " selected-header-option";
            return  classes;
        };
    
    const switchScreen=(index,screen)=>{
        let screenComponent=document.getElementById(screen.screen_name);
        if(!screenComponent) return;

        screenComponent.scrollIntoView({behavior:'smooth'})
        setSelectedScreen(index);
        setShowHeaderOption(false)
    }
  return (
    <div>
        <div className='header-container' onClick={()=>setShowHeaderOption(!showHeaderOption)}>
            <div className='header-parent'>
                <div className='header-hamburger' onClick={()=>setShowHeaderOption(!showHeaderOption)}>
                    <FontAwesomeIcon className='header-hamburger-bars' icon={faBars}></FontAwesomeIcon>
                </div>
                <div className='header-logo'>SHIVTECH~</div>
                <div className={(showHeaderOption)? "header-options show-hamburger-options":"header-options"}>
                    {getHeaderOptions()}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header;
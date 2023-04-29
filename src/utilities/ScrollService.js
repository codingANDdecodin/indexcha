
import { TOTAL_SCREENS } from "./CommonUtils";
import { Subject } from "rxjs";


export default class ScrollService{
    static scrollHandler=new ScrollService();
    static currentScreenBroadCasater=new Subject()
    static currentScreenFadeIn=new Subject();

    constructor(){
        window.addEventListener('scroll',this.cheakCurrentScreenUnderViewport)
    }
    scrollToHireMe=()=>{
        let contactMeScreen=document.getElementById("ContactMe");
        if(!contactMeScreen) return;
        contactMeScreen.scrollIntoView({behavior:"smooth"})
    }
    scrollToHome=()=>{
        let homeScreen=document.getElementById("Home");
        if(!homeScreen) return;
        homeScreen.scrollIntoView({behavior:"smooth"})
    }
    isElementInView=(elem,type)=>{
        let rec=elem.getBoundingClientRect();
        let elementTop=rec.top;
        let elementBottom=rec.Bottom;

        let partiallyVisible=elementTop <window.innerHeight && elementBottom >=0;
        let completelyVisible=elementTop<window.innerHeight && elementBottom<=window.innerHeight;

        switch(type){
            case "partial":
                return partiallyVisible;
            
            case "complete":
                return completelyVisible;
                default:
                    return false    
        }
    }
    cheakCurrentScreenUnderViewport=(event)=>{
        if(!event || Object.keys(event).length<1)
        return;
        for(let screen of TOTAL_SCREENS){
            let screenFreeDom=document.getElementById(screen.screen_name);
            if(!screenFreeDom)
            continue;


            let fullyVisible=this.isElementInView(screenFreeDom,"complete");
            let partiallyVisible=this.isElementInView(screenFreeDom,"partial");


            if(fullyVisible || partiallyVisible){
                if(partiallyVisible && !screen.alreadyRendered){
                    ScrollService.currentScreenFadeIn.next({
                        fadeInScreen: screen.screen_name
                    });
                    screen['alreadyRendered']=true;
                    break;
                }
                if(fullyVisible){
                    ScrollService.currentScreenBroadCasater.next({
                        screenInView: screen.screen_name
                    });
                    break;
                }
            }
        }

    }
}
export const reset = ()=>{
    /* document.querySelector(".search-box").removeAttribute('id')
    document.querySelector('.notify-box').removeAttribute('id')
    document.querySelector('.message-box').removeAttribute('id')
    document.querySelector(".sub-nav").style = "";
    document.querySelector('body').style = "" 
    document.querySelectorAll(".sub-nav .top-background").forEach(e=>{
        e.style = ""
    })*/
    document.querySelector('.chat-box .header-menu').style.height = "4.3em"
    
    document.querySelectorAll('.header-menu i').forEach((e)=>{
        e.style = "" 
    })
    return document.querySelectorAll('.link-list > li').forEach((e)=>{
        e.style = "" 
    })
}
import {main as SMALL} from '../Main/main_smallDevice.js'
import {main as NORMAL} from '../Main/main_normalDevice.js'
//import {main as LARGE} from '../Main/main_smallDevice.js'

export const resize = (deviceType) =>{
    const device = {
        1 : SMALL,
        2 : NORMAL,
        //3: LARGE
    }
    deviceType = device[deviceType]
    document.querySelector('.top-nav .first-app').removeEventListener('click', deviceType.TopNav)
    document.querySelector('.end-nav .last-app').removeEventListener('click', deviceType.EndNav)
    /* document.querySelector('.middle-nav .first-app').removeEventListener('click',deviceType.MiddleNav) */
    document.querySelector(".search").removeEventListener("click", deviceType.SearchNav)
    document.querySelector(".notifications").removeEventListener("click", deviceType.NotifyNav)
    document.querySelector(".message").removeEventListener("click", deviceType.MessageNav)
}
export const resizeFullScreenNav = () => {
    let padding = 5 // 15 * 2 px
    let edit_tool_message = document.querySelector('.edit-tool-notify').clientHeight
    let default_Height = window.innerHeight - (15 * 3) - padding 
    document.querySelector('.notify-box .container-data').style.height = `${default_Height}px`
}
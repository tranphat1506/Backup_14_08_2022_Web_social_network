import { Logger } from "./debugLogger.js"
const navElement = {
    topNav : document.querySelector('.top-nav'),
    middleNav : document.querySelector('.middle-nav'),
    endNav : document.querySelector('.end-nav'),
    searchNav : document.querySelector(".search"),
    notifyNav : document.querySelector(".notifications"),
    messageNav : document.querySelector(".message"),
    chatMenu : document.querySelector(".chat-header .menu-down")
}
export const Services = {
    openNav : (nav, condition = false, clickElementClass) => {
        nav = navElement[nav] || Logger.error('Nav Element not in list !');
        let insideNav = nav.children //Array        // Open
        if (!condition) return [...insideNav].forEach((e)=>{
            if (!e.className.includes(`${clickElementClass}`)) return e.style.display = `inline-flex`;
            Logger.warn(`open [${nav.className}] in file smallDevice.js`)
        })
        // Close
        return [...insideNav].forEach((e)=>{
            if (!e.className.includes(`${clickElementClass}`)) return e.style.display = "none"
            Logger.warn(`close [${nav.className}] in file smallDevice.js`)
        })
    },
}
const doc = document.querySelector.bind(document);
const docs = document.querySelectorAll.bind(document)
import { reset, resize, resizeFullScreenNav } from './components/Header/Common/resetHTML.js'
import {smallDevice} from './components/Header/Main/main_smallDevice.js'
import {normalDevice} from './components/Header/Main/main_normalDevice.js'
import {largeDevice} from './components/Header/Main/main_largeDevice.js'
import { ajaxFunc } from './components/Header/Ajax/ajaxServices.js';


// Resizing list chat

const app = () => {
    ajaxFunc.get_history()
    ajaxFunc.get_list_message()
    ajaxFunc.get_notify()
    
    let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    if (clientWidth <= 340){    
        resizeFullScreenNav()
        smallDevice()
    }else if (clientWidth > 340 && clientWidth <= 700){
        resizeFullScreenNav()
        normalDevice()
    }else{
        largeDevice()
    }
}
app() // start

doc('html').addEventListener("click", function(event) {
    let $t = $(event.target)
    let $linkList = $('.link-list')
    if($t.is($linkList) || $linkList.has($t).length){
        // nothing to do
    } else{
        reset()
    }
})
window.addEventListener("resize", function(event) {
    let clientWidth = document.querySelector("#header").clientWidth
    reset()
    if (clientWidth > 700){
        this.setTimeout(()=>{
            resize(2)
            largeDevice()
        }, 500)
    }
    else if ( clientWidth > 340 && clientWidth <= 700) {
        this.setTimeout(()=>{
            resize(1) // remove all event listen in small device
            resizeFullScreenNav()
            normalDevice()
        }, 500)
    }else{
        this.setTimeout(()=>{
            resizeFullScreenNav()
            smallDevice()
        }, 500)

    }
})
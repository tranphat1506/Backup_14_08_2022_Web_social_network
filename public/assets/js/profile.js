const doc = document.querySelector.bind(document)
const docs = document.querySelectorAll.bind(document)

const nav = () =>{
    let isMenuOpen = false;
    doc('.menu').addEventListener('click',(e)=>{
        e.preventDefault()
            //show all link
        if (!isMenuOpen){
            isMenuOpen = true
            docs(".link").forEach((element)=>{
                element.style.display = 'inline-flex'
            })
        }else{
            isMenuOpen = false;
            docs(".link").forEach((element)=>{
                element.style.display = 'none'
            });
        }
    })
}
nav()
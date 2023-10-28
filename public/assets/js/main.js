const doc = document.querySelector.bind(document);
const docs = document.querySelectorAll.bind(document)
const chatform = doc("#form-chat")
const chatting_button = doc('#chat-button button')
const avatar = doc(".stranger-avatar")
const strangerStatus = doc(".checking-stranger")
const chatting_box = doc("#user-input")
const leavebtn = doc("#leave-btn")
var myDiv = document.getElementById("data");
//COOKIES EVENTS
//ELEMENT EVENTS
const socket = io("/chat")
const ready = $(document)
  .ready(function () {
    console.warn("Version: 1.0.0")
  })
const socketEvents = {
  'getTotalUsers': socket.on("totalUsers", totalUser => {
    console.log(totalUser)
    document.getElementById("total-user")
      .textContent = `Online: ${totalUser}`;
  })
  , 'getMessages': socket.on("message", data => {
    const textdata = doc('.data')
    textdata.innerHTML = `${textdata.innerHTML}
                                <div class="stranger-text-data">
                                    <div class="stranger-avatar">
                                        <span id="avatar" class="material-symbols-outlined">
                                            account_circle
                                        </span>
                                    </div>
                                </div>`
    const chatItem = document.createElement("p")
    chatItem.textContent = data
    textdata.querySelectorAll(".stranger-text-data:last-child")[0].appendChild(chatItem)
    myDiv = document.getElementById("data");
    myDiv.scrollTop = myDiv.scrollHeight;
    data = ""
    if (document.querySelectorAll(".data .user-text-data span")
      .length) {
      document.querySelectorAll(".data .user-text-data span")[document.querySelectorAll(".data .user-text-data span")
        .length - 1].id = "disable"
    }
  })
  , 'getstrangersuccess': socket.on("start-chat", data => {
    if (!data) return location.reload();
	const gender = !data.age ? "Ẩn" : (data.age == 1 ? "Nam" : (data.age == 2 ? "Nữ" : "Khác"))
    const age = !data.age ? "Ẩn" : data.age
    const info = document.createElement("p")
    info.id = "info"
    info.innerHTML =
    `
        Tên: ${data.name} ||
        Tuổi: ${age} ||
        Giới tính: ${gender} || 
        ID: ${data.id}
    `
    doc("#note")
      .style.display = ""
    doc(".data")
      .append(info)
    doc("#form-chat")
      .style.display = "inline-flex"
  })
  , "chat end": socket.on("chat end", () => {
    document.getElementById("form-chat")
      .style.display = "none"
    doc("#note")
      .style.display = "block"
    doc(".btn-stranger")
      .style.display = "inline-flex"
    doc(".data #info")
      .remove()
    $(".text-content")
      .empty()
    document.querySelector(".content")
      .innerHTML =
      `<div class="text-content">
                    <span id="note" style="display : block;">Người lạ đã thoát !!...</span>
                    <div id = 'data' class="data">
                    </div>
                </div>`
  })
}

const Events = {
	//BTN CLICK
	'StrangerButton': document.querySelector(".btn-stranger").addEventListener('click', (e) =>{
		$(".data") ? $(".data").empty() : false
        doc(".btn-stranger").style.display = ""
		doc("#note").textContent = "Hệ thống đang tìm cho bạn người lạ ..."
		doc("#note").style.display="block"
		e.preventDefault()
        fetch("./get",{
            method : 'GET',
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            socket.emit("get-stranger", response.cookie)
		    document.querySelector(".btn-stranger").id = "disable"
        })
        .catch(error => location.reload())
	}),
	//SUBMIT FORM
	'ChatSubmit': chatform.addEventListener('submit', (e) => {
		e.preventDefault();
		const textdata = doc('.data')
		let data = chatting_box.value
		let checkingText = (chatting_box.value)
			.trim() != "";
		if (checkingText) {
			socket.emit("message", data)
			textdata.innerHTML = `${textdata.innerHTML}
							<div class="user-text-data">
								<div class="checking-stranger">
									<span id="unseen" class="material-symbols-outlined">
										check_circle
									</span>
								</div>
							</div>`
			const chatItem = document.createElement("p")
			chatItem.textContent = data
			textdata.querySelectorAll(".user-text-data:last-child")[0].appendChild(chatItem)
			myDiv.scrollTop = myDiv.scrollHeight;
			data = ""
			const oldmessage = document.querySelectorAll(".data .user-text-data span")
			if (oldmessage.length - 1) {
				oldmessage[oldmessage.length - 2].id = "disable"
			}
		}
		chatting_box.value = "";
	}),
	'leave chat' : {
		'click': leavebtn.addEventListener('click', (e =>{
			leavechat()
		})),
		'esc' : document.addEventListener("keydown", (e =>{
			if (chatform.style.display !== "none" && e.key==="Escape"){
					leavechat()
			}}))
	}
}
const scrollSmoothlyToBottom = (id="data") => {
    const element = $(`#${id}`);
    element.animate({
        scrollTop: element.prop("scrollHeight")
    }, 500);
}
function leavechat(e){
	socket.emit('leave room')
	document.getElementById("form-chat").style.display = "none"
	doc("#note").style.display = "block"
	doc(".btn-stranger").style.display = "inline-flex"
	doc(".data #info") ?  doc(".data #info").remove() : false
	$(".text-content")? $(".text-content").empty() : false
	document.querySelector(".content").innerHTML = 
			`<div class="text-content">
				<span id="note" style="display : block;">Bạn đã thoát !!...</span>
				<div id = 'data' class="data">
				</div>
			</div>`
}



const doc = document.querySelector.bind(document);
const docs = document.querySelectorAll.bind(document)
$(function () {
		$("#register-link").click(function () {
			$("#login-box").hide();
			$("#register-box").show();
		});
		$("#login-link").click(function () {
			$("#login-box").show();
			$("#register-box").hide();
		});
		$("#forgot-link").click(function () {
			$("#login-box").hide();
			$("#forgot-box").show();
		});
		$("#back-link").click(function () {
			$("#login-box").show();
			$("#forgot-box").hide();
		});
	});

//LOGIN VALIDATION
//[!@#$%^&*()~¥=_+}{":;'?\/>.<,`\-\|\[\]]
//([A-Z])
//[a-z])
//(\d)

//DECLEAR VARIABLES

// - Regex
const regx_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const regx_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
// -

// LOGIN
const LOG_ELE_FORM = doc('#login-form')
const LOG_ELE_INPUT_EMAIL = LOG_ELE_FORM.querySelector('#email')
const LOG_ELE_INPUT_PASSWORD = LOG_ELE_FORM.querySelector('#password')
var LOG_VERIFY_EMAIL = false
var LOG_VERIFY_PASSWORD = false
var LOG_ERROR_MESSANGE = ""

// REGISTER
const REG_ELE_FORM = doc('#register-form')
const REG_ELE_BTN_SIGNUP = document.querySelector('#register-link')
const REG_ELE_INPUT_DISPLAYNAME = REG_ELE_FORM.querySelector('#name')
const REG_ELE_INPUT_EMAIL = REG_ELE_FORM.querySelector('#remail')
const REG_ELE_INPUT_PASSWORD = REG_ELE_FORM.querySelector('#rpassword')
const REG_ELE_INPUT_CPASSWORD = REG_ELE_FORM.querySelector('#cpassword')

var REG_VERIFY_DISPLAYNAME = false
var REG_VERIFY_EMAIL = false
var REG_VERIFY_PASSWORD = false
var REG_VERIFY_CPASSWORD = false
var REG_ERROR_MESSANGE = ""

// FORGOT
const FOR_ELE_FORM = doc('#forgot-form')
const FOR_ELE_INPUT_EMAIL = FOR_ELE_FORM.querySelector("#femail")
const FOR_ELE_BTN_FORGOT = document.querySelector('#forgot-link')
var FOR_VERIFY_EMAIL = false
var FOR_ERROR_MESSANGE = ""



//check value
function checkRegisterPassword(element = Element){
	const str = String(element.value);
	let validate = [0,0,0,0,0]
	if (str.length >= 6 && str.length <= 50)
		validate[0] = 1
	if ((/(?=.*[!@#$%^&*()~¥=_+}{":;'?\/>.<,`\-\|\[\]])/).test(str))
		validate[1] = 1
	if ((/^(?=.*[A-Z])/.test(str)))
		validate[2] = 1
	if ( (/^(?=.*[a-z])/).test(str) )
		validate[3] = 1
	if (/(?=.*\d)/.test(str))
		validate[4] = 1
	return validate
}
function checkValue(element = Element, type = "", value = ""){
	if (type === 'email')
		return regx_email.test(String(element.value).toLowerCase());
	else if (type === 'password')
		return regx_password.test(String(element.value));
	else
		return `${element.value}` == value;
}

const FORM_EVENT = {
	'Input event': {
		Login_Email : LOG_ELE_INPUT_EMAIL.addEventListener('input',(e)=>{
			e.preventDefault()
			const elementArray = [doc('#login-box #email')]
			if (checkValue(element = LOG_ELE_INPUT_EMAIL, type = 'email')){
				LOG_VERIFY_EMAIL = true
				//doc('#login-box #error-mess').style.display = "none"
				elementArray.forEach(e => {
					e.classList.remove("invalid")
					e.classList.add("valid")
				});				
			}else{
				//doc('#login-box #error-mess').style.display = "block"
				elementArray.forEach(e => {
					e.classList.remove("valid")
					e.classList.add("invalid")
				});
				//doc('#login-box #error-mess').innerText = "E-mail không đúng hoặc không hợp lệ!"
			}
		}),
		Login_Password : LOG_ELE_INPUT_PASSWORD.addEventListener('input',(e)=>{
			e.preventDefault()
			//const elementArray = [doc('#login-box #password')]
			if (checkValue(element = LOG_ELE_INPUT_PASSWORD, type = 'password')){
				LOG_VERIFY_PASSWORD = true
				/* elementArray.forEach(e => {
					e.classList.remove("invalid")
					e.classList.add("valid")
				}); */
				
			}else{
				/* elementArray.forEach(e => {
					e.classList.remove("valid")
					e.classList.add("invalid")
				}); */
			}
		}),
		RESET_VALUE : {
			Forgot_Btn : FOR_ELE_BTN_FORGOT.addEventListener('click', (e)=>{
				e.preventDefault()
	
				//reset css
				const elementArray = [doc('#login-box #password'), doc('#login-box #email'), doc('#forgot-form #femail'), doc('#register-form #name'), doc('#register-form #remail'), doc('#register-form #rpassword'), doc('#register-form #cpassword')]
				docs('html #error-mess').forEach(e=>{
					e.style.display = "none"
					e.innerText = ""
				})
				doc('#forgot-box #forgot-btn').setAttribute('disabled','')
				elementArray.forEach(e => {
					e.classList.remove("invalid")
					e.classList.remove("valid")
				});
	
				// reset 2 False
				const reset2False = [LOG_VERIFY_EMAIL,LOG_VERIFY_PASSWORD, FOR_VERIFY_EMAIL, REG_VERIFY_DISPLAYNAME, REG_VERIFY_EMAIL, REG_VERIFY_PASSWORD, REG_VERIFY_CPASSWORD]
				reset2False.forEach(e => {
					e = false
				});
	
				// reset value 2 ""
				LOG_ERROR_MESSANGE = ""
				LOG_ELE_INPUT_EMAIL.value = ""
				LOG_ELE_INPUT_PASSWORD.value = ""

				REG_ERROR_MESSANGE = ""
				REG_ELE_INPUT_DISPLAYNAME.value = "" 
				REG_ELE_INPUT_EMAIL.value = "" 
				REG_ELE_INPUT_PASSWORD.value = ""
				REG_ELE_INPUT_CPASSWORD.value = ""

				FOR_ERROR_MESSANGE = ""
				FOR_ELE_INPUT_EMAIL.value = ""
			}),
			SignUp_Btn : REG_ELE_BTN_SIGNUP.addEventListener('click', (e)=>{
				e.preventDefault()
	
				//reset css
				const elementArray = [doc('#login-box #password'), doc('#login-box #email'), doc('#forgot-form #femail'), doc('#register-form #name'), doc('#register-form #remail'), doc('#register-form #rpassword'), doc('#register-form #cpassword')]
				doc('#forgot-box #forgot-btn').setAttribute('disabled','')
				docs('html #error-mess').forEach(e=>{
					e.style.display = "none"
					e.innerText = ""
				})
				elementArray.forEach(e => {
					e.classList.remove("invalid")
					e.classList.remove("valid")
				});
	
				// reset 2 False
				const reset2False = [LOG_VERIFY_EMAIL,LOG_VERIFY_PASSWORD, FOR_VERIFY_EMAIL, REG_VERIFY_DISPLAYNAME, REG_VERIFY_EMAIL, REG_VERIFY_PASSWORD, REG_VERIFY_CPASSWORD]
				reset2False.forEach(e => {
					e = false
				});
	
				// reset value 2 ""
				LOG_ERROR_MESSANGE = ""
				LOG_ELE_INPUT_EMAIL.value = ""
				LOG_ELE_INPUT_PASSWORD.value = ""

				REG_ERROR_MESSANGE = ""
				REG_ELE_INPUT_DISPLAYNAME.value = "" 
				REG_ELE_INPUT_EMAIL.value = "" 
				REG_ELE_INPUT_PASSWORD.value = ""
				REG_ELE_INPUT_CPASSWORD.value = ""
				
				FOR_ERROR_MESSANGE = ""
				FOR_ELE_INPUT_EMAIL.value = ""
			}),
		},
		Reg_displayName : REG_ELE_INPUT_DISPLAYNAME.addEventListener('input',(e)=>{
			e.preventDefault()
			REG_ERROR_MESSANGE = "HÃY THỬ LẠI TÊN KHÁC HỢP LỆ!"
			const elementArray = [doc('#register-box #name')]
			if (REG_ELE_INPUT_DISPLAYNAME.value !== "" && (/^(?![- '])(?![×Þß÷þø])[- '0-9A-Za-zÀ-ÛaAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+(?<![- ']).{4,24}$/).test(REG_ELE_INPUT_DISPLAYNAME.value)){
				REG_VERIFY_DISPLAYNAME = true
				elementArray.forEach(e => {
					e.classList.remove("invalid")
					e.classList.add("valid")
				});
				docs("#register-box #error-mess")[0].style.display = "none"
				docs("#register-box #error-mess")[0].value = "" 
			}else{
				elementArray.forEach(e => {
					e.classList.remove("valid")
					e.classList.add("invalid")
				});
				docs("#register-form #error-mess")[0].style.display = "block"
				docs("#register-form #error-mess")[0].innerText = REG_ERROR_MESSANGE
			}
		}),
		Reg_Email : REG_ELE_INPUT_EMAIL.addEventListener('input',(e)=>{
			e.preventDefault()
			REG_ERROR_MESSANGE = "EMAIL ĐÃ ĐƯỢC SỬ DỤNG HOẶC KHÔNG KHẢ DỤNG"
			const elementArray = [doc('#register-form #remail')]
			if (checkValue(element = REG_ELE_INPUT_EMAIL, type = 'email')){
				REG_VERIFY_EMAIL = true
				elementArray.forEach(e => {
					e.classList.remove("invalid")
					e.classList.add("valid")
				});
				docs("#register-box #error-mess")[1].style.display = "none"
				docs("#register-box #error-mess")[1].value = ""
			}else{
				elementArray.forEach(e => {
					e.classList.remove("valid")
					e.classList.add("invalid")
				});
				docs("#register-form #error-mess")[1].style.display = "block"
				docs("#register-form #error-mess")[1].innerText = REG_ERROR_MESSANGE
			}
		}),
		Reg_Password : REG_ELE_INPUT_PASSWORD.addEventListener('input',(e)=>{
			e.preventDefault()
			const elementArray = [doc('#register-box #rpassword')]
			if (checkValue(element = REG_ELE_INPUT_PASSWORD, type = 'password')){
				REG_VERIFY_PASSWORD = true
				elementArray.forEach(e => {
					e.classList.remove("invalid")
					e.classList.add("valid")
				}); 
			}else{
				elementArray.forEach(e => {
					e.classList.remove("valid")
					e.classList.add("invalid")
				});
			}
			const verifyStatus = checkRegisterPassword(REG_ELE_INPUT_PASSWORD)
			const length = verifyStatus[0] == 1 ? "✔️" : "❌"
			const symbol = verifyStatus[1] == 1 ? "✔️" : "❌"
			const capital = verifyStatus[2] == 1 ? "✔️" : "❌"
			const letter = verifyStatus[3] == 1 ? "✔️" : "❌"
			const num = verifyStatus[4] == 1 ? "✔️" : "❌"
			REG_ERROR_MESSANGE = 
				`
				Mật khẩu có trên 6 ký tự và dưới 51 ký tự : ${length}
				Ít nhất một ký tự đặc biệt :  ${symbol}
				Ít nhất 1 chữ hoa:  ${capital}
				Ít nhất 1 chữ thường:  ${letter}
				Ít nhất một số :  ${num}
				`
			docs("#register-form #error-mess")[2].style.display = "block"
			docs("#register-form #error-mess")[2].innerText = REG_ERROR_MESSANGE
		}),
		Reg_CPassword : REG_ELE_INPUT_CPASSWORD.addEventListener('input',(e)=>{
			e.preventDefault()
			const elementArray = [doc('#register-box #cpassword')]
			REG_ERROR_MESSANGE = "MẬT KHẨU PHẢI TRÙNG VỚI TRÊN!"
			if ( (REG_ELE_INPUT_CPASSWORD.value === REG_ELE_INPUT_PASSWORD.value) && checkValue(element = REG_ELE_INPUT_CPASSWORD, type = 'password')){
				REG_VERIFY_CPASSWORD = true
				elementArray.forEach(e => {
					e.classList.remove("invalid")
					e.classList.add("valid")
				}); 
				docs("#register-box #error-mess")[3].style.display = "none"
				docs("#register-box #error-mess")[3].value = ""
			}else{
				docs("#register-form #error-mess")[3].style.display = "block"
				docs("#register-form #error-mess")[3].innerText = REG_ERROR_MESSANGE
				elementArray.forEach(e => {
					e.classList.remove("valid")
					e.classList.add("invalid")
				});
			}
		}),
		Forgot_Email : FOR_ELE_INPUT_EMAIL.addEventListener('input',(e)=>{
			e.preventDefault()
			const elementArray = [doc('#forgot-form #femail')]
			if (checkValue(element = FOR_ELE_INPUT_EMAIL, type = 'email')){
				FOR_VERIFY_EMAIL = true
				elementArray.forEach(e => {
					e.classList.remove("invalid")
					e.classList.add("valid")
				});
				doc('#forgot-box #forgot-btn').removeAttribute('disabled')
			}else{
				elementArray.forEach(e => {
					e.classList.remove("valid")
					e.classList.add("invalid")
				});
				doc('#forgot-box #forgot-btn').setAttribute('disabled','')
			}
		})
	},
	//submit
	'Login Form': LOG_ELE_FORM.addEventListener('submit', (e) => {
		e.preventDefault()
		docs('html #error-mess').forEach(e=>{
			e.style.display = "none"
			e.innerText = ""
		})
		const elementArray = [doc('#login-box #password'), doc('#login-box #email')]
		LOG_ERROR_MESSANGE = "E-mail hoặc mật khẩu không đúng !"
		if (LOG_VERIFY_EMAIL && LOG_VERIFY_PASSWORD){
			doc('#login-box #error-mess').style.display = "none"
			elementArray.forEach(e => {
				e.classList.remove("invalid")
				e.classList.add("valid")
			});
			$.ajax({
				type: "POST",
				url: `${window.location.href}/login`,
				data: JSON.stringify({ "email": (LOG_ELE_INPUT_EMAIL.value), "password" : (LOG_ELE_INPUT_PASSWORD.value) }),
				contentType: "application/json",
				success: function (result) {
					location.reload()
				},
				error: function (result, status) {
					console.log(result);
					doc('#login-box #error-mess').innerText = result.responseText
					doc('#login-box #error-mess').style.display = "block"
					elementArray.forEach(e => {
						e.classList.remove("valid")
						e.classList.add("invalid")
					});
				}
			  });
		}else{
			doc('#login-box #error-mess').style.display = "block"
			doc('#login-box #error-mess').innerText = LOG_ERROR_MESSANGE
			elementArray.forEach(e => {
				e.classList.remove("valid")
				e.classList.add("invalid")
			});
		}
		LOG_VERIFY_PASSWORD = false
		LOG_ERROR_MESSANGE = ""
		LOG_ELE_FORM.querySelector('#password').value = ""//clear value in input
	}),
	'Forgot Form': FOR_ELE_FORM.addEventListener('submit', (e) => {
		e.preventDefault()
		docs('html #error-mess').forEach(e=>{
			e.style.display = "none"
			e.innerText = ""
		})
		FOR_ERROR_MESSANGE = "E-mail không đúng hoặc không tồn tại!"

		if (FOR_VERIFY_EMAIL){
			console.log("Forgot form posting")
			doc('#forgot-box #error-mess').style.display = "none"
			doc('#forgot-box #error-mess').innerText = ""
		}else{
			doc('#forgot-box #error-mess').innerText = FOR_ERROR_MESSANGE
			doc('#forgot-box #error-mess').style.display = "block"
			FOR_ERROR_MESSANGE = ""
			FOR_VERIFY_EMAIL = false

		}
		FOR_ELE_FORM.querySelector('#femail').value = ""
	}),
	RegisterForm: REG_ELE_FORM.addEventListener('submit', (e) => {
		e.preventDefault()
		const elementArray = [REG_ELE_INPUT_DISPLAYNAME, REG_ELE_INPUT_EMAIL, REG_ELE_INPUT_PASSWORD, REG_ELE_INPUT_CPASSWORD]
		const elementNode = docs('#register-box #error-mess')
		const verifyArray = [REG_VERIFY_DISPLAYNAME, REG_VERIFY_EMAIL, REG_VERIFY_PASSWORD, REG_VERIFY_CPASSWORD]
		const errorMess = ["HÃY THỬ LẠI TÊN KHÁC HỢP LỆ!", "EMAIL ĐÃ ĐƯỢC SỬ DỤNG HOẶC KHÔNG KHẢ DỤNG", "MẬT KHẨU KHÔNG HỢP LỆ!", "MẬT KHẨU PHẢI TRÙNG VỚI TRÊN!"]
		const isValid = REG_VERIFY_DISPLAYNAME && REG_VERIFY_EMAIL && REG_VERIFY_PASSWORD && REG_VERIFY_CPASSWORD
		docs('html #error-mess').forEach(e=>{
			e.style.display = "none"
			e.innerText = ""
		})
		if (isValid){
			$.ajax({
				type: "POST",
				url: `${window.location.href}/register`,
				data: JSON.stringify({ "displayName": (REG_ELE_INPUT_DISPLAYNAME.value), "email": (REG_ELE_INPUT_EMAIL.value),"password" : (REG_ELE_INPUT_PASSWORD.value) }),
				contentType: "application/json",
				success: function (result) {
					REG_ERROR_MESSANGE = `Vui lòng truy cập E-mail: ${REG_ELE_INPUT_EMAIL.value} để xác minh !`
					elementNode[0].innerText = REG_ERROR_MESSANGE
					elementNode[0].style.display = "block"
				},
				error: function (result, status) {
					REG_ERROR_MESSANGE = result.responseText;
					elementNode[0].innerText = REG_ERROR_MESSANGE
					elementNode[0].style.display = "block"
				}
			});

		}else{
			for (let index = 0; index < elementArray.length; index++){
				if (!verifyArray[index]){
					REG_ERROR_MESSANGE = errorMess[index]
					if (elementArray[index] == REG_ELE_INPUT_CPASSWORD)
						REG_ELE_INPUT_PASSWORD.classList.remove("valid")
						REG_ELE_INPUT_PASSWORD.classList.add("invalid")
					elementNode[index].innerText = REG_ERROR_MESSANGE
					elementNode[index].style.display = "block"
					elementArray[index].classList.remove("valid");
					elementArray[index].classList.add("invalid")
					verifyArray[index] = false
				}
			}
		}
		REG_VERIFY_PASSWORD = false
		REG_VERIFY_CPASSWORD = false
		REG_ERROR_MESSANGE = ""
		REG_ELE_FORM.querySelector('#rpassword').value = ""
		REG_ELE_FORM.querySelector('#cpassword').value = ""

	})
}


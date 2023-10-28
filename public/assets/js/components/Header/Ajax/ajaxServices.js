var convertTime = (time)=>{
    let cvt2S = (Date.now()/1000 - time/1000);
    let cvt2M = cvt2S / 60;
    let cvt2H = cvt2M / 60;
    let cvt2D = cvt2H / 24;
    let cvt2W = cvt2D / 7
    if (cvt2W >= 1) return `${Math.round(cvt2W)}w`
    else if (cvt2D >=1) return `${Math.round(cvt2D)}d`
    else if (cvt2H >=1) return `${Math.round(cvt2H)}h`
    else if (cvt2M >=1) return `${Math.round(cvt2M)}m`
    else return `${Math.round(cvt2S)}s`
}
export var ajaxFunc = {
    get_history : ()=>{
        $.ajax({
            type: "GET",
            url: `http://localhost:3000/history`,
            contentType: "application/json",
            success: (result) => {
                document.querySelectorAll('.search-history').forEach(e => {
                    e.remove()
                });
                const searchHistory = document.createElement('div')
                searchHistory.className = 'search-history'
                document.querySelector('.search-box .container-data').appendChild(searchHistory)
                for (const post in result) {
                    let isUser = result[post].isUser ? `<span class="user-avatar avatar-history" style="background-image: url(${result[post].href});"></span>` : 
                    `
                    <div class="default-avatar avatar-history">
                        <i class="fa-regular fa-clock-rotate-left"></i>
                    </div>
                    `;
                    $('.search-box .search-history').append(`
                        <div class="history-model">
                            <a href="#" class="container">
                                ${isUser}
                                <div class="history-content">
                                    <span class="history-value">${result[post].text_display}</span>
                                </div>
                            </a>
                            <i class="fa-solid fa-xmark remove-tool-history" ></i>
                        </div>
                    `)
                }

            },
            error: function (result, status) {
                console.log(status);
            }
        })
    },
    /*  */
    get_notify : () =>{
        $.ajax({
            type: "GET",
            url: `http://localhost:3000/notifications`,
            contentType: "application/json",
            success: (result) => {
                document.querySelectorAll('.notify-list').forEach(e => {
                    e.remove()
                });
                const notifyList = document.createElement('div')
                notifyList.className = 'notify-list'
                document.querySelector('.notify-box .container-data').appendChild(notifyList)
                for (const post in result) {
                    let noti = result[post]
                    let info = noti.info
                    const in_what = info.in_what;
                    let f_obj = noti.first_object 
                    let s_obj = noti.second_object
                    var vi_VN = {
                        you : "bạn",
                        comment_display : "đã bình luận",
                        react_display : "đã thả cảm xúc",
                        in_post : "bài viết",
                        in_story : "story",
                        on_mention : "đã gán",
                        of : "của",
                        in : "vào",

                    }
                    var language = vi_VN
                    let text_display = () =>{
                        if (info.type == "comment"){
                            return `<b>${f_obj.isClient ? language.you : f_obj.name_display}</b>
                             ${language.comment_display} ${language.in} ${in_what} ${language.of} <b>${s_obj.isClient ? language.you : s_obj.name_display}</b>`
                        }else if (type.type == "react"){
                            const react = info.react;
                            console.log(react);
                            return `
                            <b>${f_obj.isClient ? language.you : f_obj.name_display}</b>
                             ${language.react_display} ${language.in} ${in_what} ${language.of} <b>${s_obj.isClient ? language.you : s_obj.name_display}</b>
                             `
                        }
                    }
                    $('.notify-list').append(`
                        <div class="notify-model">
                            <a href="#" class="container">
                                <span class="user-avatar avatar-notify" style="background-image: url(${s_obj.avt_href});"></span>
                                <div class="notify-content">
                                    <span class="notify-value">${text_display()}</span>
                                </div>
                            </a>
                        </div>
                    `)
                }

            },
            error: function (result, status) {
                console.log(status);
            }
        })
    },
    get_list_message : ()=>{
        $.ajax({
            type: "GET",
            url: `http://localhost:3000/get_list_messages`,
            contentType: "application/json",
            success: (result) => {
                document.querySelectorAll('.message-list .message-model').forEach(e => {
                    e.remove()
                });
                const notifyList = document.createElement('div')
                notifyList.className = 'message-list'
                document.querySelector('.message-box .container-data').appendChild(notifyList)
                for (let data in result) {
                    data = result[data]
                    const user_name = data.info.user_name;
                    const user_ava_href = data.info.user_avatar_href;
                    const user_id = data.info.user_id;
                    const user_profile_href = data.info.user_profile_href;
                    const last_active_time = data.info.active_status.status ? convertTime(data.info.active_status.last_active_time) : false;
                    const active_status = data.info.active_status.status ? `<i class="fa-solid fa-circle online-status"></i>`
                         : `<span class="offline-status">${last_active_time}</span>`;
                    const type_message = data.data.type;
                    const message = data.data.last_message;
                    const time_message = convertTime(data.data.time);
                    const status_message  = data.data.status_message == "seen" ? `<span class="user-avatar" style="background-image : url(${user_ava_href});"></span>` 
                        : (data.data.status_message == "offline" ? `<i class="fa-light fa-circle-check"></i>` : `<i class="fa-solid fa-circle-check"></i>`); 
                        //unseen offline seen
                    $('.message-list').append(`
                    <div class="message-model">
                        <a href="#" class="container">
                            <div class="first-container">
                                <span class="user-avatar avatar-message" style="background-image: url(${user_ava_href});"></span>
                                ${active_status}
                                <div class="message-content">
                                    <span class="message-username">${user_name}</span>
                                    <span class="message-value">${message+"."+" "}
                                        <span class="time-last-mess">${time_message}</span>
                                    </span>
                                </div>
                            </div>
                            <div class="status-message">
                                ${status_message}
                            </div>
                        </a>
                    </div>`)
                }
            },
            error: (error) =>{
                console.log(error);
            }
        })
    }
}
$('#creatComment').on("keypress", (e)=> {
    if (e.key == 'Enter') {
        let creatComment = $("#creatComment")
        if (creatComment.val().length === 0) {
            return alert('Write something')
        } else {

            let commentBody = {
                body: creatComment.val()
            }
            creatComment.val('')
            creatComment.attr('disabled', 'disabled')
            let postId = creatComment.data('post')

            $.post(`/api/comment/${postId}`, commentBody, (data, status)=> {
                if (status == 'success') {

                    let element = `<div class="media border">
                    <img src="/${data.comment.profile.profilePic}" class="rounded-circle m-3" style="width:40px" />
                    <div class="media-body my-4">
                    <strong>${data.comment.profile.name}</strong>
                    <span><small class="text-muted">${data.creatTime}</small></span>
                    <p>
                    ${data.comment.body}
                    </p>

                    <div class="ml-2">
                    <label for="creatReply"><strong>Creat Replay</strong></label>
                    <input class="form-control" type="text" name="creatReply" id="creatReply" placeholder="Press Enter to Submit" value="" data-comment="${data.comment._id}" />

                    </div>
                    </div>
                    </div>`

                    $("#allComments").prepend(element)
                    creatComment.removeAttr('disabled')
                }
            })
        }
    }
})


$('[id="creatReply"]').on('keypress', (e)=> {
    if (e.key == 'Enter') {
        let commentId = e.target.dataset.comment
        let replyBody = {
            body: e.target.value
        }

        if (replyBody.length == 0) {
            return alert('Write something.')
        }
        
        e.target.disabled=true

        $.post(`/api/comment/replies/${commentId}`, replyBody, (data, status)=> {

            let element = `<div class="media border">
            <img src="/${data.profile?data.profile.profilePic: ''}" class="rounded-circle m-3" style="width:30px" />
            <div class="media-body my-2">
            <strong>${data.profile?data.profile.name: ''}</strong>
            <p>
            ${data.body}
            </p></div>
            </div>`

            if (status == 'success') {

                $(`#allReplies-${commentId}`).prepend(element)
                e.target.disabled=false
                e.target.value = ''
            } else {
                alert('Error occurs! Refresh the page.')
            }
        })
    }
})
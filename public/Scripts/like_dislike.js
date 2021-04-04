window.onload = function () {
    let likeBtn = $('#likeBtn')
    let dislikeBtn = $('#dislikeBtn')

    likeBtn.on('click', (e)=> {
        let postId = likeBtn.data('post');
        reqLikeDislike(postId, 'like')
        .then(res=>res.json())
        .then(data=> {
            let {
                like,
                likeNum,
                dislikeNum
            } = data
            
            likeBtn.html(`${like?'Liked':'Like'} (${likeNum})`)
            dislikeBtn.html(`Dislike  (${dislikeNum})`)
        })
        .catch(e=> {
            alert('Some Error!')
            console.log(e);
        })
    })

    dislikeBtn.on('click', (e)=> {
        let postId = likeBtn.data('post');
        reqLikeDislike(postId, 'dislike')
        .then(res=>res.json())
        .then(data=> {
            let {
                dislike, likeNum, dislikeNum
            } = data

            dislikeBtn.html(`${dislike?'Disliked':'Dislike'} (${dislikeNum})`)
            likeBtn.html(`Like (${likeNum})`)

        })
        .catch(e=> {
            alert('Some Error!')
            console.log(e);
        })
    })


    function reqLikeDislike(id, type) {
        let req = new Request(`/api/${type}/${id}`, {
            method: 'GET',
            mode: 'cors'
        })
        return fetch(req)
    }
    
    
    
    
    
    let bookmarks = document.getElementsByClassName('bookmark');
    [...bookmarks].forEach(bookmark=>{
        bookmark.style.cursor='pointer'
        bookmark.addEventListener('click',(e)=>{
            let target = e.target.parentElement 
            
            let headers = new Headers()
            headers.append('Accept','Application/JSON')
            
            let req = new Request(`/api/bookmark/${target.dataset.post}`,{
                method:'GET',
                headers,
                mode:'cors'
            })
            
            fetch(req)
            .then(res=>{
                return res.json()
            })
            .then(data=>{
                console.log(data);
                if (data.bookmark) {
                    bookmark.innerHTML ='<i class="fas fa-bookmark"></i>'
                }else{
                    bookmark.innerHTML ='<i class="far fa-bookmark"></i>'
                    
                }
            })
            .catch(e=>{
                alert('Some Error')
            })
            
        })
    })

}
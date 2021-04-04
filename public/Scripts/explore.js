window.onload=()=>{
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
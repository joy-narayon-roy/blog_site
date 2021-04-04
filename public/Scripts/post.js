window.onload = function() {
    
    tinymce.init({
        selector: '#postBody',
        plugins: ['advlist lists link autolink autosave code', 'preview', 'searchreplace', 'wordcount', 'media table enoticons image imagetools'],
        toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | fontsizeselect | ballist numlist outdent indent | link image media | forecolor backcolor enoticons | code preview',
        height: 500,
        automatic_uploads: true,
        images_upload_url: '/Post/Postimage',
        image_upload_handler: function(blobInfo, success, failure, progress) {
            let headers = new Headers()
            headers.append('Accept', 'Application/JSON')

            let formData = new FormData()
            formData.append('file', blobInfo.blob(), blobInfo.filename());

            let req = new Request('/Postimage', {
                method: 'POST',
                headers,
                mode: 'cors',
                body: formData
            })

            /*
            fetch(req).then(res=>{
                console.log(res);
                return res.json()
            }).then(data=>success(data.imgUrl)).catch(()=> {
                failure('Some ERROR')})
*/
            fetch(req).then(res=> {
                return res.json()
            }).then(data=>{
                success(`${data.imgUrl}`)
            }).catch(()=> {
                failure('Some ERROR')})


        }
    })
}

function print(argument) {
    alert('Ok')
}
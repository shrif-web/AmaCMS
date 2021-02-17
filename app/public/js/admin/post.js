const submit = (method, url) => {
    const post = {
        title: $('#post-title').val(),
        imageUrl: $('#image-url').val(),
        content: tinymce.get('text-editor').getContent(),
        CategoryId: idByName[$("#category-select").Title()],
    }

    console.log(post)

    $.ajax({
        url: url,
        method: method,
        contentType: 'application/json',
        data: JSON.stringify(post)
    }).done(response => {
        window.location = '/admin/post/'
    }).fail(response => alert(response.responseJSON.message))
}

$('#upload-main-image-btn').click(() => {
    const formData = new FormData()
    formData.append('file', $('#post-image-file').prop('files')[0])

    $.ajax({
        url: '/api/upload/image',
        method: 'POST',
        processData: false,  // tell jQuery not to process the data
        contentType: false,  // tell jQuery not to set contentType
        data: formData,
    }).done(response => {
        $('#image-url').val(String(new URL(response.location, window.location.origin)))
        $("#upload-modal").modal('hide');
    }).fail(response => alert(response.responseJSON.message))
})

const deletePost = () => {
    const id = Number($('#delete-id').html())
    $.ajax({
        url: `/api/post/${id}`,
        method: 'DELETE',
    }).done(response => {
        window.location = '/admin/post/'
    }).fail(response => alert(response.responseJSON.message))
}

const deletePostButton = (id, title) => {
    $('#delete-title').html(title)
    $('#delete-id').html(id)
    $('#delete-modal').modal('show')
}

const editPost = id => {
    window.location = `/admin/post/edit/${id}`
}

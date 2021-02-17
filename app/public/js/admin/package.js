const submit = (method, url) => {
    const the_package = {
        title: $('#package-title').val(),
        imageUrl: $('#image-url').val(),
        description: tinymce.get('text-editor').getContent(),
        fileUrl: $('#file-url').val(),
        price: Number($('#package-price').val()),
        coverUrl: $('#cover-url').val(),
    }

    console.log(the_package)

    $.ajax({
        url: url,
        method: method,
        contentType: 'application/json',
        data: JSON.stringify(the_package)
    }).done(response => {
        window.location = '/admin/package/'
    }).fail(response => alert(response.responseJSON.message))
}

const uploadFile = type => {
    const formData = new FormData()
    formData.append('file', $(`#package-${type}`).prop('files')[0])

    $.ajax({
        url: `/api/upload/${type}`,
        method: 'POST',
        processData: false,  // tell jQuery not to process the data
        contentType: false,  // tell jQuery not to set contentType
        data: formData,
    }).done(response => {
        $(`#${type}-url`).val(String(new URL(response.location, window.location.origin)))
        $(`#upload-${type}-modal`).modal('hide');
    }).fail(response => alert(response.responseJSON.message))
}

const deletePackage = () => {
    const id = Number($('#delete-id').html())
    $.ajax({
        url: `/api/package/${id}`,
        method: 'DELETE',
    }).done(response => {
        window.location = '/admin/package/'
    }).fail(response => alert(response.responseJSON.message))
}

const deletePackageButton = (id, title) => {
    $('#delete-title').html(title)
    $('#delete-id').html(id)
    $('#delete-modal').modal('show')
}

const editPackage = id => {
    window.location = `/admin/package/edit/${id}`
}

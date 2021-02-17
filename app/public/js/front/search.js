const loading = () => {
    // TODO: Arman
}

const showSearchResults = results => {
    /*  results: array of {
            title,
            imageUrl, 
            content,
            views,
            createdAt,
            likes,
            user: {
                firstName,
                lastName,
            },
        } */
}

const sleep = time => {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const prepareResults = response => {

}


const search = () => {
    const query = $('#search_input').val()
    console.log(`searcing ${query}`);

    // TODO: switch to loading mode

    $.get(`/api/search?q=${query}`)
        .done(response => {
            sleep(1000) // just for dev
                .then(() => {

                })
            window.location = '/admin/post/'
        }).fail(response => alert(response.responseJSON.message))
}

const loading = () => {
    // TODO: Arman
}

const showSearchResults = results => {
    // TODO: Arman
    /*  results: array of {
            id,
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

const error = response => {
    // TODO: Arman
}

const sleep = time => {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const prepareResults = response => {
    const results = []
    for (const result of response.hits.hits) {

        results.push({

        })
    }
}

const search = () => {
    const query = $('#search_input').val()
    console.log(`searcing ${query}`);

    

    $.get(`/api/search?q=${query}`)
        .done(response => {
            sleep(1000) // just for dev
                .then(() => {

                })
            window.location = '/admin/post/'
        }).fail(response => alert(response.responseJSON.message))
}

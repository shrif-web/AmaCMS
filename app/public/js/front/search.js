const loading = () => {
    // TODO: Arman
}

const showSearchResults = results => {
    // TODO: Arman
    /*  results: array of {
            id,
            title,
            imageUrl, 
            content : array of text,
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

const getContent = result => {
    if (result.highlight) {
        return result.highlight.content.map(highlight => `...${highlight}...`)
    }
    return [`${result._source.content.slice(0, 100)}...`]
}

const prepareResults = response => {
    const results = []
    for (const result of response.hits.hits) {

        results.push({
            id: result._id,
            title: result._source.title,
            imageUrl: result._source.imageUrl,
            content: getContent(result),
            views: result._source.views,
            createdAt: result._source.createdAt,
            likes: result._source.likes,
            user: result._source.user,
        })
    }
    return results
}

const search = () => {
    const query = $('#search_input').val()
    console.log(`searcing ${query}`);

    loading()

    $.get(`/api/search?q=${query}`)
        .done(response => {
            sleep(1000) // just for dev
                .then(() => {
                    const results = prepareResults(response)
                    showSearchResults(results)
                })
        }).fail(response => error(response))
}
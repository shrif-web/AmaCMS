const loading = () => {
    $("#loader-wrapper").fadeIn();
}

const createSinglePost = post => {
    console.log(post.title)
    let p = $("#clonable-post").clone(true);
    p.removeAttr('id');


    p.find(".post-thumb").attr("src", post.imageUrl);
    p.find(".result-post-link").attr("href", `/post/${post.id}`)
    p.find(".post_author_name").html(post.user.firstName + " " + post.user.lastName)
    p.find(".number_of_like_post").html(post.likes)
    p.find(".number_of_view_post").html(post.views)
    p.find(".post_title").html(post.title)
    const createdAt = (new Date(post.createdAt)).toLocaleString([], {year: 'numeric', month: 'long', day: 'numeric'});
    p.find(".post_release_date_time").html(createdAt)
    p.find(".post_content").html(post.content)

    p.removeClass("d-none")
    $("#searchResultContainer").append(p);
} 

const initModal = query => {
    $("#searchModal .modal-title").html("Search result for <span class='font-weight-bold'>" + query + "</span>")
    $("#no-result-alert").addClass("d-none").removeClass("d-block");
    $("#searchResultContainer").html("");
}

const showSearchResults = (query, results) => {
    $("#loader-wrapper").fadeOut();
    initModal(query);
    $("#searchModal").modal();
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
    if (results.length) {
        for (let post of results) {
            createSinglePost(post);
        }
    } else {
        $("#no-result-alert").removeClass("d-none").addClass("d-block");
    }
    
}

const error = response => {
    swal("Error", "Error while fetching from elasticsearch", "error");
    console.log(response)
}

const sleep = time => {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const getContent = result => {
    if (result.highlight) {
        const concatted = result.highlight.content.join('...')
        return `...${concatted}...`
    }
    return `${result._source.content.slice(0, 100)}...`
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
    console.log(`searching ${query}`);

    loading()

    $.get(`/api/search?q=${query}`)
        .done(response => {
            sleep(0) // just for dev
                .then(() => {
                    const results = prepareResults(response)
                    console.log(results);
                    showSearchResults(query, results)
                })
        }).fail(response => error(response))
}
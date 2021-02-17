import elastic from '../../services/elastic.js'

export const search = async (req, res) => {
    const query = req.query.q
    const { body } = await elastic.search({
        index: 'posts',
        body: {
            query: {
                multi_match: {
                    query: query,
                    fuzziness: 1,
                    fields: [
                        'title',
                        'content'
                    ]
                }
            },
            highlight: {
                fields: {
                    content: {
                        number_of_fragments: 2
                    }
                }
            }
        }
    })

    res.status(200).json(body)
}

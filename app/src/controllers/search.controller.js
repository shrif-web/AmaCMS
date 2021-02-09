import elastic from '../services/elastic.js'

export const search = async (req, res) => {
    const { body } = await elastic.search({
        index: 'posts',
        body: {
            query: {
                match: {
                    content: {
                        query: req.query.q,
                        fuzziness: 2
                    }
                }
            },
            highlight: {
                fields: {
                    content: {}
                }
            }
        }
    })

    res.status(200).json(body)
}

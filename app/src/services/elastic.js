import { Client } from '@elastic/elasticsearch';

const client = new Client({
    node: process.env.ELASTIC_HOST,
    auth: {
        username: 'elastic',
        password: process.env.ELASTIC_PASSWORD
    }
})

const res = await client.indices.exists({ index: 'posts' })

if (!res.body) {
    await client.indices.create({
        index: 'posts'
    })

    await client.indices.putSettings({
        index: 'posts',
        body: {
            settings: {
                index: {
                    blocks: {
                        read_only_allow_delete: null
                    }
                }
            }
        }
    })

    console.log('index posts created in elasticsearch')
} else {
    console.log('index posts already exists in elasticsearch')
}

export default client

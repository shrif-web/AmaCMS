import { Client } from '@elastic/elasticsearch';

export default new Client({
    node: process.env.ELASTIC_HOST,
    auth: {
        username: 'elastic',
        password: process.env.ELASTIC_PASSWORD
    }
})

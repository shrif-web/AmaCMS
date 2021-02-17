import { Client } from '@elastic/elasticsearch';
import User from '../models/user.model.js';

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

client.createPost = async post => {
    const plainContent = post.getRawContent();
    const user = await User.findOne({
        where: {
            id: post.UserId
        }
    })
    await client.create({
        id: String(post.id),
        index: 'posts',
        body: {
            title: post.title,
            imageUrl: post.imageUrl,
            content: plainContent,
            views: post.views,
            createdAt: post.createdAt,
            likes: post.likes,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
            }
        }
    });
}

client.updatePost = async post => {
    const plainContent = post.getRawContent();
    const user = await User.findOne({
        where: {
            id: post.UserId
        }
    })
    await client.update({
        id: String(post.id),
        index: 'posts',
        body: {
            doc: {
                title: post.title,
                imageUrl: post.imageUrl,
                content: plainContent,
                views: post.views,
                createdAt: post.createdAt,
                likes: post.likes,
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                }
            }
        }
    });
}

client.deletePost = async post => {
    await client.delete({
        id: String(post.id),
        index: 'posts',
    });
}

export default client

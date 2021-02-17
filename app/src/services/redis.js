import redis from 'redis'

const redisClient = redis.createClient('redis://cache')

export default redisClient

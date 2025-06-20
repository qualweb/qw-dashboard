import Redis from 'ioredis';

export default class RedisConnection {
    private redis: Redis;
    
    constructor(redis_ip: string, redis_port: number) {
        this.redis = new Redis({
            host: redis_ip,
            port: redis_port,
            lazyConnect: true,
        });
        
        this.setupEventListeners();
    }
    
    private setupEventListeners(): void {
        this.redis.on('connect', () => {
            console.log('✅ Connected to Redis for job queue');
        });
        
        this.redis.on('error', (error) => {
            console.error('❌ Redis connection error:', error.message);
            if (error.message.includes('ECONNREFUSED')) {
                console.log('💡 Make sure your Redis Docker container is running');
            }
        });
        
        this.redis.on('reconnecting', (delay: number) => {
            console.log(`🔄 Reconnecting to Redis in ${delay}ms...`);
        });
    }
    
    async testConnection(): Promise<void> {
        try {
            const result = await this.redis.ping();
            if (result === 'PONG') {
                console.log('✅ Redis connection test successful');
            }
        } catch (error) {
            console.error('❌ Redis connection test failed:', error);
            throw error;
        }
    }
    
    getClient(): Redis {
        return this.redis;
    }
}
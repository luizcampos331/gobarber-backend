"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RateLimiter;

var _redis = _interopRequireDefault(require("redis"));

var _AppError = _interopRequireDefault(require("../../../errors/AppError"));

var _rateLimiterFlexible = require("rate-limiter-flexible");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const redisCliente = _redis.default.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined
});

const limiter = new _rateLimiterFlexible.RateLimiterRedis({
  storeClient: redisCliente,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1
});

async function RateLimiter(request, response, next) {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (error) {
    throw new _AppError.default('Too many requests', 429);
  }
}
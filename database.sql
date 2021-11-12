CREATE TABLE tweets(
    id BIGSERIAL PRIMARY KEY,
    text TEXT
);

CREATE TABLE hashtags(
    id SERIAL PRIMARY KEY,
    tweet_id BIGINT,
    hashtag VARCHAR(280),
    created_at VARCHAR(24)
);


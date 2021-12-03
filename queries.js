const retrieveTweetsByDateQuery = `
    WITH 
    G AS (
        SELECT LEFT(created_at, 10) AS date, COUNT(*) 
        FROM hashtags 
        GROUP BY 1
        ORDER BY 1
    ), 
    H AS (
        SELECT LEFT(created_at, 10) AS date, hashtag 
        FROM hashtags
    ), 
    filtered_group AS (
        SELECT G.date, H.hashtag
        FROM G
        INNER JOIN H
        ON G.date = H.date
        WHERE G.count >= $1
    ), 
    rm_group AS (
        SELECT hashtag, date, 
        ROW_NUMBER() OVER (
            PARTITION BY date
        ) row_num 
        FROM filtered_group
        ORDER BY date
    ), 
    sampled_group AS (
        SELECT *
        FROM rm_group
        WHERE rm_group.row_num <= $1
    )
    SELECT hashtag, COUNT(hashtag) 
    FROM sampled_group 
    WHERE date LIKE $2 
    GROUP BY 1 
    ORDER BY 2 DESC 
    LIMIT 10
`

const retrieveTweetsByHashtagQuery = `
    WITH 
    G AS (
        SELECT LEFT(created_at, 10) AS date, COUNT(*) 
        FROM hashtags 
        GROUP BY 1
        ORDER BY 1
    ), 
    H AS (
        SELECT LEFT(created_at, 10) AS date, hashtag 
        FROM hashtags
    ), 
    filtered_group AS (
        SELECT G.date, H.hashtag
        FROM G
        INNER JOIN H
        ON G.date = H.date
        WHERE G.count >= $1
    ), 
    rm_group AS (
        SELECT hashtag, date, 
        ROW_NUMBER() OVER (
            PARTITION BY date
        ) row_num 
        FROM filtered_group
        ORDER BY date
    ), 
    sampled_group AS (
        SELECT *
        FROM rm_group
        WHERE rm_group.row_num <= $1
    )
    SELECT date, COUNT(hashtag)
    FROM sampled_group
    WHERE hashtag LIKE $2
    GROUP BY 1
    ORDER BY 1
`

const retrieveHashtagListQuery = `
    WITH G AS (
        SELECT hashtag, LEFT(created_at, 10) AS date 
        FROM hashtags 
        GROUP BY 1, 2 
        ORDER BY 1
    ) 
    SELECT hashtag, COUNT(*) 
    FROM G 
    GROUP BY 1 
    HAVING COUNT(*) >= 7
`

module.exports = {
    retrieveTweetsByDateQuery,
    retrieveTweetsByHashtagQuery,
    retrieveHashtagListQuery,
}

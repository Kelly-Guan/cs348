CREATE VIEW reviewer_votes AS(
    SELECT 
    reviewer_uid AS uid, mid, 
    SUM(CASE WHEN vote = '1' THEN 1 ELSE 0 END) AS upvotes,
    SUM(CASE WHEN vote = '0' THEN 1 ELSE 0 END) AS downvotes
FROM 
    votes
GROUP BY 
    reviewer_uid, mid
);


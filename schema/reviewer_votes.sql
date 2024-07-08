CREATE MATERIALIZED VIEW reviewer_votes AS(
    SELECT 
    reviewer_uid AS uid, mid, 
    SUM(CASE WHEN vote = '1' THEN 1 ELSE 0 END) AS upvotes,
    SUM(CASE WHEN vote = '0' THEN 1 ELSE 0 END) AS downvotes
FROM 
    votes
GROUP BY 
    reviewer_uid, mid
);

CREATE OR REPLACE FUNCTION refresh_reviewer_votes() RETURNS TRIGGER AS $$
BEGIN
    REFRESH MATERIALIZED VIEW reviewer_votes;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER refresh_reviewer_votes_after_insert
AFTER INSERT ON votes
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_reviewer_votes();

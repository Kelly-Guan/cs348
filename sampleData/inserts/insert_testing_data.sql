INSERT INTO movies (title, release_date, runtime, description, poster_link, adult) VALUES
('Toy Story', '1995-11-22', 81, 'A cowboy doll is profoundly threatened and jealous when a new spaceman action figure supplants him as top toy in a boy''s bedroom.', 'https://i.ebayimg.com/images/g/RVoAAOSwYxBefUP8/s-l1600.jpg', false),
('E.T. the Extra-Terrestrial', '1982-06-11', 115, 'A troubled child summons the courage to help a friendly alien escape from Earth and return to his home planet.', 'https://m.media-amazon.com/images/M/MV5BMTQ2ODFlMDAtNzdhOC00ZDYzLWE3YTMtNDU4ZGFmZmJmYTczXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg', false),
('Cloudy with a Chance of Meatballs', '2009-09-12', 90, 'A local scientist is often regarded as a failure until he invents a machine that can make food fall from the sky. But little does he know that things are about to take a turn for the worst.', '', false),
('Cars', '2006-03-14', 116, 'On the way to the biggest race of his life, a hotshot rookie race car gets stranded in a rundown town and learns that winning isn''t everything in life.', '', false),
('The Incredibles', '2004-10-24', 115, 'While trying to lead a quiet suburban life, a family of undercover superheroes are forced into action to save the world.', '', false);
INSERT INTO Users (first_name,last_name,username,email,password) VALUES
('Andrew','Jia','akyjia','akyjia@uwaterloo.ca','abcd123'),
('Hudson','Koyanagi','hkoya','hkoya@uwaterloo.ca','bazinga!312'),
('Kelly','Guan','kgguan','kgguan@uwaterloo.ca','asdfg12357'),
('Arjun','Walia','a24walia','a24walia@uwaterloo.ca','10283ub'),
('Lindsay','Zhang','l47zhang','l47zhang@uwaterloo.ca','asubvg18');
INSERT INTO Ratings (uid,mid,score,rating_text,upvotes,downvotes, date_posted) VALUES
(1,1,2,'This movie is awesome!',3,0,'2024-06-12 13:23:00'),
(1,2,3,'This movie is subpotimal',2,3, '2024-06-12 16:23:00'),
(3,2,0,'This movie is awful',0,5,'2024-06-12 19:23:00');


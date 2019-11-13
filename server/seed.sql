DROP DATABASE IF EXISTS lurk_db;

CREATE DATABASE lurk_db;

\c lurk_db

DROP TABLE IF EXISTS usersessions;

DROP TABLE IF EXISTS pictures;

DROP TABLE IF EXISTS lurks;

DROP TABLE IF EXISTS likes;

DROP TABLE IF EXISTS comments;

DROP TABLE IF EXISTS albums;

DROP TABLE IF EXISTS posts;

DROP TABLE IF EXISTS users;

-- Users created will have posts, lurks and albums
CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(16) NOT NULL UNIQUE,
    password VARCHAR,
    firstname VARCHAR,
    lastname VARCHAR,
    email VARCHAR,
    age INT,
    location VARCHAR,
    bio VARCHAR,
    profile_pic VARCHAR
);

-- post is connected to a user and has comments
CREATE TABLE Posts(
    id SERIAL PRIMARY KEY,
    -- post_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    poster_id INT REFERENCES Users (id) ON DELETE CASCADE,
    body VARCHAR,
    -- turn likes into an array so that we can check who liked it.
    views INT
);

-- likes
CREATE TABLE likes(
    id SERIAL PRIMARY KEY,
    liker_id INT REFERENCES Users (id) ON DELETE CASCADE,
    post_id INT REFERENCES posts (id) ON DELETE CASCADE
);

-- every comment must have a post
CREATE TABLE Comments(
    id SERIAL PRIMARY KEY,
    commenter_id INT REFERENCES Users (id) ON DELETE CASCADE,
    post_id INT REFERENCES Posts (id) ON DELETE CASCADE,
    body VARCHAR,
    likes INT,
    views INT
);

-- Lurks are like a subscribe button and stores usernames of people the user lurks
CREATE TABLE Lurks(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users (id) ON DELETE CASCADE,
    lurker_id INT REFERENCES Users (id) ON DELETE CASCADE,
    lurker_username VARCHAR REFERENCES Users (username) ON DELETE CASCADE
    -- sub_date TIMESTAMP
);

-- every user can create an album 
CREATE TABLE Albums(
    id SERIAL PRIMARY KEY,
    user_owner_id INT REFERENCES Users (id) ON DELETE CASCADE,
    album_name VARCHAR,
    likes INT,
    views INT
);

-- every picture must be in an album
CREATE TABLE Pictures(
    id SERIAL PRIMARY KEY,
    album_id INT REFERENCES Albums (id) ON DELETE CASCADE,
    pic VARCHAR,
    likes INT,
    views INT
);

-- keeps track of who is logged in
CREATE TABLE usersessions( 
    id SERIAL PRIMARY KEY,
    useridloggedin INT REFERENCES Users (id) ON DELETE CASCADE
    -- userpassword VARCHAR REFERENCES Users (password) ON DELETE CASCADE
);

-- Add some users
INSERT INTO Users(username, password, firstname, lastname, email, age, location, bio, profile_pic)
    VALUES('DryEraser', '103', 'Adam', 'Addams', 'meow@aol.com', 40, 'New York', 'I’m very choosy. I’m also very suspicious, very irrational and I have a very short temper. I’m also extremely jealous and slow to forgive. Just so you know.', 'http://cdn.osxdaily.com/wp-content/uploads/2014/07/users-and-groups-icon-mac.png'),
          ('SteveJobs', '193', 'Beth', 'Brown', 'meow@chickenbutt.com', 51, 'New York', 'If you follow me, all of your dreams will come true. I also know the difference between your and you’re but I won’t lord it over you.', 'http://cdn.osxdaily.com/wp-content/uploads/2014/07/users-and-groups-icon-mac.png'),
          ('Expo', '777', 'Cal', 'Cassady', 'meow@pursuit.com', 14, 'New York', 'Living vicariously through myself', 'http://cdn.osxdaily.com/wp-content/uploads/2014/07/users-and-groups-icon-mac.png'),
          ('JohnDoe87', '456', 'Don', 'Donner', 'meow@gmail.com', 33, 'New York', 'One day I woke up & I felt bad because blink-182 broke up. Then i remembered all the small things and i went back to sleep and woke up the following morning.', 'http://cdn.osxdaily.com/wp-content/uploads/2014/07/users-and-groups-icon-mac.png'),
          ('JaneDoes20', '321', 'Eve', 'Edwards','meow@hotmail.com', 83, 'New York', 'Pudding tastes better with a plastic spoon', 'http://cdn.osxdaily.com/wp-content/uploads/2014/07/users-and-groups-icon-mac.png'),
          ('LittleThanos', '321', 'Eve', 'Edwards','meow@hotmail.com', 83, 'New York', 'I used to act. I also belly dance and eat Jolly Ranchers – not always at the same time though.', 'http://cdn.osxdaily.com/wp-content/uploads/2014/07/users-and-groups-icon-mac.png');


-- Add some posts
INSERT INTO Posts (poster_id, body, views)
    VALUES(1, 'Been blocked for a month now, cant like, follow, unfollow or post. Absolutely need it fixed as Im helping someone out with their account and theyre counting on me... getting irritated by the ban... they use it to sell art. what can I do? I have reported it every day :( Im really stressed out', 0),
          (1, 'Its easy to believe that a corporation as huge as Walmart would give prizes via text. TOO GOOD TO BE TRUE, though. IGNORE texts from "Walmart," or from "whoever," because they are phishing.', 0),
          (2, 'Its super annoying to me when people are very good at twitter and also really good at instagram and aldo REALLY good at Lurk come on you cant have all three', 0),
          (2, 'I would love to start an interview series with random people from Lurk called “How Do You Afford Your Life?”', 0),
          (3, '[detective inspecting my body at the bottom of the grand canyon] looks like the victim was tweeting "more like the bland canyon" and fell in', 0),
          (4, 'me: Lurk is a cesspool || also me: Lurk has provided 98% of my entertainment for the day', 0),
          (4, 'I want an app for each website I visit. And I want all of them to have loud videos that play automatically. This is my ideal user experience', 0),
          (5, 'A bank is a place that will lend you money if you can prove that you don’t need it.', 0),
          (5, 'Borrow money from a pessimist–they don’t expect it back.', 0),
          (5, 'What happens if you get scared half to death twice?', 0);
    

-- Add some likes
INSERT INTO likes (liker_id, post_id)
    VALUES(6, 10),
          (6, 3),
          (6, 6),
          (6, 2),
          (6, 7),
          (2, 8),
          (3, 8),
          (5, 8),
          (1, 9),
          (3, 1),
          (3, 4),
          (4, 5);
    

-- Add some comments
INSERT INTO Comments (post_id, body, likes, views)
    VALUES(1, 'I am Ad343434am! Hello!', 0, 0),
          (1, 'I like pa3434342342ncakes', 0, 0),
          (2, 'I am Bet23534134134h! Welcome to my blog.', 0, 0),
          (2, 'My zodiac13513413414 sign is Gemini', 0, 0),
          (3, 'I am Cal! 1351341414141This is my first post :', 0, 0),
          (4, 'I am Do1415135134134n! Hello world!', 0, 0),
          (4, 'I enjoy141414135134 long walks on the beach', 0, 0),
          (5, 'I am Ev341313131e! Welcome!', 0, 0),
          (5, 'I like t135134134134urtles', 0, 0),
          (5, 'My favor1351341351313ite number is 8', 0, 0);


-- Add some lurks
INSERT INTO Lurks(user_id, lurker_id, lurker_username)
    VALUES(1, 5, 'JaneDoes20'),
          (2, 1, 'DryEraser'),
          (2, 4, 'JohnDoe87'),
          (2, 5, 'JaneDoes20'),
          (3, 2, 'SteveJobs'),
          (4, 2, 'SteveJobs'),
          (5, 3, 'Expo'),
          (5, 1, 'DryEraser');

-- Add album
INSERT INTO Albums(user_owner_id, album_name, likes, views)
    VALUES(1, 'Goats', 4, 2),
          (2, 'Boats', 4, 1),
          (2, 'Toats', 4, 5),
          (2, 'Coats', 4, 7),
          (3, 'Ooats', 4, 7),
          (4, 'Moats', 4, 6),
          (5, 'Loats', 4, 8),
          (5, 'Lobster', 40, 9);

-- Add pictures to album
INSERT INTO Pictures(album_id, pic, likes, views)
    VALUES(1, 'url', 3, 2),
          (2, 'url', 3, 1),
          (2, 'url', 3, 5),
          (2, 'url', 3, 7),
          (3, 'url', 3, 7),
          (4, 'url', 3, 6),
          (5, 'url', 3, 8),
          (5, 'url', 3, 9);

-- INSERT INTO usersessions(useridloggedin)
--     VALUES(1);

-- Let's verify that the users and posts were inserted 
SELECT * FROM Users;
SELECT * FROM Posts;
SELECT * FROM likes;
SELECT * FROM Comments;
SELECT * FROM Lurks;
SELECT * FROM Albums;
SELECT * FROM Pictures;
SELECT * FROM usersessions;

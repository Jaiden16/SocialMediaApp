DROP DATABASE IF EXISTS lurk_db;

CREATE DATABASE lurk_db;

\c lurk_db

-- Users created will have posts, lurks and albums
CREATE TABLE Users(
    id SERIAL PRIMARY KEY ,
    username VARCHAR(16) NOT NULL UNIQUE ON DELETE CASCADE,
    password VARCHAR,
    firstname VARCHAR,
    lastname VARCHAR,
    email VARCHAR,
    age INT,
    location VARCHAR,
    bio VARCHAR
);

-- post is connected to a user and has comments
CREATE TABLE Posts(
    id SERIAL PRIMARY KEY,
    poster_id INT REFERENCES Users (id),
    body VARCHAR,
    likes INT,
    views INT
    );

-- every comment must have a post
CREATE TABLE Comments(
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES Posts (id),
    body VARCHAR,
    likes INT,
    views INT
);

-- Lurks are like a subscribe button and stores usernames of people the user lurks
CREATE TABLE Lurks(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users (id),
    lurker_username VARCHAR REFERENCES Users (username),
    sub_date TIMESTAMP
);

-- every user can create an album 
CREATE TABLE Albums(
    id SERIAL PRIMARY KEY,
    user_owner_id INT REFERENCES Users (id),
    album_name VARCHAR,
    likes INT,
    views INT
);

-- every picture must be in an album
CREATE TABLE Pictures(
    id SERIAL PRIMARY KEY,
    album_id INT REFERENCES Albums (id),
    pic VARCHAR,
    likes INT,
    views INT
);

-- Add some users
INSERT INTO Users(username, password, firstname, lastname, email, age, location, bio)
    VALUES('DryEraser', '103', 'Adam', 'Addams', 'meow@aol.com', 40, 'New York', 'Nope'),
          ('SteveJobs', '193', 'Beth', 'Brown', 'meow@chickenbutt.com', 51, 'New York', 'Nope'),
          ('Expo', '777', 'Cal', 'Cassady', 'meow@pursuit.com', 14, 'New York', 'Nope'),
          ('JohnDoe87', '456', 'Don', 'Donner', 'meow@gmail.com', 33, 'New York', 'Nope'),
          ('JaneDoes20', '321', 'Eve', 'Edwards','meow@hotmail.com', 83, 'New York', 'Nope');
          ('LittleThanos', '321', 'Eve', 'Edwards','meow@hotmail.com', 83, 'New York', 'Nope');


-- Add some posts
INSERT INTO Posts (poster_id, body, likes, views)
    VALUES(1, 'I am Adam! Hello!', 0, 0),
          (1, 'I like pancakes', 0, 0),
          (2, 'I am Beth! Welcome to my blog.', 0, 0),
          (2, 'My zodiac sign is Gemini', 0, 0),
          (3, 'I am Cal! This is my first post :)', 0, 0),
          (4, 'I am Don! Hello world!', 0, 0),
          (4, 'I enjoy long walks on the beach', 0, 0),
          (5, 'I am Eve! Welcome!', 0, 0),
          (5, 'I like turtles', 0, 0),
          (5, 'My favorite number is 8', 0, 0);
    
-- Add some comments
INSERT INTO Comments (post_id, body, likes, views)
    VALUES(1, 'I am Ad343434am! Hello!', 0, 0),
          (1, 'I like pa3434342342ncakes', 0, 0),
          (2, 'I am Bet23534134134h! Welcome to my blog.', 0, 0),
          (2, 'My zodiac13513413414 sign is Gemini', 0, 0),
          (3, 'I am Cal! 1351341414141This is my first post :)', 0, 0),
          (4, 'I am Do1415135134134n! Hello world!', 0, 0),
          (4, 'I enjoy141414135134 long walks on the beach', 0, 0),
          (5, 'I am Ev341313131e! Welcome!', 0, 0),
          (5, 'I like t135134134134urtles', 0, 0),
          (5, 'My favor1351341351313ite number is 8', 0, 0);


-- Add some lurks
INSERT INTO Lurks(user_id, lurker_username)
    VALUES(1, 'JaneDoes20'),
          (2, 'DryEraser'),
          (2, 'JaneDoe87'),
          (2, 'JaneDoes20'),
          (3, 'SteveJobs'),
          (4, 'SteveJobs'),
          (5, 'Expo'),
          (5, 'DryEraser');

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

-- Let's verify that the users and posts were inserted 
SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM lurks;
SELECT * FROM albums;
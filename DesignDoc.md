# Design Document For Social Media App

This is the living document for our social media app group project
-Lurker-

# Things we need to complete as of right now

1. Landing Page
    - Users will not be able to use our site unless they have an account.
    - Sign in page
        - user name & password
    - With header and links
        - links to sign up if user doesnt have an account
    
2. Feed Page
    - This is the user's home page where they see all other posts,likes and lurks
    - Needs header's, links, and maybe a profile picture according to wireframe
    - maybe add marquee just for fun

3. User's profile page
    - this is the user's presonal page with their profile pic, stat's and other things.

4. SQL Database
    - Server side this will create tjhe tables that we'll need for later. Wont take long

5. Server Setup
    - What our website and database will run on.



# Design Flow
 1. Login Page 
    - put in user's username and password
    - if they don't have on they can create an account go to sign up page 
    login in -> acount(y) -> feed
                |
                |__account(n)-> sign up -> feed
2. Nav bar -> Home - Lurking - Explore - Search


# Vocabulary 
    - Lurkers -> Friends
    - Views -
            |__for post
            |
            |___for profile

# users table 
id | user name | fn | ln | email | pass | age | loc | bio

# post table
id | user | post | like | views | comments

# comment table
id | post | user 

# lurking table
id | userid | vicid

# pic table
id | url | albumid

# album tabler
id | userid | name

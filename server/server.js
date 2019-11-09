const express = require('express');
const cors = require('cors')
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routers
const userRouter = require('./routes/usersRouter');
const postRouter = require('./routes/postsRouter');
const likeRouter = require('./routes/likesRouter');

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/likes', likeRouter);
app.use('/', (req, res) => res.send('welcome to facebook'));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
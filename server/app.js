const express = require('express');
const cors = require('cors');

const logRoutes = require('./Middleware/logger');
const postRouter = require('./Routers/post');
const userRouter = require('./Routers/user');
const profileRouter = require('./Routers/profile');
const managerRouter = require('./Routers/manager');
const loginRouter = require('./Routers/login')

const app = express();

app.use(cors());
app.use(express.json());
app.use(logRoutes);

app.get("/", (req, res) => {
    res.json({
        name: "council app",
        description: "council app for volunteering"
    })
})

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/profiles", profileRouter);
app.use("/managers", managerRouter);
app.use("/login", loginRouter)

module.exports = app;
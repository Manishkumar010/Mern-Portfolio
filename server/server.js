require('dotenv').config();
const express = require('express');
const authRouter = require('./routes/auth-router')
const contactRoute = require('./routes/contact-router');
const serviceRoute = require("./routes/service-router")
const adminRoute = require("./routes/admin-router")
const connectDb = require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    Credentials: true
}

app.use(cors(corsOptions))
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/form', contactRoute)
app.use('/api/data', serviceRoute)

// lets define admin routes
app.use("/api/admin",adminRoute);

app.use(errorMiddleware)
const PORT = 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

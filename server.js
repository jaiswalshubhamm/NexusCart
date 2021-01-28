import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

//Importing Routes
import productRouter from './src/routers/productRouter';
import userRouter from './src/routers/userRouter';
import orderRouter from './src/routers/orderRouter';
import uploadRouter from './src/routers/uploadRouter';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json({limit: '100mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb','extended': 'true'}));
// app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// routes
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get('/api/config/google', (req, res) => {
    res.send(process.env.GOOGLE_API_KEY || '');
});
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

if (process.env.NODE_ENV === "production") {
    // server static content
    // npm run build
    app.use(express.static('frontend/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});
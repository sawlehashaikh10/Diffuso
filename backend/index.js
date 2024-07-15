require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Stripe = require('stripe');
const { sendOtpEmail } = require('./emailService');
const { log } = require('console');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Replace with your Stripe secret key

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

const app = express();
const saltRounds = 10;

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000' // Adjust to match the frontend URL
}));
app.use(bodyParser.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Serve static files in the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// PostgreSQL connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Helper function to execute queries
const query = (text, params) => pool.query(text, params);

const isValidEmail = email => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
const isValidPassword = password => password.length >= 8;

// const generateOtp = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// };
const backendOtp = Math.floor(100000 + Math.random() * 900000);

// User registration
app.post('/api/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !isValidEmail(email) || !isValidPassword(password)) {
        return res.status(400).send('Invalid input');
    }
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        //const otp = generateOtp();
        const otp = backendOtp;
        // Store OTP in session or database
        req.session.otp = otp;
        req.session.fullName = fullName;
        req.session.email = email;
        req.session.hashedPassword = hashedPassword;
        console.log(fullName)

        // Send OTP via email
        await sendOtpEmail(email, otp);

        res.status(200).send({ message: 'OTP sent to your email address' });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error sending OTP');
    }
});

app.post('/api/verify-otp', async (req, res) => {
    const { otp,  fullName, email, password } = req.body;
    const integerOtp = parseInt(otp);
    const otp2 = backendOtp;

    if (otp2 === integerOtp) {
        console.log("otp"+otp)
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            // const { fullName, email, password } = req.body;
            console.log(fullName)
            const sql = `INSERT INTO user_info (fullname, email, pass) VALUES ($1, $2, $3)`;
            await query(sql, [fullName, email, hashedPassword]);
            res.status(201).send({ message: 'User registered successfully' });
        } catch (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
    } else {
        res.status(400).send('Invalid OTP');
    }
});

// User login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    if (!isValidEmail(email)) {
        return res.status(400).send('Invalid email format');
    }
    const sql = 'SELECT * FROM user_info WHERE email = $1';
    try {
        const { rows } = await query(sql, [email]);
        if (rows.length === 0) {
            return res.status(401).send('User not found');
        }
        const user = rows[0];
        const match = await bcrypt.compare(password, user.pass);
        if (!match) {
            return res.status(401).send('Incorrect password');
        }
        req.session.userId = user.id;
        req.session.logged_in = true;
        res.send({ message: 'Logged in successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Database error');
    }
});

// Add a product
app.post('/api/addProduct', upload.single('image'), (req, res) => {
    const file = req.file;
    const { itemName, description, price, category } = req.body;

    if (!file) {
        return res.status(400).send('No image uploaded.');
    }
    if (!itemName || !description || !price || !category) {
        return res.status(400).send('All fields are required.');
    }

    const filePath = path.join('uploads', file.filename);

    const sql = 'INSERT INTO product_info (itemName, description, price, category, image) VALUES ($1, $2, $3, $4, $5)';
    pool.query(sql, [itemName, description, price, category, filePath], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        res.send({ message: 'Product added successfully', product: { itemName, description, price, category, image: filePath } });
    });
});

// Get products with images as data URLs
app.get('/api/getProducts', async (req, res) => {
    const sql = 'SELECT id, itemName, description, price, category, image FROM product_info';
    try {
        const { rows } = await query(sql);
        const products = rows.map(product => {
            if (product.image) {
                const imagePath = path.join(__dirname, product.image);
                const imageBuffer = fs.readFileSync(imagePath);
                product.image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
            }
            return product;
        });
        res.status(200).send(products);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Database error');
    }
});

// Create payment intent
app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
        });
        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Test database connection
app.get('/test-db-connection', async (req, res) => {
    try {
        const result = await query('SELECT NOW()');
        res.json({ message: 'Database connection successful', time: result.rows[0].now });
    } catch (err) {
        console.error('Database connection error:', err);
        res.status(500).json({ message: 'Database connection error', error: err });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');
const mongoURI = '<your-mongodb-uri>';
mongoose.connect(mongoURI, { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.use(cors());
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.status(400).send({ error: 'User already exists' });
    } else {
        const newUser = new User({ firstName, lastName, email, password });
        await newUser.save();
        res.send({ message: 'User registered successfully' });
    }
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});

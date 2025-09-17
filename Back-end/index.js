const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

mongoose.connect("mongodb+srv://Parasso:khona@cluster0.m0obokt.mongodb.net/myDatabase?retryWrites=true&w=majority")
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
});

const User = mongoose.model('User', userSchema);

// Get all users
app.get('/prs', async (req, res) => {
    const prs = await User.find();
    res.send(prs);
});

// Add new user
app.post('/prs/new', async (req, res) => {
    const user = await User.create(req.body);
    res.send(user);
});

// Update user
app.put('/prs/update/:id', async (req, res) => {
    const { id } = req.params;
    const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.send(updateUser);
});

// Delete user
app.delete('/prs/delete/:id', async (req, res) => {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);
    res.send(deleteUser);
});

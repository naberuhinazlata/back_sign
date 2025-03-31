const express = require('express');
const cors = require('cors');
const {encodePassword, generateToken} = require('./hash');
const app = express();
app.use(cors());
app.use(express.json());

const users = []; 


app.post('/sign-up', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email та пароль є обов`язковими!' });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'Пароль повинен мати мінімум 8 символів!' });
    }

    if (users.find((user) => user.email === email)) {
        return res.status(400).json({ message: 'Користувач з таким email вже існує!' });
    }

    
   users.push({ email, password: encodePassword(password) });

    res.status(201).json({ message: 'Реєстрація успішна!' });
});

app.post('/sign-in', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email та пароль є обов`язковими!' });
    }

    const user = users.find((user) => user.email === email);

    if (!user) {
        return res.status(401).json({ message: 'Невірний email або пароль!' });
    }

console.log(user, encodePassword(password));
    if (user.password !== encodePassword(password)) {
        return res.status(401).json({ message: 'Невірний email або пароль!' });
    }


    res.status(200).json({ token: generateToken(email) });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

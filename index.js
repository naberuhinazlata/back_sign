const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
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

    const hashedPassword = await bcrypt.hash(password, 10);
//1. `bcrypt.hash(password, 10)`:
//Функция `bcrypt.hash` принимает два аргумента:
//`password`: строка, которую нужно захешировать (в данном случае, пароль пользователя).
//`10`: количество **сольовых раундов** (число, определяющее сложность хеширования). Чем больше значение, тем сложнее и безопаснее хеш, но это также увеличивает время обработки.
    
       users.push({ email, password: hashedPassword });

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

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Невірний email або пароль!' });
    }

    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
    
//Создаёт буфер из строки `${email}:${Date.now()}`.
//В данном случае, строка содержит:
//`email`: адрес электронной почты пользователя.
//`Date.now()`: текущую метку времени в миллисекундах.

//`.toString('base64')`:
//Преобразует содержимое буфера в строку в формате Base64.
//Base64 — это способ кодирования данных в текстовый формат, который можно безопасно передавать через HTTP.

    res.status(200).json({ token });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const email = 'test@example.com'; 
const password = 'securePassword123'; 

fetch('http://localhost:3000/sign-up', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      email,
      password
  })

}).then(response => {
  return response.json();
}).then(data => {
  console.log(data);
}).catch(error => {
  console.error('Error:', error);
});

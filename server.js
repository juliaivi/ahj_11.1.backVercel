import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { faker } from '@faker-js/faker';
import * as crypto from "crypto";

const port = process.env.PORT || 3000; //есть ли переменная порта, если есть то забираем, если нет поумолчанию будет 3000
const app = express();  // экземпляр нашего приложения

app.use(cors());
app.use(
    bodyParser.json({ // считывать данные json
      type(req) {  //type Параметр используется для определения типа носителя, который будет обрабатываться промежуточным программным обеспечением. Этот параметр может быть строкой, массивом строк или функцией
        return true;
      },
    })
);
app.use((req, res, next) => { //req - отвечает за запрос с браузера, res - за ответ
    res.setHeader('Content-Type', 'application/json'); // Метод response.setHeader (имя, значение) (добавлен в версии 0.4.0) представляет собой встроенный интерфейс прикладного программирования модуля ‘http‘, который устанавливает единственное значение заголовка для неявных заголовков. Если этот заголовок уже существует в заголовках, подлежащих отправке, его значение будет заменено. Используйте массив строк здесь, чтобы отправить несколько заголовков с одинаковым именем. Нестроковые значения будут сохранены без изменений. Следовательно, response.getHeader() может возвращать нестроковые значения.
    next();
});


app.get('/messages/unread', async (req, res) => {// url - '/messages/unread'
    messages.messages.push(createMessage());
    res.send(JSON.stringify(messages));
})

const messages = {
    status: "ok",
    timestamp: 1553400000,
    messages: [
      {
        id: crypto.randomUUID(),
        from: "anya@ivanova",
        subject: "Hello from Anya",
        body: "Long message body here" ,
        received: 1553108200
      },
      {
        id: crypto.randomUUID(),
        from: "alex@petrov",
        subject: "Hello from Alex Petrov!",
        body: "Long message body here",
        received: 1553107200
      },
    ]
}

function createMessage() {
    return {
      id: crypto.randomUUID(),
      from: faker.internet.email(),
      subject: `Hello from ${faker.internet.userName()}!`,
      body:  faker.lorem.paragraph(),
      received: new Date(),
    }
}

const bootstrap = async () => { 
  try {
    app.listen(port, () =>  // слушает  app
        console.log(`Server has been started on http://localhost:${port}`) // в консоль выводит сообщение Сервер запущен и указывает порт
    );
  } catch (error) {
    console.error(error);
  }
};

bootstrap(); 


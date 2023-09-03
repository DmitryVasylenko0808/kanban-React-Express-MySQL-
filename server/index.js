const express = require('express');
const cors = require('cors');
const config = require('./config');
const DataBase = require('./db');
const usersRoutes = require('./routes/users');
const boardsRoutes = require('./routes/boards');
const tasksRoutes = require('./routes/tasks');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/boards', boardsRoutes);
app.use('/api/tasks', tasksRoutes);

(async () => {
    try {
        await DataBase.connect(config.db);
        console.log('DB OK');

        app.listen(config.PORT, () => {
            console.log(`SERVER OK. Port: ${config.PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
})();

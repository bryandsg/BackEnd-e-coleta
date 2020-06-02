import express from 'express';

const app = express();

app.get('/users', (request, response) => {
    return response.json([
        'Bryan',
        'Diego',
        'Renan',
        'Lucigray',
        'Reginaldo'
    ]);
});

app.listen(3333);
//
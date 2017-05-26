const PORT = process.env.PORT || 8080;
const express = require('express');
const app  = express();

app.use(express.static(`${__dirname}/public`));

app.listen(PORT, () => console.log(`Server is up on ${PORT}`));

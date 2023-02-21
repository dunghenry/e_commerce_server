const express = require('express');
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv');
const compression = require('compression');
dotenv.config();
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressWinston = require('express-winston');
const { logger } = require('./helpers/logger');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const connectDB = require('./configs/connectdb');
const routes = require('./routes');
const port = 4000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('combined'));
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(
    expressWinston.logger({
        winstonInstance: logger,
        statusLevels: true,
    }),
);

connectDB();
routes(app);
app.get(
    '/',
    asyncHandler((req, res) => {
        return res.status(200).json({ message: 'Welcome to the server' });
    }),
);
//middleware handler error route
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
    console.log('Server running on http://localhost:%d', port);
});

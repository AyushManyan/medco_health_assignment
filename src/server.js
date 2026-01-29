const express = require('express');
require('./config/db');

const doctorRoutes = require('./routes/doctorRoutes');
const tokenRoutes = require('./routes/tokenRoutes');


const app = express();
app.use(express.json());

app.use('/api/v1/doctors', doctorRoutes);
app.use('/api/v1/tokens', tokenRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
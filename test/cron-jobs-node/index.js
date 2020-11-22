const cron = require('node-cron');
const express = require('express');

let app = express();

cron.schedule('* * * * *', function() {
  console.log('running a task every minute');
});

app.listen(3000, () => console.log(`server running on http://localhost:3000`));
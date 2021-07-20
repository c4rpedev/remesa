//Install express server
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/buttymanager'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/buttymanager/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
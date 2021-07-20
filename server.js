//Install express server
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());


const whitelist = ['https://buttymanager.herokuapp.com']; // list of allow domain

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }

        if (whitelist.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}
app.use(cors(corsOptions));
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/buttymanager'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/buttymanager/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
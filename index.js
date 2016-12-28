var express    = require('express');
var app        = express();     

var cors = require('cors');
var _ = require('lodash');

var data = require('./data.js');
var bodyParser = require('body-parser');
var uuid = require('node-uuid');

var users = data.users;
var songs = data.songs;
var favorites = data.favorites;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/dist", express.static(__dirname + '/dist'));

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

app.get('/', function(req, res){
    res.sendfile('index.html', { root: __dirname } );
});

/*
 *  GET ALL USERS FROM BD
 */

router.get('/users', function(req, res) {
    res.statusCode = 200;
	res.send(users);
});

/*
 *  GET A USER FROM BD
 */

router.get('/users/:id', function(req, res) {
    var user = _.filter(users, function(o){
    	return o.id == req.params.id;
    });
    
    if(user.length > 0){
    	res.statusCode = 200;
    }
    else{
		res.statusCode = 204;
    }
    res.send(user)
    
});

/*
 *  CREATE USER
 */

router.post('/users', function(req, res, next) {
    if(!('username' in req.body) || !('email' in req.body)){
    	res.statusCode = 400;
    	var statusMessage = "No username or email defined.";
    } else {
        var exists = _.find(users, function(user) {
            return user.email === req.body.email && user.username === req.body.username;
        });
        if(exists) {
            var statusMessage = "User " + req.body.email + " logged in with success!";
            res.statusCode = 200;
            var favs = getUserFavorites(exists.id);
            var favsIDs = [];

            for( index in favs ) {
                favsIDs.push(favs[index].musicid);
            }

            res.send({message: statusMessage , 
                body: {
                        id: exists.id,
                        username: exists.username,
                        email: exists.email,
                        favorites: favsIDs
                    }
                });
        } else {
            var newuser = req.body;
    	    newuser.id = uuid.v4();
    	    users.push(newuser);
    	    res.statusCode = 200;
    	    var statusMessage = "User " + req.body.email + " added with success!";
            res.send({message: statusMessage , body: newuser});
        }
    }
});
/*
router.post('/users', function(req, res, next) {
    if(!('username' in req.body) || !('email' in req.body)){
    	res.statusCode = 400;
    	var statusMessage = "No username or email defined.";
    }
    else{
    	var newuser = req.body;
    	newuser.id = uuid.v4();
    	users.push(newuser);
    	res.statusCode = 200;
    	var statusMessage = "User " + req.body.email + " added with success!";
    }
    res.send({message: statusMessage, body: newuser});
});
*/


/*
 *  DELETE USER
 */

router.delete('/users/:id', function(req, res) {
    var index = _.findIndex(users, function(o){
    	return o.id == req.params.id;
    })

    if(index != -1){
    	_.pullAt(users, index);
    	res.statusCode = 410;
    	res.send({"message":"User deleted"})
    }else{
    	res.statusCode = 404;
    	res.send({"message":"User was not found"})
    }

});

/*l
 * USE CASES FOR SONGS
 */



/*
 *  GET ALL SONGS FROM BD
 */

router.get('/songs', function(req, res) {
    res.statusCode = 200;
	res.send(songs);
});

/*
 *  GET A SONG FROM BD
 */

router.get('/songs/:id', function(req, res) {
    var music = _.filter(songs, function(o){
    	return o.id == req.params.id;
    });
    
    if(music.length > 0){
    	res.statusCode = 200;
    }
    else{
		res.statusCode = 204;
    }
    res.send(music);
    
});

/*
 *  CREATE SONG
 */

router.post('/songs', function(req, res, next) {
    if(!('track' in req.body) || !('album' in req.body) || !('artist' in req.body)){
    	res.statusCode = 400;
    	var statusMessage = "No track, album or artist variables are defined.";
    	res.send({message: statusMessage});
    }
    else{
    	var newmusic = req.body;
    	newmusic.id = uuid.v4();
    	songs.push(newmusic);

    	res.statusCode = 200;
    	var statusMessage = "Song added with success!";
    	res.send({message: statusMessage, body: newmusic});
    }
    
});


/*
 *  DELETE SONG
 */

router.delete('/songs/:id', function(req, res) {
 	var index = _.findIndex(songs, function(o){
    	return o.id == req.params.id;
    })
    if(index != -1){
    	_.pullAt(songs, index);
    	res.statusCode = 410;
    	res.send({"message":"Song deleted"})
    }else{
    	res.statusCode = 404;
    	res.send({"message":"Song was not found"})
    }
});


/*
 * USE CASES FOR FAVORITES
 */

/*
 * GET FAVORITES FROM A USER
 */

router.get('/users/:userid/songs', function(req, res, next) {

    var musicids = getUserFavorites(req.params.userid);

    if(musicids.length == 0){
    	res.statusCode = 204;
    	res.send({body: usersongs})
    }else{
        var usersongs = [];

        for(id in musicids){
            var music = _.find(songs, function(o){
                return o.id == musicids[id].musicid;
            }); 
            
            usersongs.push(music);
        }
        
        res.statusCode = 200;
        res.send(usersongs);  
        
    }

});


/*
 *  CREATE FAVORITE
 */

router.post('/users/:userid/songs/', function(req, res, next) {
    var requserid = req.params.userid;
    var reqmusicid = req.body.musicid;

    var usermatch = _.find(users, function(o){
        return o.id == requserid;
    });

    var musicmatch = _.find(songs, function(o){
        return o.id == reqmusicid;
    });

    var match = _.find(favorites, function(o){
        return (o.userid == req.params.userid && o.musicid == req.body.musicid)
    });

    if(!usermatch){
        res.statusCode = 400;
        res.send({"message":"User does not exist"});
    }
    else if(!musicmatch){
        res.statusCode = 400;
        res.send({"message":"Music does not exist"});   
    }
    else if(!match){
        var newfavorite = {
            userid: req.params.userid,
            musicid: req.body.musicid
        }

        favorites.push(newfavorite);
        res.statusCode = 200;
        res.send({"message":"Added favorite"});
    }
    else{
        res.statusCode = 409;
        res.send({"message":"User already has that favorite"});
    }
});


/*
 *  DELETE FAVORITE
 */

router.delete('/users/:userid/songs/:musicid', function(req, res) {
 	var requserid = req.params.userid;
    var reqmusicid = req.params.musicid;

    var index = _.findIndex(favorites, function(o){
        return (o.userid == requserid && o.musicid == reqmusicid);
    })

    if(index != -1){
        _.pullAt(favorites, index);
        res.statusCode = 200;
        res.send({"message":"Deleted with success!"});
    }
    else{
        res.statusCode = 404;
        res.send({"message":"Match not found!"});   
    }
});


function getUserFavorites(userid) {
    var musicids = _.filter(favorites, function(o){
		return o.userid == userid;
    });

    return musicids;
}

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);

console.log("Server Listening : http://localhost:" + port + "/api");
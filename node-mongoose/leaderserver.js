var mongoose = require('mongoose'),
    assert = require('assert');

var Leadership = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new LeaderShip
    Leadership.create({
        name: 'dsss',
        image: 'imageds/uthapizza.png',
        designation: 'Chdief Finance Officer',
        abbr: 'CFdO',
        description: 'Tdest',
    }, function (err, leader) {
        if (err) throw err;
        console.log('LeaderShip created!');
        console.log(leader);

        var id = leader._id;

        // get all the LeaderShip
        setTimeout(function () {
            Leadership.findByIdAndUpdate(id, {
                    $set: {
                        description: 'Updated CFO Test'
                    }
                }, {
                    new: true
                })
                .exec(function (err, leader) {
                    if (err) throw err;
                    console.log('Updated LeaderShip!');
                    console.log(leader);

                    leader.save(function (err, leader) {
                        console.log('Updated LeaderShip!');
                        console.log(leader);

                        db.collection('leadership').drop(function () {
                            db.close();
                        });
                    });
                });
        }, 3000);
    });
});

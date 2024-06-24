/* GET Rooms page */
exports.rooms = function(req, res) {
    res.render('rooms', {title: 'Rooms'})
};

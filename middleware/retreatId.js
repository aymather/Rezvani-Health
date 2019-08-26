module.exports = retreatId = (req, res, next) => {

    var retreat_id = req.headers['retreat_id'];
    if(!retreat_id) res.status(400).json({ msg: "No retreat ID." });

    req.retreat_id = retreat_id;
    next();
}
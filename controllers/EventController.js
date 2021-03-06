import Event from "../models/EventModel.js";
import utils from "../utils.js";

// TODO: Either this is only for testing and should never be exposed to the end
// user, or it should be removed as it would probably never be useful.
function getAllEventLists(_req, res) {
    res.json(Event.findAll());
}

function getOwnerEventList(req, res) {
    const requestingUser = req.header("User-Name");
    // TODO: Throws an error "Event.findByOwner is not a function". Why?
    //if(utils.validateToken(req) && utils.validateOwner(req, req.params.user)) {
    if(utils.validateToken(req)) {
        res.json(Event.findByOwner(requestingUser));
    } else {
        res.status(403);
        const responseObject = {
            message: "Sorry, the requested resource could not be retrieved.",
            reason: "Access denied"
        };
        res.json(responseObject);
    }
}

function updateEventList(req, res) {
    if(utils.validateToken(req)) {
        Event.updateEventList(req.body, req.header("User-Name"));
    }
    res.json({message: `Updated event board of user: ${req.header("User-Name")}.`});
}

export default {getAllEventLists, getOwnerEventList, updateEventList};

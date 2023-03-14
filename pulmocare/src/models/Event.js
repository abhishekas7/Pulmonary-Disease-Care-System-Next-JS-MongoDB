const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Eventschema = new Schema({
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
  title: {
    type: String, 
  },
});

module.exports = Event = mongoose.model("Event", Eventschema);

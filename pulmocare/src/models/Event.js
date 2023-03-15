import { Schema, mongoose } from 'mongoose';

const eventSchema = new Schema({
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

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
export default Event;
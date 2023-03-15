import db from "@/util/db";
import Event from "@/models/Event";
import moment from "moment";

export default async function handler(req, res) {
    db.connect();
  const events = await Event.find();

  const events = await Event.find({start:{$gte: moment(req.query.start).toDate()},
  end:{$lte: moment(req.query.end).toDate()}});

  console.log(moment(req.query.start).toDate());
  res.send(events);
db.disconnect();
}
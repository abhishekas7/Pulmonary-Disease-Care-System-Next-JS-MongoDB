import db from "@/util/db";
import Event from "@/models/Event";

export default async function handler(req, res) {
    db.connect();
  const event = Event(req.body);
  await event.save();
  res.send(event);
  return res.json({ message: 'Event Added Sucessfully'});
}
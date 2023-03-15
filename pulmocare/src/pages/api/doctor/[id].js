import db from "@/util/db";
import Doctor from "@/models/Doctor";

export default async function handler(req, res) {
    await db.connect();
    const { id } = req.query;
    const doctor = await Doctor.findOne({ _id: id });
    res.status(200).json(doctor);
}
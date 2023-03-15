import db from '@/util/db';
import Doctor from '@/models/Doctor';

export default async function handler(req, res) {
    await db.connect();
    try {
        const Doctors = await Doctor.find(); // Find all Doctors in the database
        res.send(Doctors)
        // Render the Doctor list view and pass in the Doctors as a variable
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
    db.disconnect();
}
export default async function handler(req, res) {
    const session = await getSession({ req });
   
  
    if (!session) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
  
    if (req.method === 'GET') {
      const { doctorId } = req.query;
       
   
      const doctor = await prisma.doctor.findUnique({
        where: { id: Number(doctorId) },
        include: { patients: true }
      });
   console.log('dd');
  
    //   if (!doctor) {
    //     res.status(404).json({ message: 'Doctor not found' });
    //     return;
    //   }
  
    //   const patients = doctor.patients;
  
    //   res.status(200).json(patients);
    // } else {
    //   res.status(405).json({ message: 'Method not allowed' });
    // }
  }
  
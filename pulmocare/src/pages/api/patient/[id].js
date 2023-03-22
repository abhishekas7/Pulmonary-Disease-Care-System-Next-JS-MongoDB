export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        // make API call to fetch user details using the id parameter
        // update initialValues with fetched values
        // handle any errors
        res.status(200).json({ message: 'User details fetched successfully!' });
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user details' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
    

const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

export default async function handler(req, res) {
  console.log('hlo');
  const text = req.body.text;
  const tokens = tokenizer.tokenize(text);

  // Define regular expressions to match medical terms
  const dosageRegex = /[0-9]+(mg|g)/;
  const patientNameRegex = /[A-Z][a-z]+\s[A-Z][a-z]+/;
  const medicineRegex = /([A-Z][a-z]+\s?){1,2}/;
  const durationRegex = /[0-9]+\s(days|weeks|months)/;

  // Initialize the extracted terms
  let dosage = null;
  let patientName = null;
  let medicine = null;
  let duration = null;

  // Loop through the tokens and match against the regular expressions
  for (let i = 0; i < tokens.length; i++) {
    if (dosageRegex.test(tokens[i])) {
      dosage = tokens[i];
    } else if (patientNameRegex.test(tokens[i])) {
      patientName = tokens[i];
    } else if (medicineRegex.test(tokens[i])) {
      medicine = tokens[i];
    } else if (durationRegex.test(tokens[i])) {
      duration = tokens[i];
    }
  }

  // Send the extracted terms back to the client
  res.json({
    dosage,
    patientName,
    medicine,
    duration
  });


console.log(text);
}
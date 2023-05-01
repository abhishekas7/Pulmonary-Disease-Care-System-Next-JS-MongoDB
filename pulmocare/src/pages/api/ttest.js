import fetch from 'node-fetch';


export default async function handler(req, res) {

  const { payload } = req.body;
  console.log(payload);
  

  const data = {
    "inputs": payload
  };

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/kormilitzin/en_core_med7_lg",
      {
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

import fetch from 'node-fetch';

export default async function handler(req, res) {
  const data = {
    "inputs": "John doe age 23 paracetamol 20g ,dolo 1  two days twic"
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
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

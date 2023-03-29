import spacy from 'spacy'

export default async function handler(req, res) {
  

    const nlp = await spacy.load('en_core_web_sm');
    const doc = await nlp('This is some sample text.');
    const tokens = doc.tokens.map(token => token.text);
    console.log(tokens);
    // res.send(tokens)
}
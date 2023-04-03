import natural from 'natural'

export default async function handler(req, res) {

    const sen = 'The quick brown fox jumps over the lazy dog'
    var Analyzer = natural.SentimentAnalyzer;
    var stemmer = natural.PorterStemmer;
    var analyzer = new Analyzer("English", stemmer, "afinn");
    
    // getSentiment expects an array of strings
    console.log(analyzer.getSentiment(["I", "don't", "want", "to", "play", "with", "you"]));
  res.send('ddfd')
}
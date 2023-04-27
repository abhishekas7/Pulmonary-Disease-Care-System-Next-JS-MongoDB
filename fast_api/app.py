import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
nltk.download("stopwords")
nltk.download('maxent_ne_chunker')
nltk.download('words')
from nltk.chunk import ne_chunk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# download the i2b2 NER model
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('maxent_ne_chunker')
nltk.download('words')
nltk.download('i2b2_ner')

# load the i2b2 NER chunker

example_string = """
Chakko age 43 paracetamol 200 g 2 days twice"""
sentence = sent_tokenize(example_string)

word = word_tokenize(example_string)
words_in_quote = word_tokenize(example_string)
post_tag = nltk.pos_tag(words_in_quote)
print(post_tag)
from sklearn.decomposition import TruncatedSVD
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.pipeline import make_pipeline
from sklearn.naive_bayes import MultinomialNB

# Load the text document and split it into sentences
document = "This is a sample document. It contains multiple sentences. We will perform text classification on each sentence."
sentences = document.split(".")

# Define the labels for each sentence
labels = ["Sample", "Multiple", "Classification"]

# Vectorize the sentences using a bag-of-words approach
vectorizer = CountVectorizer(stop_words="english")
X = vectorizer.fit_transform(sentences)

# Apply SVD to reduce the dimensionality of the data
svd = TruncatedSVD(n_components=2)
X_svd = svd.fit_transform(X)

# Train a Naive Bayes classifier on the transformed data
clf = make_pipeline(svd, MultinomialNB())
clf.fit(X, labels)

# Test the classifier on a new sentence
new_sentence = "This is a new sentence for testing."
new_X = vectorizer.transform([new_sentence])
predicted_label = clf.predict(new_X)[0]

# Print the predicted label for the new sentence
print("Predicted label for the new sentence:", predicted_label)

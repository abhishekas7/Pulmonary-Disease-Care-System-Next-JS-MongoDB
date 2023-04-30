from spacy.tokens import Doc, Span, Token

fruits = ["apple", "pear", "banana", "orange", "strawberry"]
is_fruit_getter = lambda token: token.text in fruits
has_fruit_getter = lambda obj: any([t.text in fruits for t in obj])

Token.set_extension("is_fruit", getter=is_fruit_getter)
Doc.set_extension("has_fruit", getter=has_fruit_getter)
Span.set_extension("has_fruit", getter=has_fruit_getter)
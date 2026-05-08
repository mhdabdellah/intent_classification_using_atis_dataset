from __future__ import annotations

from functools import lru_cache
from pathlib import Path
from typing import Any, Dict, List

import joblib


@lru_cache(maxsize=1)
def load_models():
    """
    Load ML artifacts once per process from the repo's `models/` folder.
    """
    repo_root = Path(__file__).resolve().parent.parent  # .../intent_classification_using_atis_dataset/
    model_dir = repo_root / "models"

    expected_files = ["label_encoder.pkl", "vectorizer.pkl", "clf_model.pkl"]
    for model_file in expected_files:
        model_path = model_dir / model_file
        if not model_path.exists():
            raise FileNotFoundError(
                f"Model artifact not found: {model_path}. "
                "Ensure the repository's models/ folder contains the trained artifacts."
            )

    print(f"Loading models from: {model_dir}")
    le = joblib.load(model_dir / "label_encoder.pkl")  # Saved LabelEncoder
    vectorizer = joblib.load(model_dir / "vectorizer.pkl")  # Saved TF-IDF
    clf = joblib.load(model_dir / "clf_model.pkl")  # Saved classifier

    print(f"Models loaded successfully:")
    print(f"  Label encoder classes: {le.classes_}")
    print(f"  Vectorizer vocabulary size: {len(vectorizer.vocabulary_)}")
    print(f"  Classifier: {type(clf).__name__}")

    return le, vectorizer, clf


def predict_intent(texts: List[str], label_encoder: LabelEncoder, vectorizer: TfidfVectorizer, classifier_model: LogisticRegression) -> List[Dict[str, Any]]:
    if not texts:
        print("error: No text provided")
        return []

    print(f"Predicting intents for {len(texts)} texts: {texts}")

    # Transform text
    X = vectorizer.transform(texts)
    print(f"Vectorized shape: {X.shape}")

    # Predict
    preds = classifier_model.predict(X)
    print(f"Raw predictions: {preds}")

    # Decode
    decoded_preds = label_encoder.inverse_transform(preds)
    print(f"Decoded predictions: {decoded_preds}")

    # Return results
    results = [{"text": t, "predicted_intent": p} for t, p in zip(texts, decoded_preds)]
    print(f"Final results: {results}")
    return results


# Backwards-compatible alias for any older code paths.
def predict_intents(texts: List[str], label_encoder: LabelEncoder, vectorizer: TfidfVectorizer, classifier_model: LogisticRegression) -> List[str]:
    results = predict_intent(texts, label_encoder, vectorizer, classifier_model)
    return [str(r["predicted_intent"]) for r in results]


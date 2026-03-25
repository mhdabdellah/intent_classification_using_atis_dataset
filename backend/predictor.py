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

    le = joblib.load(model_dir / "label_encoder.pkl")  # Saved LabelEncoder
    vectorizer = joblib.load(model_dir / "vectorizer.pkl")  # Saved TF-IDF
    clf = joblib.load(model_dir / "clf_model.pkl")  # Saved classifier
    return le, vectorizer, clf


def predict_intent(texts: List[str], label_encoder: LabelEncoder, vectorizer: TfidfVectorizer, classifier_model: LogisticRegression) -> List[Dict[str, Any]]:
    if not texts:
        print("error: No text provided")
        return []

    # le, vectorizer, clf = load_models()

    # Transform text
    X = vectorizer.transform(texts)

    # Predict
    preds = classifier_model.predict(X)

    # Decode
    decoded_preds = label_encoder.inverse_transform(preds)

    # Return results
    results = [{"text": t, "predicted_intent": p} for t, p in zip(texts, decoded_preds)]
    return results


# Backwards-compatible alias for any older code paths.
def predict_intents(texts: List[str], label_encoder: LabelEncoder, vectorizer: TfidfVectorizer, classifier_model: LogisticRegression) -> List[str]:
    results = predict_intent(texts, label_encoder, vectorizer, classifier_model)
    return [str(r["predicted_intent"]) for r in results]


from __future__ import annotations

import os

from flask import Flask, jsonify, request
from flask_cors import CORS

from predictor import predict_intent, load_models


def create_app() -> Flask:
    app = Flask(__name__)

    # For local dev, allow all origins. Tighten this for production.
    CORS(app, resources={r"/api/*": {"origins": "*"}})


    label_encoder, vectorizer, classifier_model = load_models()

    print(f"label_encoder: {label_encoder}")
    print(f"vectorizer: {vectorizer}")
    print(f"classifier_model: {classifier_model}")

    print(f"label_encoder.classes_: {label_encoder.classes_}")




    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok"})

    @app.post("/api/predict")
    def predict():
        payload = request.get_json(silent=True) or {}
        text = payload.get("text")

        print(f"text: {text}")

        if not isinstance(text, str) or not text.strip():
            return jsonify({"error": "`text` must be a non-empty string"}), 400

        results = predict_intent([text.strip()], label_encoder, vectorizer, classifier_model)
        
        print(f"results: {results}")

        predicted = results[0]["predicted_intent"] if results else None
        return jsonify({"text": text.strip(), "predicted_intent": predicted})

    @app.post("/api/predict-batch")
    def predict_batch():
        payload = request.get_json(silent=True) or {}
        texts = payload.get("texts", None)

        if not isinstance(texts, list) or not texts:
            return jsonify({"error": "`texts` must be a non-empty list of strings"}), 400
        if not all(isinstance(t, str) and t.strip() for t in texts):
            return jsonify({"error": "Each item in `texts` must be a non-empty string"}), 400

        cleaned = [t.strip() for t in texts]
        results = predict_intent(cleaned, label_encoder, vectorizer, classifier_model)
        predicted_intents = [r["predicted_intent"] for r in results]
        return jsonify({"texts": cleaned, "predicted_intents": predicted_intents})

    return app


app = create_app()


if __name__ == "__main__":
    # Local development only
    port = int(os.environ.get("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=True)

from __future__ import annotations

import os

from flask import Flask, jsonify, request
from flask_cors import CORS

from predictor import predict_intent, load_models


def create_app() -> Flask:
    app = Flask(__name__)
    app.config["JSONIFY_PRETTYPRINT_REGULAR"] = False

    # For local dev, allow all origins. Tighten this for production.
    CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)
    print("CORS enabled for /api/* routes")

    try:
        label_encoder, vectorizer, classifier_model = load_models()
    except Exception as exc:
        app.logger.exception("Failed to load model artifacts")
        raise RuntimeError("Model loading failed. Check that models are present in the repository's models/ folder.") from exc

    print(f"Flask app initialized successfully")
    print(f"Available routes: {[rule.rule for rule in app.url_map.iter_rules()]}")

    @app.before_request
    def log_request_info():
        print(f"Incoming request: {request.method} {request.url}")
        if request.is_json:
            print(f"Request JSON: {request.get_json(silent=True)}")

    @app.after_request
    def log_response_info(response):
        print(f"Response status: {response.status_code}")
        return response




    @app.get("/api/health")
    def health():
        print("Health check requested")
        return jsonify({"status": "ok"})

    @app.post("/api/predict")
    def predict():
        payload = request.get_json(silent=True) or {}
        text = payload.get("text")

        print(f"Predict request received: {payload}")
        print(f"Text to predict: {text}")

        if not isinstance(text, str) or not text.strip():
            print("Invalid text input")
            return jsonify({"error": "`text` must be a non-empty string"}), 400

        results = predict_intent([text.strip()], label_encoder, vectorizer, classifier_model)
        
        print(f"Prediction results: {results}")

        predicted = results[0]["predicted_intent"] if results else None
        response_data = {"text": text.strip(), "predicted_intent": predicted}
        print(f"Sending response: {response_data}")
        return jsonify(response_data)

    @app.post("/api/predict-batch")
    def predict_batch():
        payload = request.get_json(silent=True) or {}
        texts = payload.get("texts", None)

        print(f"Batch predict request received: {payload}")
        print(f"Texts to predict: {texts}")

        if not isinstance(texts, list) or not texts:
            print("Invalid texts input")
            return jsonify({"error": "`texts` must be a non-empty list of strings"}), 400
        if not all(isinstance(t, str) and t.strip() for t in texts):
            print("Invalid text items in list")
            return jsonify({"error": "Each item in `texts` must be a non-empty string"}), 400

        cleaned = [t.strip() for t in texts]
        results = predict_intent(cleaned, label_encoder, vectorizer, classifier_model)
        predicted_intents = [r["predicted_intent"] for r in results]
        response_data = {"texts": cleaned, "predicted_intents": predicted_intents}
        print(f"Batch prediction results: {results}")
        print(f"Sending batch response: {response_data}")
        return jsonify(response_data)

    @app.errorhandler(Exception)
    def handle_exception(error):
        app.logger.exception("Unhandled exception")
        print(f"Unhandled exception: {error}")
        response = {"error": "Internal server error"}
        if app.debug:
            response["details"] = str(error)
        return jsonify(response), 500

    @app.before_request
    def log_request_info():
        print(f"Incoming request: {request.method} {request.url}")
        if request.is_json:
            print(f"Request JSON: {request.get_json(silent=True)}")

    @app.after_request
    def log_response_info(response):
        print(f"Response status: {response.status_code}")
        return response

    return app


app = create_app()


if __name__ == "__main__":
    # Local development only
    port = int(os.environ.get("PORT", "8000"))
    print(f"Starting Flask app on port {port}")
    print(f"API will be available at http://127.0.0.1:{port}")
    app.run(host="0.0.0.0", port=port, debug=True)

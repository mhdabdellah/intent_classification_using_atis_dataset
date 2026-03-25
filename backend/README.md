# Intent Classification API (Flask)

This backend exposes:

- `GET /api/health`
- `POST /api/predict` with body: `{ "text": "..." }`
- `POST /api/predict-batch` with body: `{ "texts": ["...", "..."] }`

The API loads these artifacts once at startup:

- `models/label_encoder.pkl`
- `models/vectorizer.pkl`
- `models/clf_model.pkl`

## Run locally

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

Optional (production):

```bash
gunicorn -w 2 -b 0.0.0.0:5000 wsgi:application
```


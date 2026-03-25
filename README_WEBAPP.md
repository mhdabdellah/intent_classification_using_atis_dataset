# Intent Classification Web App (Flask + Next.js)

This repo contains your trained model artifacts in `models/`:

- `label_encoder.pkl`
- `vectorizer.pkl`
- `clf_model.pkl`

## 1) Run the Flask API

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

Health check:
`http://localhost:5000/api/health`

Predict:
`POST http://localhost:5000/api/predict` with JSON:
`{ "text": "i need flights that arrive in baltimore from ankara" }`

## 2) Run the Next.js frontend

```bash
cd frontend
npm install
npm run dev
```

Configure the API URL:
Copy `frontend/.env.local.example` to `frontend/.env.local`, then ensure:
`NEXT_PUBLIC_API_URL=http://localhost:5000`

Open:
`http://localhost:3000`


## 👤 Author

Mohamed Abdellahi Sidi Mohamed Blal


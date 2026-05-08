# Intent Classification Using the ATIS Dataset

## 📌 Project Overview

This project focuses on **intent classification** in Natural Language Understanding (NLU) using the **ATIS (Airline Travel Information System) dataset**.

The goal is to compare the performance of multiple **machine learning classifiers** in predicting user intent from text queries related to airline travel.

---

## 🎯 Objectives

* Implement and evaluate multiple machine learning models for intent classification
* Compare model performance using standard evaluation metrics
* Identify the most effective classifier for the ATIS dataset

---

## 📊 Dataset

* **Name:** ATIS (Airline Travel Information System)
* **Domain:** Airline travel queries
* **Task:** Intent classification

The dataset contains user queries such as flight bookings, airline information, and travel-related questions.

---

## ⚙️ Methodology

1. **Data Preprocessing**

   * Text cleaning
   * Tokenization
   * Vectorization (e.g., TF-IDF)

2. **Model Training**

   * Train the Logistic Regression classifier on the training dataset
   * Test the Logistic Regression classifier on the test dataset

3. **Evaluation**

   * Accuracy
   * Precision
   * Recall
   * F1-score

4. **Comparison**

   * Performance comparison across all models

---

## 🛠️ Technologies

* Python
* Scikit-learn
* Pandas
* NumPy
* Matplotlib / Seaborn

---

## 📂 Project Structure

```
├── intent_classification_using_atis_dataset.ipynb
├── ATIS_TF-IDF_Logistic_Regression_vs_LLaMA_Gemma_Phi3_Comparison.ipynb
├── intent_classification_using_atis_dataset (2).ipynb
├── Using In-Context Learning with LLaMA, Gemma and Phi-3 for ATIS Intent Classification.ipynb
├── Ml_papers => literature review papers
├── README.md
├── backend/
├── frontend/
└── models/
```

---

## 📓 Notebooks Overview

### **1. ATIS_TF-IDF_Logistic_Regression_vs_LLaMA_Gemma_Phi3_Comparison.ipynb**
This notebook provides a comprehensive comparison between traditional machine learning approaches and state-of-the-art large language models for intent classification on the ATIS dataset.

**Key Features:**
- **TF-IDF + Logistic Regression**: A baseline traditional ML approach using TF-IDF vectorization with Logistic Regression classifier
- **Large Language Models Comparison**: Evaluation and comparison of LLaMA, Gemma, and Phi-3 models for intent classification
- **Performance Metrics**: Detailed comparison of accuracy, F1-scores, and other evaluation metrics
- **Inference Speed**: Analysis of inference time and computational efficiency
- **Intent Mapping**: Supports 17 different intent categories from the ATIS dataset

**Technologies Used:**
- Scikit-learn (for TF-IDF and Logistic Regression)
- Unsloth (for efficient LLM fine-tuning)
- Hugging Face Datasets
- PyTorch
- GPU acceleration support

### **2. intent_classification_using_atis_dataset.ipynb**
The main notebook implementing traditional machine learning approaches for ATIS intent classification using TF-IDF vectorization and Logistic Regression.

### **3. Other Notebooks**
Additional notebooks exploring different approaches and techniques for intent classification using the ATIS dataset.

---

## 🚀 How to Run

1. Clone the repository:

```
git clone https://github.com/mhdabdellah/intent_classification_using_atis_dataset.git
```

2. Install dependencies:

```
pip install -r requirements.txt
```

3. Run the notebook:

```
jupyter notebook
```
---

## 📜 License

This project is for educational and research purposes.

---

## 👤 Author

Mohamed Abdellahi Sidi Mohamed Blal

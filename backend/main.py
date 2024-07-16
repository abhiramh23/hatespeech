from fastapi import FastAPI, HTTPException
import joblib
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

app = FastAPI()

# Download NLTK resources
nltk.download("stopwords", quiet=True)
nltk.download("wordnet", quiet=True)
nltk.download("omw-1.4", quiet=True)

# Load the trained model
model = joblib.load("best_hate_speech_model.pkl")


def clean_text(text):
    stop_words = set(stopwords.words("english"))
    lemmatizer = WordNetLemmatizer()

    text = str(text).lower()
    text = re.sub(r"https?://\S+|www\.\S+", "", text)
    text = re.sub(r"<.*?>", "", text)
    text = re.sub(r"[^a-zA-Z\s]", "", text)

    tokens = text.split()
    tokens = [lemmatizer.lemmatize(word) for word in tokens if word not in stop_words]

    return " ".join(tokens)


@app.get("/")
async def read_root():
    return {"message": "Hate Speech Classification API"}


@app.get("/classify")
async def classify_text(text: str):
    if not text.strip():
        raise HTTPException(status_code=400, detail="Input text cannot be empty")

    try:
        cleaned_text = clean_text(text)
        prediction = model.predict([cleaned_text])[0]
        return {"text": text, "classification": prediction}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error classifying text: {str(e)}")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)

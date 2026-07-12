import io
import pytesseract
from PIL import Image

# If tesseract is not in your PATH, you may need to specify its location:
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def extract_text_from_image(image_bytes: bytes) -> str:
    """
    Extracts text from an image using Tesseract OCR.
    """
    try:
        image = Image.open(io.BytesIO(image_bytes))
        # Basic preprocessing can be added here if needed
        text = pytesseract.image_to_string(image)
        return text.strip()
    except Exception as e:
        print(f"OCR Error: {e}")
        return ""

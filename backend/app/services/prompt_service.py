import json

def get_base_system_prompt(language: str) -> str:
    return f"""You are SurakshaAI, an expert Financial Safety Assistant for Rural India.
You must analyze the user's input and determine if it is a financial scam, phishing attempt, or safe.
You MUST reply strictly in JSON format. Do not include markdown code blocks like ```json ... ```, just the raw JSON.
All human-readable text in your response MUST be translated to {language}.

Your JSON response must exactly match this schema:
{{
    "risk_level": "Safe" | "Suspicious" | "High Risk",
    "confidence_score": <integer between 0 and 100>,
    "scam_category": "<category name e.g. Phishing, OTP Scam, Loan Scam, Fake UPI, Safe>",
    "summary": "<A 1-2 sentence beginner-friendly summary>",
    "detailed_explanation": "<A clear explanation of why this is safe or a scam, what words triggered suspicion, without using complex technical jargon>",
    "warning_signs": ["<warning 1>", "<warning 2>", ...],
    "recommended_actions": ["<action 1>", "<action 2>", ...],
    "prevention_tips": ["<tip 1>", "<tip 2>", ...],
    "response_language": "{language}"
}}
"""

def get_message_analysis_prompt(message: str, language: str) -> str:
    system_prompt = get_base_system_prompt(language)
    user_prompt = f"Analyze the following SMS/WhatsApp/Telegram message for financial scams:\n\n\"{message}\""
    return system_prompt + "\n\n" + user_prompt

def get_url_analysis_prompt(url: str, language: str) -> str:
    system_prompt = get_base_system_prompt(language)
    user_prompt = f"Analyze the following URL for phishing or fake banking domains:\n\n\"{url}\""
    return system_prompt + "\n\n" + user_prompt

def get_upi_analysis_prompt(upi_text: str, language: str) -> str:
    system_prompt = get_base_system_prompt(language)
    user_prompt = f"Analyze the following UPI request/message for 'Collect Request' scams or fake QR scams:\n\n\"{upi_text}\""
    return system_prompt + "\n\n" + user_prompt

def get_loan_analysis_prompt(loan_text: str, language: str) -> str:
    system_prompt = get_base_system_prompt(language)
    user_prompt = f"Analyze the following Loan advertisement/offer for instant approval or processing fee scams:\n\n\"{loan_text}\""
    return system_prompt + "\n\n" + user_prompt

def get_image_analysis_prompt(extracted_text: str, language: str) -> str:
    system_prompt = get_base_system_prompt(language)
    user_prompt = f"Analyze the following text extracted from a screenshot for any financial scams, fake payment apps, or phishing:\n\n\"{extracted_text}\""
    return system_prompt + "\n\n" + user_prompt

# FraudX : AI based Advanced Fraud Detection System

## Overview

This Advanced Fraud Detection System is a powerful tool designed to analyze financial transactions and identify potentially fraudulent activities. It uses machine learning algorithms to detect suspicious patterns and provides detailed visualizations for easy interpretation of the results.

## Features

- Upload and analyze CSV files containing transaction data
- Detect suspicious transactions using a pre-trained machine learning model
- Visualize the distribution of suspicious transactions
- Display geographical distribution of suspicious activities
- Show top reasons for suspicion
- Analyze transaction amount vs velocity
- Provide detailed information for each suspicious transaction
- Download suspicious transactions as a CSV file

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/ombaviskar18/advanced-fraud-detection-system.git
   cd advanced-fraud-detection-system
   ```

2. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

## Usage

### Backend

1. Start the Streamlit app:
   ```
   streamlit run app.py
   ```

2. Open your web browser and go to `http://localhost:8501`

3. Upload a CSV file containing transaction data

4. Click on "Detect Suspicious Transactions" to analyze the data

5. Explore the visualizations and detailed information provided

6. Download the suspicious transactions CSV file if needed

### Frontend (Optional)

If you want to run the frontend separately:

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install the required npm packages:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your web browser and go to `http://localhost:3000`

## File Structure

- `app.py`: Main Streamlit application
- `suspicious_by_model.py`: Contains functions for detecting suspicious transactions and explaining suspicion
- `fraud_detection_model.joblib`: Pre-trained machine learning model
- `fraud_detection_scaler.joblib`: Scaler used for data preprocessing
- `feature_importances.joblib`: Feature importances from the trained model
- `requirements.txt`: List of required Python packages
- `frontend/`: Directory containing the React frontend (if applicable)
- 
Thank you,
Made with Love,
By Pioneers 

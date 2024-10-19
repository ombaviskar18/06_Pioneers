import pandas as pd
import numpy as np
import joblib
from sklearn.preprocessing import StandardScaler

def preprocess_data(df, scaler):
    categorical_columns = ['Sender_Country', 'Receiver_Country', 'Payment_Method', 'Transaction_Currency']
    df_encoded = pd.get_dummies(df, columns=categorical_columns)
    
    for col in scaler.feature_names_in_:
        if col not in df_encoded.columns:
            df_encoded[col] = 0
    
    df_encoded = df_encoded[scaler.feature_names_in_]
    
    return df_encoded

def detect_suspicious_transactions(df, model, scaler, threshold=0.5):
    X = preprocess_data(df, scaler)
    X_scaled = scaler.transform(X)
    
    y_pred_proba = model.predict_proba(X_scaled)[:, 1]
    
    df['Suspicion_Score'] = y_pred_proba
    df['Is_Suspicious'] = y_pred_proba > threshold
    
    return df

def explain_suspicion(row, feature_importances, all_transactions, threshold=0.05):
    reasons = []
    all_transactions_avg = all_transactions['Transaction_Amount'].mean()
    all_transactions_velocity_avg = all_transactions['Transaction_Velocity'].mean()
    
    if row['Transaction_Amount'] > all_transactions_avg * 1.5:
        reasons.append(f"High Transaction Amount (${row['Transaction_Amount']:.2f}, {row['Transaction_Amount']/all_transactions_avg:.1f}x average)")
    if row['Transaction_Velocity'] > all_transactions_velocity_avg * 1.5:
        reasons.append(f"High Transaction Velocity ({row['Transaction_Velocity']:.2f}, {row['Transaction_Velocity']/all_transactions_velocity_avg:.1f}x average)")
    if row.get('Unusual_Time', False):
        reasons.append("Unusual Transaction Time")
    if row.get('Multiple_Currency_Conversions', False):
        reasons.append("Multiple Currency Conversions")
    if row['Sender_Country'] != row['Receiver_Country']:
        reasons.append(f"Cross-border Transaction ({row['Sender_Country']} to {row['Receiver_Country']})")
    if row.get('Is_Known_Fraudster', False):
        reasons.append("Known Fraudster Involved")
    if row.get('VPN_Used', False):
        reasons.append("VPN Used")
    if row.get('IP_Address_Change', False):
        reasons.append("IP Address Change")
    
    comparison = {
        'current_amount': row['Transaction_Amount'],
        'avg_amount': all_transactions_avg,
        'amount_diff_percent': ((row['Transaction_Amount'] - all_transactions_avg) / all_transactions_avg) * 100,
        'current_velocity': row['Transaction_Velocity'],
        'avg_velocity': all_transactions_velocity_avg,
        'velocity_diff_percent': ((row['Transaction_Velocity'] - all_transactions_velocity_avg) / all_transactions_velocity_avg) * 100,
    }
    
    return ', '.join(reasons) if reasons else "No specific reason identified", comparison

def generate_summary_report(suspicious_df):
    suspicious_summary = suspicious_df[suspicious_df['Is_Suspicious']].groupby('Suspicion_Reasons').size().reset_index(name='Count')
    suspicious_summary = suspicious_summary.sort_values('Count', ascending=False)

    total_transactions = len(suspicious_df)
    suspicious_transactions = suspicious_df['Is_Suspicious'].sum()

    print(f"Total Transactions: {total_transactions}")
    print(f"Suspicious Transactions: {suspicious_transactions} ({suspicious_transactions/total_transactions:.2%})")
    print("\nTop 10 Suspicion Reasons:")
    print(suspicious_summary.head(10))

    return suspicious_summary

def save_results(suspicious_df, suspicious_summary):
    suspicious_transactions = suspicious_df[suspicious_df['Is_Suspicious']]
    suspicious_transactions.to_csv('new_suspicious_transactions.csv', index=False)
    suspicious_summary.to_csv('new_suspicious_transactions_summary.csv', index=False)

    print("Analysis complete. Results have been saved to CSV files.")
    print(f"Saved {len(suspicious_transactions)} suspicious transactions to new_suspicious_transactions.csv")

def update_model(model, new_transactions, scaler):
    X_new = preprocess_data(new_transactions.drop(['Transaction_ID', 'Date', 'Time', 'Sender_ID', 'Receiver_ID', 'Is_Fraudulent'], axis=1), scaler)
    y_new = new_transactions['Is_Fraudulent']
    
    model.fit(X_new, y_new)
    
    return model

def display_transaction_history(comparison):
    print("Sender's Transaction History (Last 10 transactions):")
    for transaction in comparison['transaction_history']:
        print(f"Date: {transaction['Date']}, Amount: ${transaction['Transaction_Amount']:.2f}, Velocity: {transaction['Transaction_Velocity']:.2f}")
    
    print("\nComparison with Past Transactions")
    print(f"Average Transaction Amount: ${comparison['avg_amount']:.2f}")
    print(f"Current Transaction Amount: ${comparison['current_amount']:.2f}")
    print(f"Difference: {comparison['amount_diff_percent']:.2f}%")
    print(f"\nAverage Transaction Velocity: {comparison['avg_velocity']:.2f}")
    print(f"Current Transaction Velocity: {comparison['current_velocity']:.2f}")
    print(f"Difference: {comparison['velocity_diff_percent']:.2f}%")
import pandas as pd
import joblib
from suspicious_by_model import (
    detect_suspicious_transactions,
    explain_suspicion,
    generate_summary_report,
    save_results,
    update_model,
    display_transaction_history
)

def main():
    # Load the saved model, scaler, and feature importances
    model = joblib.load('fraud_detection_model.joblib')
    scaler = joblib.load('fraud_detection_scaler.joblib')
    feature_importances = joblib.load('feature_importances.joblib')

    # Load all transactions for historical data
    all_transactions = pd.read_csv('transactions.csv')

    # Load the new transactions
    new_transactions = pd.read_csv('new_transactions.csv')

    # Detect suspicious transactions
    suspicious_df = detect_suspicious_transactions(new_transactions, model, scaler)

    # Add suspicion reasons and comparisons
    suspicious_df['Suspicion_Reasons'], suspicious_df['Comparison'] = zip(*suspicious_df.apply(
        lambda row: explain_suspicion(row, feature_importances, all_transactions), axis=1
    ))

    # Generate summary report/
    suspicious_summary = generate_summary_report(suspicious_df)

    # Display detailed information for each suspicious transaction
    for index, row in suspicious_df[suspicious_df['Is_Suspicious']].iterrows():
        print(f"\nSuspicious Transaction ID: {row['Transaction_ID']}")
        print(f"Suspicion Reasons: {row['Suspicion_Reasons']}")
        display_transaction_history(row['Comparison'])

    # Save results
    save_results(suspicious_df, suspicious_summary)

    # Update the model with new data
    updated_model = update_model(model, new_transactions, scaler)

    # Save the updated model
    joblib.dump(updated_model, 'fraud_detection_model_updated.joblib')
    print("Updated model saved as 'fraud_detection_model_updated.joblib'")

if __name__ == "__main__":
    main()
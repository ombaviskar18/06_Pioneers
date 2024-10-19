import streamlit as st
import pandas as pd
import numpy as np
import joblib
import plotly.express as px
import plotly.graph_objects as go
import os
import base64
from suspicious_by_model import detect_suspicious_transactions, explain_suspicion

# Get the current directory and load models
current_dir = os.path.dirname(os.path.abspath(__file__))
model = joblib.load(os.path.join(current_dir, 'fraud_detection_model.joblib'))
scaler = joblib.load(os.path.join(current_dir, 'fraud_detection_scaler.joblib'))
feature_importances = joblib.load(os.path.join(current_dir, 'feature_importances.joblib'))

def get_table_download_link(df):
    csv = df.to_csv(index=False)
    b64 = base64.b64encode(csv.encode()).decode()
    return f'<a href="data:file/csv;base64,{b64}" download="suspicious_transactions.csv" class="download-button">Download CSV File</a>'

def main():
    st.set_page_config(page_title="Advanced Fraud Detection System", page_icon="🚨", layout="wide")

    st.markdown(""" 
    <style>
    body {
        background-color: #0C0C0C; /* Very dark background */
        font-family: 'Arial', sans-serif;
        color: #FFFFFF; /* White text */
    }
    .main-header {
        color: #fff; /* Main header color */
        font-size: 36px; 
        font-weight: bold; 
        text-align: center; 
        margin-bottom: 20px;
    }
    .sub-header {
        color: #ff3131; /* Sub-header color */
        font-size: 28px; 
        font-weight: bold; 
        text-align: center; 
        margin-top: 20px; 
        margin-bottom: 20px;
    }
    .download-button {
        background-color: #ff3131; /* Download button color */
        border: none; 
        color: white; 
        padding: 12px 24px; 
        text-align: center; 
        text-decoration: none; 
        display: inline-block; 
        font-size: 16px; 
        margin: 4px 2px; 
        cursor: pointer; 
        border-radius: 8px;
    }
    .stButton>button {
        background-color: #ff3131; /* Button color */
        color: white;
    }
    .stMetric {
        background-color: #333333; /* Dark gray for metrics */
        padding: 15px; 
        border-radius: 5px; 
        box-shadow: 0 2px 5px rgba(255, 255, 255, 0.1);
    }
    .stTab {
        background-color: #222222; /* Darker gray for tabs */
        border-radius: 5px; 
        padding: 10px; 
        margin-top: 20px;
    }
    .stExpander {
        background-color: #444444; /* Gray for expanders */
        border-radius: 5px; 
        margin-top: 10px;
    }
    .highlight {
        color: #ff3131; /* Highlight color */
        font-weight: bold;
    }
    .sender-info {
        background-color: #555555; /* Grayish background for sender info */
        padding: 10px; 
        border-radius: 5px;
        margin-top: 5px;
    }
    </style>
    """, unsafe_allow_html=True)

    st.markdown('<p class="main-header">🚨 Advanced Fraud Detection System 🚨</p>', unsafe_allow_html=True)

    uploaded_file = st.file_uploader("Choose a CSV file", type="csv")
    if uploaded_file is not None:
        data = pd.read_csv(uploaded_file)
        st.write("Data Preview:")
        st.dataframe(data.head())

        if st.button("Detect Suspicious Transactions"):
            with st.spinner('Analyzing transactions...'):
                suspicious_df = detect_suspicious_transactions(data, model, scaler)
                suspicious_df['Suspicion_Reasons'], suspicious_df['Comparison'] = zip(*suspicious_df.apply(
                    lambda row: explain_suspicion(row, feature_importances, data), axis=1
                ))
                suspicious_df = suspicious_df[suspicious_df['Is_Suspicious']]

            st.markdown('<p class="sub-header">Suspicious Transactions Analysis</p>', unsafe_allow_html=True)
            
            total_transactions = len(data)
            suspicious_transactions = len(suspicious_df)
            suspicious_percentage = (suspicious_transactions / total_transactions) * 100

            col1, col2, col3 = st.columns(3)
            col1.metric("Total Transactions", f"{total_transactions:,}")
            col2.metric("Suspicious Transactions", f"{suspicious_transactions:,}")
            col3.metric("Suspicious Percentage", f"{suspicious_percentage:.2f}%")

            st.markdown(get_table_download_link(suspicious_df), unsafe_allow_html=True)

            tab1, tab2, tab3, tab4 = st.tabs(["Distribution", "Geographical", "Reasons", "Amount vs Velocity"])

            with tab1:
                fig_pie = px.pie(values=[total_transactions - suspicious_transactions, suspicious_transactions],
                                 names=['Non-Suspicious', 'Suspicious'],
                                 title="Distribution of Suspicious Transactions",
                                 color_discrete_sequence=['#03045e', '#ff3131'])  # Dodger Blue and your color
                fig_pie.update_traces(textfont_color='#FFFFFF')
                st.plotly_chart(fig_pie, use_container_width=True)

            with tab2:
                fig_geo = px.choropleth(suspicious_df, locations="Sender_Country", 
                                        color="Suspicion_Score",
                                        hover_name="Sender_Country", 
                                        color_continuous_scale=[(0, "#ff3131"), (0.5, "#FF6347"), (1, "#FFD700")],  # Gradient from your color
                                        projection="natural earth")
                fig_geo.update_layout(title_text="Geographical Distribution of Suspicious Activity")
                fig_geo.update_geos(showcountries=True, countrycolor="#C0C0C0", showland=True, landcolor="#E9ECEF")
                st.plotly_chart(fig_geo, use_container_width=True)

            with tab3:
                reasons = suspicious_df['Suspicion_Reasons'].str.split(', ', expand=True).stack()
                reason_counts = reasons.value_counts().nlargest(30)
                fig_reasons = px.bar(x=reason_counts.index, y=reason_counts.values, 
                                     labels={'x': 'Reason', 'y': 'Count'}, title="Top 30 Suspicion Reasons")
                fig_reasons.update_traces(marker_color='#ff3131')  # Use your color for bars
                fig_reasons.update_layout(plot_bgcolor='#0C0C0C', paper_bgcolor='#222222', font_color='#FFFFFF')
                st.plotly_chart(fig_reasons, use_container_width=True)

            with tab4:
                fig_scatter = px.scatter(suspicious_df, x='Transaction_Amount', y='Transaction_Velocity',
                                         color='Suspicion_Score',
                                         title='Transaction Amount vs Velocity',
                                         color_continuous_scale=[(0, "#1E90FF"), (0.5, "#ff3131"), (1, "#FFD700")])  # Gradient with your color
                fig_scatter.update_layout(plot_bgcolor='#0C0C0C', paper_bgcolor='#222222', font_color='#FFFFFF')
                st.plotly_chart(fig_scatter, use_container_width=True)

            st.markdown('<p class="sub-header">Detailed Suspicious Transaction Information</p>', unsafe_allow_html=True)
            for index, row in suspicious_df.iterrows():
                with st.expander(f"Transaction ID: {row['Transaction_ID']} (Score: {row['Suspicion_Score']:.2f})"):
                    col1, col2 = st.columns(2)
                    with col1:
                        st.markdown(f"<div class='sender-info'><span class='highlight'>Transaction ID:</span> {row['Transaction_ID']}</div>", unsafe_allow_html=True)
                        st.markdown(f"<div class='sender-info'><span class='highlight'>Sender ID:</span> {row['Sender_ID']}</div>", unsafe_allow_html=True)
                        st.markdown(f"<div class='sender-info'><span class='highlight'>Receiver ID:</span> {row['Receiver_ID']}</div>", unsafe_allow_html=True)
                        st.markdown(f"<div class='sender-info'><span class='highlight'>Amount:</span> ${row['Transaction_Amount']:,.2f}</div>", unsafe_allow_html=True)
                        st.markdown(f"<div class='sender-info'><span class='highlight'>Velocity:</span> {row['Transaction_Velocity']:.2f}</div>", unsafe_allow_html=True)
                        st.markdown(f"<div class='sender-info'><span class='highlight'>Date:</span> {row['Date']}</div>", unsafe_allow_html=True)
                    
                    with col2:
                        comparison = row['Comparison']
                        st.markdown(f"<div class='sender-info'><span class='highlight'>Average Transaction Amount:</span> ${comparison['avg_amount']:,.2f}</div>", unsafe_allow_html=True)
                        st.markdown(f"<div class='sender-info'><span class='highlight'>Current Amount:</span> ${comparison['current_amount']:,.2f}</div>", unsafe_allow_html=True)
                        st.markdown(f"<div class='sender-info'><span class='highlight'>Average Velocity:</span> {comparison['avg_velocity']:.2f}</div>", unsafe_allow_html=True)
                        st.markdown(f"<div class='sender-info'><span class='highlight'>Current Velocity:</span> {comparison['current_velocity']:.2f}</div>", unsafe_allow_html=True)
                        st.markdown(f"<div class='sender-info'><span class='highlight'>Suspicion Reasons:</span> {row['Suspicion_Reasons']}</div>", unsafe_allow_html=True)

if __name__ == "__main__":
    main()

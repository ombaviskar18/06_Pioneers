
import {
  RiAiGenerate,
  RiBarChart2Line,
  RiBarChartBoxLine,
  RiCheckDoubleLine,
  RiDownload2Line,
  RiFileListLine,
  RiFileTextLine,
  RiGlobalLine,
  RiRefreshLine,
  RiShieldCheckLine,
  RiTimeLine,
  RiTimerFlashLine,
  RiUploadCloud2Line,
  RiUserSettingsLine,
  RiWalletLine,

} from "@remixicon/react";

export const HERO_CONTENT = {
  badgeText: "🛡️ Uncover Suspicious Transactions Effortlessly!",
  mainHeading: "Your Fraud Detection \n Starts with FraudX",
  subHeading:
    "Detect fraud before it happens! Leverage advanced machine learning to safeguard your financial transactions. Monitor, analyze, and act—anytime, anywhere!",
  callToAction: {
    primary: "Detect Fraud Now 🔒",
  },
};



export const HOW_IT_WORKS_CONTENT = {
  sectionTitle: "How Our Advanced Fraud Detection System Works!",
  sectionDescription: 
    "Our system leverages Random Forest machine learning algorithms to detect suspicious transactions based on multiple parameters. Our multi-step process ensures each transaction is thoroughly analyzed, safeguarding financial institutions against fraud.",
  steps: [
    {
      title: "Data Upload and Integration",
      description: 
        "Users can easily upload CSV files containing transaction data, which our system seamlessly integrates for analysis.",
    },
    {
      title: "Data Preprocessing",
      description: 
        "The system preprocesses the data, converting categorical variables to numerical and ensuring all necessary features are present for analysis.",
    },
    {
      title: "Multi-Parameter Analysis",
      description: 
        "Our system analyzes multiple parameters including transaction amount, velocity, IP address changes, device changes, and more to identify potential fraud.",
    },
    {
      title: "Machine Learning Analysis",
      description: 
        "Our Random Forest model analyzes the preprocessed data, identifying patterns and anomalies that may indicate fraudulent activity.",
    },
    {
      title: "Risk Scoring",
      description: 
        "Each transaction is assigned a suspicion score based on the model's analysis, determining its likelihood of being fraudulent.",
    },
    {
      title: "Detailed Reporting",
      description: 
        "The system generates comprehensive reports on suspicious transactions, including specific reasons for suspicion and comparisons with historical data.",
    },
  ],
};


export const KEY_FEATURES_CONTENT = {
  sectionTitle: "Detect Fraud with These Key Features",
  sectionDescription: 
    "Our advanced fraud detection system offers a range of powerful features to identify suspicious transactions and protect financial systems.",
  features: [
    {
      id: 1,
      icon: <RiUploadCloud2Line className="w-8 h-8" />,
      title: "Easy CSV Upload",
      description: 
        "Quickly upload transaction data via CSV files for immediate analysis.",
    },
    {
      id: 2,
      icon: <RiAiGenerate className="w-8 h-8" />,
      title: "Random Forest Algorithm",
      description: 
        "Utilize a sophisticated Random Forest model for accurate fraud detection.",
    },
    {
      id: 3,
      icon: <RiRefreshLine className="w-8 h-8" />,
      title: "Auto-learning and Retraining",
      description: 
        "The system continuously learns from new data, improving its detection capabilities over time.",
    },
    {
      id: 4,
      icon: <RiBarChartBoxLine className="w-8 h-8" />,
      title: "Multi-Parameter Detection",
      description: 
        "Analyze transactions based on amount, velocity, IP changes, device changes, and more for comprehensive fraud detection.",
    },
    {
      id: 5,
      icon: <RiFileTextLine className="w-8 h-8" />,
      title: "Detailed Transaction Analysis",
      description: 
        "Get in-depth analysis of each suspicious transaction, including comparison with historical data and specific reasons for flagging.",
    },
    {
      id: 6,
      icon: <RiGlobalLine className="w-8 h-8" />,
      title: "Geographical Analysis",
      description: 
        "Detect suspicious activities based on unusual transaction locations or cross-border transfers.",
    },
    {
      id: 7,
      icon: <RiTimeLine className="w-8 h-8" />,
      title: "Temporal Pattern Recognition",
      description: 
        "Identify unusual transaction times or frequencies that may indicate fraudulent activity.",
    },
    {
      id: 8,
      icon: <RiUserSettingsLine className="w-8 h-8" />,
      title: "User Behavior Analysis",
      description: 
        "Track changes in user behavior, including unusual IP or device changes, to detect potential account takeovers.",
    },
    {
      id: 9,
      icon: <RiDownload2Line className="w-8 h-8" />,
      title: "Exportable Results",
      description: 
        "Export suspicious transaction data and summaries for further analysis or reporting.",
    },
  ],
};



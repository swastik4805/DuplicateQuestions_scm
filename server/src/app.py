import streamlit as st
import helper
import pickle

# Load the machine learning model
model = pickle.load(open('model.pkl', 'rb'))

# Display the title
st.header('Duplicate Question Pairs')

# Text input fields for entering questions
q1 = st.text_input('Enter question 1')
q2 = st.text_input('Enter question 2')

# File path for stopwords file
stopwords_file_path = 'stopwords.pkl'

# Load stopwords from the file
with open(stopwords_file_path, 'rb') as f:
    STOP_WORDS = pickle.load(f)

# File uploader widget for uploading CV and model files
uploaded_cv_file = st.file_uploader("Upload CountVectorizer file", type=['pkl'])
uploaded_model_file = st.file_uploader("Upload model file", type=['pkl'])

# Load CV and model files
cv = None
if uploaded_cv_file is not None:
    cv = pickle.load(uploaded_cv_file)

if uploaded_model_file is not None:
    model = pickle.load(uploaded_model_file)

# Button to trigger the prediction
if st.button('Find'):
    if not STOP_WORDS:
        st.warning("Please upload the stopwords file(s).")
    elif not q1 or not q2:
        st.warning('Please provide both questions.')
    else:
        # Create query point
        query = helper.query_point_creator(q1, q2)

        # Predict duplicate or not
        result = model.predict(query)[0]

        # Display result
        if result:
            st.header('Duplicate')
        else:
            st.header('Not Duplicate')
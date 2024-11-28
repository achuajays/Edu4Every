import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const WritingAssistant = () => {
  const [userInput, setUserInput] = useState('');
  const [suggestion, setSuggestion] = useState(null);

  // Function to handle text input
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // Function to process text (send to backend when text ends with a period)
  const processText = async () => {
    if (userInput.trim().endsWith('.')) {
      const textBeforePeriod = userInput.slice(0, -1); // Remove the period

      try {
        const response = await axios.post('/api/grammar-check', {
          text: textBeforePeriod,
        });

        if (response.data && response.data.suggestion) {
          setSuggestion(response.data.suggestion); // Assuming result contains { text, explanation }
        }
      } catch (error) {
        console.error('Error fetching suggestion:', error);
      }
    }
  };

  // Approve the suggestion (replace the original text with suggested text)
  const approveSuggestion = () => {
    if (suggestion) {
      setUserInput(suggestion.text + '.'); // Add the period back
      setSuggestion(null);
    }
  };

  // Reject the suggestion (keep the original text)
  const rejectSuggestion = () => {
    setSuggestion(null);
  };

  // Function to download the content as a PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text('ASSIGNMENT:', doc.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
    doc.text('', 10, 20);
    doc.text(userInput, 10, 20);
    doc.save('grammar-suggested-text.pdf');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <textarea
        value={userInput}
        onChange={handleInputChange}
        onBlur={processText} // Trigger on blur (user finishes typing)
        placeholder="Enter your text here..."
        className="w-full max-w-lg h-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Tooltip for grammar suggestion */}
      {suggestion && (
        <div className="absolute bg-white border border-gray-300 rounded-md shadow-lg p-4 mt-2 w-80">
          <p className="font-semibold">Suggested Grammar:</p>
          <p>{suggestion.text}</p>
          <p className="mt-2 font-semibold">Explanation:</p>
          <p>{suggestion.explanation}</p>
          <div className="flex justify-between mt-4">
            <button 
              onClick={approveSuggestion} 
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
            >
              Approve
            </button>
            <button 
              onClick={rejectSuggestion} 
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
              Reject
            </button>
          </div>
        </div>
      )}

      {/* Download Button */}
      <button 
        onClick={downloadPDF} 
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Download PDF
      </button>
    </div>
  );
};

export default WritingAssistant;
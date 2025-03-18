import { FoldableCard } from "@/components/FoldableCard";
import React, { useState } from "react";

// FAQ data
const askedQuestions = [
  {
    question: "How do I create an account?",
    answer: "Creating an account is simple! Click the 'Sign Up' button in the top right corner of our website. Fill in your details, verify your email address, and you'll be ready to go in just a few minutes."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. All transactions are processed securely through our payment gateway."
  },
  {
    question: "How can I contact customer support?",
    answer: "Our customer support team is available via email at support@example.com, through the live chat on our website, or by phone during business hours."
  },
  {
    question: "What is your refund policy?",
    answer: "We offer a 30-day money-back guarantee. If you're not satisfied with our service, you can request a full refund within 30 days of your purchase."
  }
];

const Questions = () => {
  // State to track which accordion is open
  const [openItem, setOpenItem] = useState(null);
  
  // Handler for toggling accordions
  const handleToggle = (value) => {
    setOpenItem(value);
  };

  return (
    <div>
      <p className="text-4xl font-bold text-gray-700">FAQ's</p>
      <div 
        className="mt-10 mx-auto grid gap-5 lg:grid-cols-2 px-4"
        style={{ minHeight: 'max-content' }} // Helps prevent layout shifts
      >
        {askedQuestions.map((item, index) => (
          <div key={index} className="h-full">
            <FoldableCard 
              question={item.question}
              answer={item.answer}
              value={`item-${index}`}
              isOpen={openItem === `item-${index}`}
              onToggle={handleToggle}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;
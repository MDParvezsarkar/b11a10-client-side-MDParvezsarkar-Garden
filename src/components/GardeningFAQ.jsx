// GardeningFAQ.jsx
import React from "react";

const faqList = [
  {
    question: "How often should I water my garden?",
    answer:
      "Most gardens need about 1 inch of water per week, either from rain or manual watering.",
  },
  {
    question: "What is compost and why should I use it?",
    answer:
      "Compost is organic material that improves soil structure and adds nutrients. It's great for plant health.",
  },
  {
    question: "How can I prevent weeds naturally?",
    answer:
      "Use mulch, plant ground cover, and maintain healthy soil to reduce weed growth.",
  },
];

const GardeningFAQ = () => {
  return (
    <div className="max-w-4xl mx-auto my-10 p-4">
      <h2 className="text-3xl text-black font-bold flex justify-center items-center gap-4 text-center mb-6">
        Gardening FAQs
      </h2>
      <div className="space-y-4">
        {faqList.map((faq, index) => (
          <div key={index} className="collapse collapse-arrow bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              {faq.question}
            </div>
            <div className="collapse-content">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GardeningFAQ;

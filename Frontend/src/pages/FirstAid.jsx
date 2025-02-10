import React from "react";

const FirstAid = () => {
  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-20 text-blue-700">
         Tutorials 🚑
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* First Video */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
          <iframe
            width="100%"
            height="250"
            src="https://www.youtube-nocookie.com/embed/NSH2eYpZnjw?rel=0&autohide=1&modestbranding=1"
            title="First Aid Kit"
            frameBorder="0"
            allowFullScreen
            className="rounded-t-lg"
          ></iframe>
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              First Aid Kit Essentials
            </h2>
            <p className="text-gray-600 text-sm">
              एक प्रथम चिकित्सा किट एक आवश्यक चिकित्सा आपूर्ति संग्रह है, जो
              मामूली चोटों और आपातकालीन स्थितियों में तत्काल उपचार प्रदान करने
              के लिए उपयोगी होता है। इसमें पट्टियाँ, गॉज़, एंटीसेप्टिक वाइप्स,
              दर्द निवारक दवाएँ, कैंची, दस्ताने, थर्मामीटर, और आपातकालीन आपूर्ति
              जैसे आवश्यक सामान होते हैं। यह घर, कार्यस्थल, यात्रा, खेल, और
              आपातकालीन परिस्थितियों के लिए अनिवार्य है, क्योंकि यह संक्रमण को
              रोकने, चोटों के प्रभाव को कम करने और गंभीर स्थितियों में जीवन
              बचाने में सहायक होता है। नियमित रूप से इसकी जाँच और पुनः पूर्ति
              करना जरूरी है ताकि यह हमेशा तैयार रहे।
            </p>
          </div>
        </div>

        {/* Second Video */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
          <iframe
            width="100%"
            height="250"
            src="https://www.youtube-nocookie.com/embed/YEsQ36KeETo?rel=0&autohide=1&modestbranding=1"
            title="CPR Basics"
            frameBorder="0"
            allowFullScreen
            className="rounded-t-lg"
          ></iframe>
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              CPR (सीपीआर) के महत्वपूर्ण चरण
            </h2>
            <p className="text-gray-600 text-sm">
              सीपीआर (CPR) करने के महत्वपूर्ण चरण: व्यक्ति की स्थिति जांचें –
              देखें कि वह सांस ले रहा है या नहीं। एम्बुलेंस (108) को बुलाएं –
              मदद के लिए कॉल करें। छाती पर दबाव दें (Chest Compressions) –
              व्यक्ति को समतल सतह पर लिटाएं। दोनों हाथों को सीने के बीच में रखें
              और तेज़ी से 30 बार दबाव डालें (हर सेकंड 2 बार)। बचाव सांस (Rescue
              Breaths) दें – व्यक्ति के सिर को थोड़ा पीछे झुकाएं और नाक बंद करके
              2 बार मुंह से सांस दें। सीपीआर जारी रखें – जब तक व्यक्ति होश में न
              आ जाए या मेडिकल सहायता न पहुंचे।
            </p>
          </div>
        </div>

        {/* Third Video */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
          <iframe
            width="100%"
            height="250"
            src="https://www.youtube-nocookie.com/embed/sEQMQ5L9nVE?rel=0&autohide=1&modestbranding=1"
            title="Bandage Application"
            frameBorder="0"
            allowFullScreen
            className="rounded-t-lg"
          ></iframe>
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              सही तरीके से बैंडेज लगाना
            </h2>
            <p className="text-gray-600 text-sm">
              फिंगरटिप पर सही तरीके से बैंडेज लगाने के स्टेप्स: बैंडेज के दोनों
              सिरों पर छोटे कट करें ताकि इसे आसानी से लपेटा जा सके। घाव के ऊपर
              पैड रखें ताकि चोट ढकी रहे और सुरक्षा मिले। बैंडेज की पट्टियों को
              क्रिस-क्रॉस तरीके से उंगली के चारों ओर लपेटें ताकि यह मजबूती से
              टिका रहे। चिपकने वाले हिस्से को अच्छी तरह दबाएं ताकि
              बैंडेज फिसले नहीं
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstAid;

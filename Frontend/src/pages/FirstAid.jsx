import React, { useState } from "react";

const FirstAid = () => {
  return (
    <div className="container mx-auto p-6  min-h-screen">
      {/* Heading */}
      <h1 className="text-[#132D46] text-3xl font-extrabold text-center mb-12">
        Tutorials
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, index) => (
          <VideoCard key={index} video={video} />
        ))}
      </div>
    </div>
  );
};

const VideoCard = ({ video }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg transition-transform hover:scale-105 p-4">
      <div className="relative w-full h-64 rounded-lg p-2">
        <iframe
          width="100%"
          height="100%"
          src={video.src}
          title={video.title}
          frameBorder="0"
          allowFullScreen
          className="rounded-lg"
        ></iframe>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-[#132D46] mb-2">
          {video.title}
        </h2>
        <p className="text-gray-600 text-sm">
          {expanded
            ? video.description
            : `${video.description.slice(0, 100)}... `}
          {video.description.length > 100 && (
            <span
              className="text-[#01C38E] cursor-pointer"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Read less" : "Read more"}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

const videos = [
  {
    src: "https://www.youtube-nocookie.com/embed/NSH2eYpZnjw?rel=0&autohide=1&modestbranding=1",
    title: "First Aid Kit Essentials",
    description:
      "एक प्रथम चिकित्सा किट एक आवश्यक चिकित्सा आपूर्ति संग्रह है, जो मामूली चोटों और आपातकालीन स्थितियों में तत्काल उपचार प्रदान करने के लिए उपयोगी होता है। इसमें पट्टियाँ, गॉज़, एंटीसेप्टिक वाइप्स, दर्द निवारक दवाएँ, कैंची, दस्ताने, थर्मामीटर, और आपातकालीन आपूर्ति जैसे आवश्यक सामान होते हैं। यह घर, कार्यस्थल, यात्रा, खेल, और आपातकालीन परिस्थितियों के लिए अनिवार्य है, क्योंकि यह संक्रमण को रोकने, चोटों के प्रभाव को कम करने और गंभीर स्थितियों में जीवन बचाने में सहायक होता है। नियमित रूप से इसकी जाँच और पुनः पूर्ति करना जरूरी है ताकि यह हमेशा तैयार रहे।",
  },
  {
    src: "https://www.youtube-nocookie.com/embed/YEsQ36KeETo?rel=0&autohide=1&modestbranding=1",
    title: "CPR (सीपीआर) के महत्वपूर्ण चरण",
    description:
      "सीपीआर (CPR) करने के महत्वपूर्ण चरण: व्यक्ति की स्थिति जांचें – देखें कि वह सांस ले रहा है या नहीं। एम्बुलेंस (108) को बुलाएं – मदद के लिए कॉल करें। छाती पर दबाव दें (Chest Compressions) – व्यक्ति को समतल सतह पर लिटाएं। दोनों हाथों को सीने के बीच में रखें और तेज़ी से 30 बार दबाव डालें (हर सेकंड 2 बार)। बचाव सांस (Rescue Breaths) दें – व्यक्ति के सिर को थोड़ा पीछे झुकाएं और नाक बंद करके 2 बार मुंह से सांस दें। सीपीआर जारी रखें – जब तक व्यक्ति होश में न आ जाए या मेडिकल सहायता न पहुंचे।",
  },
  {
    src: "https://www.youtube-nocookie.com/embed/sEQMQ5L9nVE?rel=0&autohide=1&modestbranding=1",
    title: "सही तरीके से बैंडेज लगाना",
    description:
      "फिंगरटिप पर सही तरीके से बैंडेज लगाने के स्टेप्स: बैंडेज के दोनों सिरों पर छोटे कट करें ताकि इसे आसानी से लपेटा जा सके। घाव के ऊपर पैड रखें ताकि चोट ढकी रहे और सुरक्षा मिले। बैंडेज की पट्टियों को क्रिस-क्रॉस तरीके से उंगली के चारों ओर लपेटें ताकि यह मजबूती से टिका रहे। चिपकने वाले हिस्से को अच्छी तरह दबाएं ताकि बैंडेज फिसले नहीं",
  },
  {
    src: "https://www.youtube.com/embed/T3fxXYmQSOI?si=0VeCMWGcRU-AnBF4?rel=0&autohide=1&modestbranding=1",
    title: "Yoga Exercises",
    description:
      "योग एक प्राचीन भारतीय अभ्यास है, जो शरीर, मन और आत्मा के संतुलन के लिए किया जाता है। इसके द्वारा शारीरिक लचीलापन, मानसिक शांति और आत्मिक विकास प्राप्त किया जा सकता है। योग में आसन, प्राणायाम और ध्यान शामिल होते हैं, जो तनाव कम करने, एकाग्रता बढ़ाने और समग्र स्वास्थ्य सुधारने में मदद करते हैं। योग के प्रमुख प्रकार हैं: हठ योग, राज योग, भक्ति योग और ज्ञान योग",
  },
  {
    src: "https://www.youtube.com/embed/DFFzJIy-ak8?si=rDjpaKf0nB7OoYIk?rel=0&autohide=1&modestbranding=1",
    title: "Snake Bite First Aid Gestures",
    description:
      "यह वीडियो एक सांप के काटने के बाद की स्थिति को दिखाता है। इसमें सांप के काटने पर होने वाले लक्षण, जैसे दर्द, सूजन और शरीर के अन्य बदलावों को दिखाया जाता है। वीडियो में यह भी बताया जाता है कि सांप के काटने पर तुरंत क्या करना चाहिए और किस तरह से प्राथमिक चिकित्सा की जानी चाहिए। वीडियो के माध्यम से सांप के काटने से निपटने के लिए सावधानियों और उपायों के बारे में जानकारी दी जाती है",
  },
  {
    src: "https://www.youtube.com/embed/n65HW1iJUuY?si=c1J0m5JuUbd6Cu4e?rel=0&autohide=1&modestbranding=1",
    title: "CPR for infants",
    description:
      "यह वीडियो शिशु के लिए CPR (कार्डियोपल्मोनरी रेससिटेशन) की प्रक्रिया को दिखाता है, जो किसी आपातकालीन स्थिति में शिशु की जान बचाने के लिए अत्यंत महत्वपूर्ण है। इसमें शिशु के दिल या सांस रुकने पर सही तरीके से सीने पर दबाव डालने और श्वास देने की विधि को विस्तार से समझाया गया है। इस वीडियो को देखकर आप जान सकते हैं कि शिशु के लिए CPR किस तरह से किया जाता है, ताकि मदद आने से पहले शिशु की जान बचाई जा सके। कृपया ध्यान दें कि CPR का सही तरीके से किया जाना बेहद जरूरी है, इसलिए हमेशा प्रशिक्षित पेशेवर से इसकी ट्रेनिंग लें",
  },
];

export default FirstAid;

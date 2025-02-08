import React from "react";

const FirstAid = () => {
  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        First Aid Tutorials
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* First video */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube-nocookie.com/embed/NSH2eYpZnjw?rel=0&autohide=1&modestbranding=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        {/* Second video */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube-nocookie.com/embed/YEsQ36KeETo?rel=0&autohide=1&modestbranding=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        {/* Third video */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube-nocookie.com/embed/sEQMQ5L9nVE?rel=0&autohide=1&modestbranding=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default FirstAid;

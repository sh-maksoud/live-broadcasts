// import React, { useState, useRef, useEffect } from "react";
// import "./App.css";

// export default function App() {
//   const [activeVideo, setActiveVideo] = useState(null);
//   const audioRefs = { saudi: useRef(null), egypt: useRef(null), majd: useRef(null),};
//   const [stars, setStars] = useState([]);

//   // توليد النجوم
//   useEffect(() => {
//     const starCount = 100;
//     const newStars = Array.from({ length: starCount }).map((_, i) => ({
//       id: i,
//       left: `${Math.random() * 100}%`,
//       top: `${Math.random() * 100}%`,
//       size: `${1 + Math.random() * 2}px`,
//       duration: `${2 + Math.random() * 3}s`,
//     }));
//     setStars(newStars);
//   }, []);

//   const handlePlayback = (id) => {
//     // إيقاف الإذاعات الأخرى
//     Object.keys(audioRefs).forEach((key) => {
//       if (audioRefs[key].current && key !== id) audioRefs[key].current.pause();
//     });
//     // ضبط الفيديو النشط
//     if (id === "makkah" || id === "madinah") setActiveVideo(id);
//     else setActiveVideo(null);
//   };

//   return (
//     <div className="app-content">
//       <div className="stars-container">
//         {stars.map(star => (
//           <div key={star.id} className="star" style={{
//             left: star.left, top: star.top, width: star.size, height: star.size, "--duration": star.duration
//           }} />
//         ))}
//       </div>

//       <div className="container">
//         <header>
//           <div className="moon-icon">🌙</div>
//           <p className="subtitle">أشهد أن لا إله إلا الله محمد رسول الله</p>
//           <h1>إذاعات لايف</h1>
//         </header>

//         <div className="main-grid">
//           {/* قسم الإذاعات */}
//           <section className="card full-width">
//             <h2><span>📻 إذاعات القرآن الكريم</span> <small>بث مباشر</small></h2>
//             <div className="radio-grid">
//               <div className="radio-item">
//                 <p>إذاعة القرآن - السعودية</p>
//                 <audio ref={audioRefs.saudi} controls src="https://stream.radiojar.com/4wqre23fytzuv" onPlay={() => handlePlayback("saudi")} />
//               </div>
//               <div className="radio-item">
//                 <p>إذاعة القرآن - مصر</p>
//                 <audio ref={audioRefs.egypt} controls src="https://stream.radiojar.com/8s5u5tpdtwzuv" onPlay={() => handlePlayback("egypt")} />
//               </div>

//           {/* إذاعة المجد */}
//             <div className="radio-item">
//   <p>إذاعة المجد للقرآن الكريم</p>
//   <audio
//     ref={audioRefs.majd}
//     controls
//     preload="none"
//     src="http://r1.tarat.com:8196/stream?type=http&nocache=384"
//     onPlay={() => handlePlayback("majd")}
//   />
// </div>
//             </div>
//           </section>

//           {/* الحرم المكي */}
//           <section className="card">
//             <h2><span>🕋 الحرم المكي</span> <small>DIRECT</small></h2>
//             <div className="video-wrapper">
//               {activeVideo === "makkah" ? (
//                 // <iframe src="https://www.youtube.com/embed/jYhpTcaoSi0?autoplay=1" allow="autoplay" allowFullScreen title="Makkah"></iframe>
//                 <iframe
//   src="https://www.youtube.com/embed/IsJTAdC3-Jw?autoplay=1&playsinline=1"
//   title="Makkah Live"
//   className="youtube-frame"
//   allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
//   allowFullScreen></iframe>
//               ) : (
//                 <div className="video-placeholder" onClick={() => handlePlayback("makkah")}>
//                   <div className="play-icon">▶</div>
//                   <span>تشغيل البث المباشر</span>
//                 </div>
//               )}
//             </div>
//           </section>

//           {/* المسجد النبوي */}
//           <section className="card">
//             <h2><span>🕌 المسجد النبوي</span> <small>DIRECT</small></h2>
//             <div className="video-wrapper">
//               {activeVideo === "madinah" ? (
//                 <iframe
//                 //  src="https://www.youtube.com/embed/330mzXnpmv9-OY"
//                 src="https://www.youtube.com/embed/3iQQcFMVSZ0?autoplay=1&playsinline=1"
//                  title="Madinah Live"
//                  className="youtube-frame"
//                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
//                  allowFullScreen></iframe>
//               ) : (
//                 <div className="video-placeholder" onClick={() => handlePlayback("madinah")}>
//                   <div className="play-icon">▶</div>
//                   <span>تشغيل البث المباشر</span>
//                 </div>
//               )}
//             </div>
//           </section>
//         </div>

//         <footer>
//           <p>تقبل الله منا ومنكم صالح الأعمال • {new Date().getFullYear()}</p>
//         </footer>
//       </div>
//     </div>
//   );
// }





import React, { useState, useRef, useEffect } from "react";
import Hls from "hls.js";
import "./App.css";

export default function App() {
  const [stars, setStars] = useState([]);

  const audioRefs = {
    saudi: useRef(null),
    egypt: useRef(null),
    majd: useRef(null),
    makkah: useRef(null),
    madinah: useRef(null),
  };

  // روابط البث الصوتي للحرمين - روابط تجريبية
  const streams = {
    makkah: "https://win.holol.com/live/quran/playlist.m3u8",
    madinah: "https://win.holol.com/live/sunnah/playlist.m3u8",
  };

  // توليد النجوم
  useEffect(() => {
    const starCount = 100;

    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${1 + Math.random() * 2}px`,
      duration: `${2 + Math.random() * 3}s`,
    }));

    setStars(newStars);
  }, []);

  // تجهيز بث الحرمين باستخدام HLS
  useEffect(() => {
    const hlsInstances = [];

    Object.entries(streams).forEach(([id, url]) => {
      const audio = audioRefs[id].current;
      if (!audio) return;

      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: false,
        });

        hls.loadSource(url);
        hls.attachMedia(audio);

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            console.error(`خطأ في بث ${id}:`, data);
          }
        });

        hlsInstances.push(hls);
      } else if (
        audio.canPlayType("application/vnd.apple.mpegurl")
      ) {
        audio.src = url;
      }
    });

    return () => {
      hlsInstances.forEach((hls) => hls.destroy());
    };
  }, []);

  // تشغيل إذاعة واحدة فقط في نفس الوقت
  const handlePlayback = (id) => {
    Object.entries(audioRefs).forEach(([key, ref]) => {
      if (ref.current && key !== id) {
        ref.current.pause();
      }
    });
  };

  return (
    <div className="app-content">
      <div className="stars-container">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              "--duration": star.duration,
            }}
          />
        ))}
      </div>

      <div className="container">
        <header>
          <div className="moon-icon">🌙</div>
          <p className="subtitle">
            أشهد أن لا إله إلا الله محمد رسول الله
          </p>
          <h1>إذاعات لايف</h1>
        </header>

        <div className="main-grid">

          {/* إذاعات القرآن الكريم */}
          <section className="card full-width">
            <h2>
              <span>📻 إذاعات القرآن الكريم</span>
              <small>بث مباشر</small>
            </h2>

            <div className="radio-grid">
              <div className="radio-item">
                <p>إذاعة القرآن - السعودية</p>
                <audio
                  ref={audioRefs.saudi}
                  controls
                  preload="none"
                  src="https://stream.radiojar.com/4wqre23fytzuv"
                  onPlay={() => handlePlayback("saudi")}
                />
              </div>

              <div className="radio-item">
                <p>إذاعة القرآن - مصر</p>
                <audio
                  ref={audioRefs.egypt}
                  controls
                  preload="none"
                  src="https://stream.radiojar.com/8s5u5tpdtwzuv"
                  onPlay={() => handlePlayback("egypt")}
                />
              </div>

              <div className="radio-item">
                <p>إذاعة المجد للقرآن الكريم</p>
                <audio
                  ref={audioRefs.majd}
                  controls
                  preload="none"
                  src="http://r1.tarat.com:8196/stream?type=http&nocache=384"
                  onPlay={() => handlePlayback("majd")}
                />
              </div>
            </div>
          </section>

          {/* الحرم المكي */}
          <section className="card">
            <h2>
              <span>🕋 الحرم المكي</span>
              <small>بث صوتي مباشر</small>
            </h2>

            <div className="radio-item">
              <p>إذاعة القرآن الكريم من مكة المكرمة</p>

              <audio
                ref={audioRefs.makkah}
                controls
                preload="none"
                onPlay={() => handlePlayback("makkah")}
              />
            </div>
          </section>

          {/* المسجد النبوي */}
          <section className="card">
            <h2>
              <span>🕌 المسجد النبوي</span>
              <small>بث صوتي مباشر</small>
            </h2>

            <div className="radio-item">
              <p>إذاعة القرآن الكريم من المدينة المنورة</p>

              <audio
                ref={audioRefs.madinah}
                controls
                preload="none"
                onPlay={() => handlePlayback("madinah")}
              />
            </div>
          </section>

        </div>

        <footer>
          <p>
            تقبل الله منا ومنكم صالح الأعمال •{" "}
            {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}

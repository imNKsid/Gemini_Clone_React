import { ICONS } from "../../assets/icons";
import { IMAGES } from "../../assets/images";
import { useAppContext } from "../../context/Context";
import "./styles/Main.css";

export const Main = () => {
  const {
    input,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    onSent,
  } = useAppContext();

  const _handleKeyDown = (event: any) => {
    // Check if the pressed key is 'Enter'
    if (event.key === "Enter") {
      onSent();
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Nitesh's Gemini</p>
        <img src={IMAGES.user_image} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, NK</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="card-list">
              <div className="card">
                <p>Suggest beautiful places to see on upcoming road trip</p>
                <img src={ICONS.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Plan a high-protein vegetarian meal for daily basis</p>
                <img src={ICONS.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Suggest some good ideas for my Youtube videos</p>
                <img src={ICONS.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Help me write a program using HTML, CSS and JavaScript</p>
                <img src={ICONS.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={IMAGES.user_image} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={IMAGES.gemini_image} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Enter a prompt here"
              onKeyDown={_handleKeyDown}
            />
            <div>
              {/* <img src={ICONS.gallery_icon} alt="" /> */}
              {input ? (
                <img onClick={() => onSent()} src={ICONS.send_icon} alt="" />
              ) : (
                <img src={ICONS.mic_icon} alt="" />
              )}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps.
          </p>
        </div>
      </div>
    </div>
  );
};

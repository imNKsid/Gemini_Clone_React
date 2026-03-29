import { useState } from "react";
import { ICONS } from "../../assets/icons";
import { useAppContext } from "../../context/Context";
import "./styles/SideBar.css";

const SideBar = () => {
  const [extended, setExtended] = useState<boolean>(false);

  const { recentPrompt, prevPromptList, setRecentPrompt, onSent, newChat } =
    useAppContext();

  const loadPrompt = async (prompt: string) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const _handleMenuClick = () => {
    setExtended((prev) => !prev);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={_handleMenuClick}
          className="menu"
          src={ICONS.menu_icon}
          alt=""
        />
        <div className="new-chat" onClick={newChat}>
          <img src={ICONS.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPromptList.map((item: string, index: number) => {
              return (
                <div
                  key={index}
                  onClick={() => loadPrompt(item)}
                  className={
                    recentPrompt === item ? "selected-entry" : "recent-entry"
                  }
                >
                  {recentPrompt === item ? null : (
                    <img src={ICONS.message_icon} alt="" />
                  )}
                  <p>{item.length > 18 ? `${item.slice(0, 18)}...` : item}</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={ICONS.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={ICONS.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={ICONS.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default SideBar;

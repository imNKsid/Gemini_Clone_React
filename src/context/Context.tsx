import { createContext, useContext, useState } from "react";
import runChat from "../utils/gemini";

type ContextType = {
  input: string;
  recentPrompt: string;
  prevPromptList: string[];
  showResult: boolean;
  loading: boolean;
  resultData: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setRecentPrompt: React.Dispatch<React.SetStateAction<string>>;
  setPrevPromptList: React.Dispatch<React.SetStateAction<string[]>>;
  onSent: (prompt?: string) => Promise<void>;
  newChat: () => void;
};

export const Context = createContext<ContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAppContext must be used within ContextProvider");
  }
  return context;
};

const ContextProvider = (props: any) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPromptList, setPrevPromptList] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayParagraph = (index: number, nextWord: string) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 72 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt?: string) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;
    if (prompt) {
      response = await runChat(prompt);
      setRecentPrompt(prompt);
    } else {
      setRecentPrompt(input);
      setPrevPromptList((prev) => [input, ...prev]);
      response = await runChat(input);
    }

    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 === 0) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    let newResponse2 = newResponse.split("*").join("<br />");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayParagraph(i, nextWord + " ");
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    input,
    recentPrompt,
    prevPromptList,
    showResult,
    loading,
    resultData,
    setInput,
    setRecentPrompt,
    setPrevPromptList,
    onSent,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;

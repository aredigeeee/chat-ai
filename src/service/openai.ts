import axios from "axios";

export const sendMessageToOpenAi = async (message: string) => {
  try {
    if (!message || typeof message !== "string") {
      throw new Error("message must be string");
    }
    const res = await axios.post("http://localhost:5000/api/chat", {
      message,
    });

    return res.data.answer;
  } catch (error) {
    console.log("Error sending message", error);
    throw error;
  }
};

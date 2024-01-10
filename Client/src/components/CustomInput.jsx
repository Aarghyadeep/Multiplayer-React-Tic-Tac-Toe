import { ChatAutoComplete, useMessageInputContext } from "stream-chat-react";

export default function CustomInput() {
  const { handleSubmit } = useMessageInputContext();
  return (
    <div className="str-chat__input-flat str-chat__input-flat--send-button-active">
      <div className="str-chat__input-flat-wrapper">
        <div className="str-chat__input-flat--textarea-wrapper">
          <ChatAutoComplete />
        </div>
        <button
        className="mt-3 mb-4 bg-pink-600 px-3 font-semibold hover:bg-pink-500
        font-sans w-30 h-8 ring-2 ring-black"
        onClick={handleSubmit}> Send Message</button>
      </div>
    </div>
  );
}
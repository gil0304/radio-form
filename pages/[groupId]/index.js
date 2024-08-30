import { useState } from "react";
import { useRouter } from "next/router";

export default function MessageForm() {
  const [radioName, setRadioName] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { groupId } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/messages?groupId=${groupId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ radioName, message, groupId }),
    });

    if (res.ok) {
      setRadioName("");
      setMessage("");
      alert("メッセージが送信されました！");
    } else {
      alert("メッセージの送信に失敗しました。");
    }
  };

  return (
    <div>
      <h1>メッセージ送信</h1>
      <form onSubmit={handleSubmit}>
        <label>
          ラジオネーム:
          <input
            type="text"
            value={radioName}
            onChange={(e) => setRadioName(e.target.value)}
            required
          />
        </label>
        <label>
          メッセージ:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </label>
        <button type="submit">送信</button>
      </form>
    </div>
  );
}

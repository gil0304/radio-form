import { useRouter } from "next/router";
import { useState } from "react";

export default function Group() {
  const router = useRouter();
  const { groupId } = router.query;
  const [radioName, setRadioName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ groupId, radioName, message }),
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
      <h1>ラジオのお便り</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            ラジオネーム:
            <input
              type="text"
              value={radioName}
              onChange={(e) => setRadioName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            メッセージ:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </label>
        </div>
        <button type="submit">送信</button>
      </form>
    </div>
  );
}

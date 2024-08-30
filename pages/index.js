import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [radioName, setRadioName] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { groupId } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/messages", {
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
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        boxSizing: "border-box",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ fontSize: "24px", textAlign: "center" }}>ラジオのお便り</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{ display: "block", marginBottom: "8px", fontSize: "16px" }}
          >
            ラジオネーム:
          </label>
          <input
            type="text"
            value={radioName}
            onChange={(e) => setRadioName(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{ display: "block", marginBottom: "8px", fontSize: "16px" }}
          >
            メッセージ:
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              boxSizing: "border-box",
              minHeight: "150px",
              resize: "vertical",
            }}
          ></textarea>
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            color: "#fff",
            backgroundColor: "#0070f3",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          送信
        </button>
      </form>
    </div>
  );
}

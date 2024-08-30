import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MessageDetail() {
  const router = useRouter();
  const { groupId, id } = router.query;
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await fetch(`/api/groups/${groupId}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        console.log("Fetched data:", data);
        console.log("Type of id:", typeof id); // Check the type of id
        console.log("Messages:", data.messages);

        const selectedMessage = data.messages.find(
          (msg) => msg.id === parseInt(id, 10) // Ensure id is parsed as integer
        );
        console.log("Selected message:", selectedMessage);
        setMessage(selectedMessage);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (groupId && id) {
      fetchMessage();
    }
  }, [groupId, id]);

  const handleComplete = async () => {
    try {
      const res = await fetch(`/api/groups/${groupId}/messages/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: true }),
      });

      if (res.ok) {
        alert("メッセージを完了としてマークしました！");
        router.push(`/admin/${groupId}`);
      } else {
        alert("完了の更新に失敗しました。");
      }
    } catch (error) {
      console.error("Error updating message:", error);
      alert("完了の更新に失敗しました。");
    }
  };

  if (!message) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>メッセージ詳細</h1>
        <p>
          <strong>ラジオネーム:</strong> {message.radioName}
        </p>
        <p>
          <strong>メッセージ:</strong> {message.message}
        </p>
        {!message.completed && (
          <button style={styles.button} onClick={handleComplete}>
            完了
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f0f0",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "90%",
    maxWidth: "600px",
    textAlign: "center",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#0070f3",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

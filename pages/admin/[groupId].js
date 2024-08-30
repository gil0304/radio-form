import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function GroupAdmin() {
  const [messages, setMessages] = useState([]);
  const router = useRouter();
  const { groupId } = router.query;

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`/api/messages?groupId=${groupId}`);
      const data = await res.json();
      setMessages(data);
    };

    if (groupId) {
      fetchMessages();
    }
  }, [groupId]);

  return (
    <div>
      <h1>グループ管理画面</h1>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <Link href={`/admin/${groupId}/messages/${msg.id}`} legacyBehavior>
              <a>
                {msg.completed ? "✅ " : ""}
                {msg.radioName}: {msg.message}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useState } from "react";
import { useRouter } from "next/router";

export default function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: groupName }),
    });

    if (res.ok) {
      alert("グループが作成されました！");
      router.push("/admin");
    } else {
      alert("グループの作成に失敗しました。");
    }
  };

  return (
    <div>
      <h1>新しいグループを作成</h1>
      <form onSubmit={handleSubmit}>
        <label>
          グループ名:
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </label>
        <button type="submit">作成</button>
      </form>
    </div>
  );
}

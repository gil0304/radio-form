import { useState, useEffect } from "react";
import Link from "next/link";

export default function Admin() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const res = await fetch("/api/groups");
      const data = await res.json();
      setGroups(data);
    };

    fetchGroups();
  }, []);

  return (
    <div>
      <h1>グループ管理画面</h1>
      <Link href="/admin/create-group">
        <button>新しいグループを作成</button>
      </Link>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
            <Link href={`/admin/${group.id}`}>
              <h2>{group.name}</h2>
            </Link>
            <p>
              送信用URL:{" "}
              <a href={`/group/${group.id}`}>{`/group/${group.id}`}</a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

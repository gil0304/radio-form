import fs from "fs";
import path from "path";

const groupsFilePath = path.join(process.cwd(), "data", "groups.json");

export default function handler(req, res) {
  const { groupId } = req.query;

  if (req.method === "GET") {
    const fileContents = fs.readFileSync(groupsFilePath, "utf8");
    const groups = JSON.parse(fileContents);
    const group = groups.find((g) => g.id === groupId);

    if (group) {
      res.status(200).json(group.messages);
    } else {
      res.status(404).json({ message: "Group not found" });
    }
  } else if (req.method === "POST") {
    const newMessage = req.body;
    const fileContents = fs.readFileSync(groupsFilePath, "utf8");
    const groups = JSON.parse(fileContents);

    const group = groups.find((g) => g.id === newMessage.groupId);
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }

    newMessage.id = Date.now();
    newMessage.completed = false;
    group.messages.push(newMessage);

    fs.writeFileSync(groupsFilePath, JSON.stringify(groups, null, 2));
    res.status(201).json({ message: "Message added", newMessage });
  }
}

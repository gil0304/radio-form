import fs from "fs";
import path from "path";

const groupsFilePath = path.join(process.cwd(), "data", "groups.json");

export default function handler(req, res) {
  const { groupId, id } = req.query;

  if (req.method === "PUT") {
    const fileContents = fs.readFileSync(groupsFilePath, "utf8");
    const groups = JSON.parse(fileContents);

    const group = groups.find((g) => g.id === groupId);

    if (group) {
      const message = group.messages.find((msg) => msg.id === parseInt(id, 10));

      if (message) {
        message.completed = req.body.completed;

        fs.writeFileSync(groupsFilePath, JSON.stringify(groups, null, 2));
        res.status(200).json({ message: "Message updated", message });
      } else {
        res.status(404).json({ message: "Message not found" });
      }
    } else {
      res.status(404).json({ message: "Group not found" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

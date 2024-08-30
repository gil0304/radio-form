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
      res.status(200).json(group);
    } else {
      res.status(404).json({ message: "Group not found" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

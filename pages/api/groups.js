import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const groupsFilePath = path.join(process.cwd(), "data", "groups.json");

export default function handler(req, res) {
  if (req.method === "GET") {
    const fileContents = fs.readFileSync(groupsFilePath, "utf8");
    const groups = JSON.parse(fileContents);
    res.status(200).json(groups);
  } else if (req.method === "POST") {
    const { name } = req.body;
    const newGroup = {
      id: uuidv4(),
      name,
      messages: [],
    };

    const fileContents = fs.readFileSync(groupsFilePath, "utf8");
    const groups = JSON.parse(fileContents);
    groups.push(newGroup);

    fs.writeFileSync(groupsFilePath, JSON.stringify(groups, null, 2));
    res.status(201).json({ message: "Group created", group: newGroup });
  }
}

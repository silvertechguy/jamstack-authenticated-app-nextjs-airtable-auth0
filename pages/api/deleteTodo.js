import { getMinifiedRecord, table } from "./utils/airtable.js";
export default async (req, res) => {
  const { id } = req.body;
  try {
    const deletedRecord = await table.destroy([id]);
    res.statusCode = 200;
    res.json(getMinifiedRecord(deletedRecord[0]));
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
};

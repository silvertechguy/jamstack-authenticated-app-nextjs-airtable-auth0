import { getMinifiedRecord, table } from "./utils/airtable";
import auth0 from "./utils/auth0";

const handler = async (req, res) => {
  const { id } = req.body;
  const { user } = await auth0.getSession(req);

  // We could've put this in a middlware like requireAuthentication middleware function
  const existingRecord = await table.find(id);
  if (!existingRecord || user.sub !== existingRecord.fields.userId) {
    res.statusCode = 404;
    return res.json({ msg: "Record not found" });
  }

  try {
    const deletedRecord = await table.destroy([id]);
    res.statusCode = 200;
    res.json(getMinifiedRecord(deletedRecord[0]));
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
};

export default auth0.requireAuthentication(handler);

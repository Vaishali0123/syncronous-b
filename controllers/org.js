const Org = require("../models/Organization");

exports.fetchallmembers = async (req, res) => {
  try {
    const { orgid } = req.body;
    const org = await Org.findById(orgid).populate("users", "dp name username");
    if (org) {
      let data = [];
      for (let i = 0; i < org.users.length; i++) {
        const dp = process.env.URL + org.users[i].dp;
        let d = {
          dp,
          name: org.users[i].name,
          username: org.users[i].username,
        };
        data.push(d);
      }
      res.status(200).json({ success: true, data });
    } else {
      res.status(404).json({ success: false });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false });
  }
};

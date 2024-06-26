const Message = require("../models/Message");

exports.fetchallmsgs = async (req, res) => {
  try {
    const { id } = req.body;
    const msg = await Message.find({ orgid: id })
      .populate("sender", "name")
      .sort({ createdtAt: -1 })
      .limit(20);

    res.status(200).json({ success: true, msg });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false });
  }
};

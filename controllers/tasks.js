const Task = require("../models/Tasks");
const User = require("../models/User");

exports.newtask = async (req, res) => {
  try {
    const { id, text, assign } = req.body;
    const user = await User.findById(id);
    if (user) {
      const task = new Task({ creator: user._id, text, assigned: assign });
      await task.save();
      await User.updateOne(
        { _id: user._id },
        { $addToSet: { tasks: task._id } }
      );
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false, message: "User not found!" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false });
  }
};

//mytasks
exports.fetchalltasks = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id).populate({
      path: "tasks",
      select: "text assigned status createdAt _id",
      match: { isactive: true },
      populate: {
        path: "creator",
        select: "name dp",
      },
    });

    if (user) {
      let data = [];
      for (let i = 0; i < user.tasks.length; i++) {
        const d = {
          dp: process.env.URL + user.tasks[i].creator.dp,
          text: user.tasks[i].text,
          assign: user.tasks[i].assigned,
          status: user.tasks[i].status,
          createdAt: user.tasks[i].createdAt,
          _id: user.tasks[i]._id,
          name: user.tasks[i].creator.name,
        };
        data.push(d);
      }
      res.status(200).json({ success: true, tasks: data, name: user.name });
    } else {
      res.status(404).json({ success: false });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false });
  }
};

//teamtasks

exports.updatetask = async (req, res) => {
  try {
    const { id, taskid, text, status } = req.body;
    const user = await User.findById(id);
    if (user) {
      await Task.updateOne(
        { _id: taskid },
        { $set: { text: text, status: status } }
      );
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false });
  }
};

exports.deletetask = async (req, res) => {
  try {
    const { id, taskid } = req.body;
    const user = await User.findById(id);
    if (user) {
      await User.updateOne({ _id: user._id }, { $pull: { tasks: taskid } });
      await Task.updateOne({ _id: taskid }, { $set: { isactive: false } });
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false });
  }
};

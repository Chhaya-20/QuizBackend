const Topics = require("../model/ques");

// exports.AddTopic=async(req,res)=>{
//     console.log(req.body)
//     const {topic}=req.body;
//     if(!topic)
//     {
//         return res
//         .status(404)
//         .json({ success: false, message: "Enter valid topic name" });
//     }
//     try{
//         const result = await Topics.find({topic:topic});
//         if(!result)
//         {
//             const topics =  new Topics({topic});
//             await topics.save();
//             return res
//             .status(200)
//             .json({ success: true, message: "Topic Successfully Added " ,topics._id });
//         }
//         else{
//             return result._id ;
//         }

//     }
//     catch (err) {
//         console.error("Error saving user:", err);
//         return res.status(500).send("Internal Server error");
//       }
// }
exports.AddTopic = async (req, res) => {
  const { topic } = req.body;
  if (!topic) {
    return res
      .status(404)
      .json({ success: false, message: "Enter a valid topic name" });
  }
  try {
    const result = await Topics.find({ topic: topic });
    if (result.length === 0) {
      const topics = new Topics({ topic });
      await topics.save();
      return res.status(200).json({
        success: true,
        message: "Topic Successfully Added",
        id: topics._id,
      });
    } else {
      console.log(result);
      return res.status(200).json({
        success: true,
        message: "Topic already exists",
        id: result[0]._id,
      });
    }
  } catch (err) {
    console.error("Error saving user:", err);
    return res.status(500).send("Internal Server error");
  }
};

exports.Addques = async (req, res) => {
  const { desc, o1, o2, o3, o4, answer, topicid } = req.body;
  if (!desc || !o1 || !o2 || !o3 || !o4 || !answer) {
    return res
      .status(404)
      .json({ success: false, message: "Enter all required fields " });
  }
  try {
    if (!topicid) {
      return res.status(500).send("Internal Server error");
    } else {
      const topic = await Topics.findOne({ _id: topicid });
      topic.questions.push({
        ques: desc,
        options: [o1, o2, o3, o4],
        result: answer,
      });
      await topic.save();
      return res
        .status(200)
        .json({ success: true, message: "Ques Successfully Added " });
    }
  } catch (err) {
    console.error("Error saving user:", err);
    return res.status(500).send("Internal Server error");
  }
};

exports.GetTopics = async (req, res) => {
  try {
    const result = await Topics.find();

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching topics:", error);
    res.status(500).send("Internal Server error");
  }
};


exports.GetQues= async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id
  try {
    const result = await Topics.findById({_id:id});
    
    res.status(200).json(result.questions);
  } catch (error) {
    
    console.error("Error fetching topics:", error);
    res.status(500).send("Internal Server error");
  }
}
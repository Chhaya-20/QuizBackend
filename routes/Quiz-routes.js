const express = require("express");
const router = express.Router();

const {
  AddTopic,
  Addques,
  GetTopics,
  GetQues,
} = require("../controllers/Quiz");

//ADD TOPIC
router.post("/addtopic", AddTopic);

//ADD Ques
router.post("/addques", Addques);

//FETCH TOPICS
router.get("/gettopics", GetTopics);

router.get("/getques/:id", GetQues);

module.exports = router;

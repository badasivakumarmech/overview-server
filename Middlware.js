const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    let token = req.header("token");

    if (!token) {
      return res.status(400).json("jwt token not found");
    }
    let compareToken = jwt.verify(token, "jwtpassword");
    req.user = compareToken.user; //compare req user and loggged user
    next();
  } catch (e) {
    console.log(e);
    return resizeBy.status(500).json("Internal server error");
  }
};


// app.get(
//   "/getAllContents/:learningPathId/:topicId/:topicContentname",
//   async (req, res) => {
//     try {
//       const { learningPathId, topicId, topicContentname } = req.params;

//       // Find the learning path by ID
//       const learningPath = await allLearningPaths.findById(learningPathId);

//       if (!learningPath) {
//         return res
//           .status(404)
//           .json({ msg: "Learning path not found", status: "failed" });
//       }

//       // Find the topic within the learning path by ID
//       const topic = learningPath.topics.id(topicId);

//       if (!topic) {
//         return res
//           .status(404)
//           .json({ msg: "Topic not found", status: "failed" });
//       }

//       // Filter contents based on the provided topicContentname
//       const matchingContents = topic.content.filter(
//         (contentItem) => contentItem.topicContentname === topicContentname
//       );

//       if (matchingContents.length === 0) {
//         return res
//           .status(404)
//           .json({ msg: "Content not found", status: "failed" });
//       }

//       // Return the details of all matching contents
//       const allContentsData = matchingContents.map((content) => ({
//         id: content.id,
//         topicContentname: content.topicContentname,
//         contentTitle: content.contentTitle,
//         contentdes: content.contentdes,
//         contentimg: content.contentimg,
//         publish: content.publish,
//         // Add more properties as needed
//       }));

//       // Return the content details
//       return res
//         .status(200)
//         .json({ contents: allContentsData, status: "success" });
//     } catch (e) {
//       console.error(e.message, "get all contents data");
//       return res
//         .status(500)
//         .json({ msg: "Internal Server Error", status: "failed" });
//     }
//   }
// );
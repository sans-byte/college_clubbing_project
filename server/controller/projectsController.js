const Project = require("../models/projectSchema");
const User = require("../models/userSchema");
const UserData = require("../models/userDataSchema");

exports.getProjects = async (req, res) => {
  const { interest } = req.params;
  try {
    await Project.find({ interest }).exec((err, projectList) => {
      if (err) {
        console.log(err, "from get projects");
        return res
          .status(400)
          .json({ error: "Something went wrong in route.js get projects" });
      } else {
        return res.status(200).send(projectList);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postProject = async (req, res) => {
  try {
    const {
      title,
      description,
      membersRequired,
      pings,
      field,
      interest,
      generationDate,
      lastApplyDate,
    } = req.body;
    if (!title || !description || !membersRequired) {
      return res
        .status(422)
        .json({ error: "Please fill all the required fields" });
    }
    const { userId } = req.params;
    const project = new Project(req.body);
    await User.findById(userId).exec(async (err, foundUser) => {
      if (err) {
        console.log(err, "From post porject");
      } else {
        await UserData.findById(foundUser.info).exec(
          async (err, foundUserData) => {
            if (err) {
              console.log(err, "From post Project ");
            } else {
              project.author.id = foundUser._id;
              project.author.userName =
                foundUser.firstName + " " + foundUser.lastName;
              project.interest = foundUserData.interest;
              await project.save((err, savedProject) => {
                if (err) {
                  console.log(err, "From save Project");
                  return res
                    .status(400)
                    .json({ error: "Project is not posted from route js" });
                } else {
                  return res
                    .status(200)
                    .json({ message: "Project posted from route js" });
                }
              });
            }
          }
        );
      }
    });
  } catch (err) {
    console.log(err, "from catch route js");
  }
};

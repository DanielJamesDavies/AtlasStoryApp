const express = require("express");
const router = express.Router();

const GetIsUserFollowing = require("../services/FollowRelationship/GetIsUserFollowing");
const GetIsUserFollower = require("../services/FollowRelationship/GetIsUserFollower");
const GetUserFollowing = require("../services/FollowRelationship/GetUserFollowing");
const GetUserFollowers = require("../services/FollowRelationship/GetUserFollowers");
const GetStoryFollowers = require("../services/FollowRelationship/GetStoryFollowers");
const FollowUser = require("../services/FollowRelationship/FollowUser");
const UnfollowUser = require("../services/FollowRelationship/UnfollowUser");
const FollowStory = require("../services/FollowRelationship/FollowStory");
const UnfollowStory = require("../services/FollowRelationship/UnfollowStory");

router.get("/is-following-user/:id", GetIsUserFollowing);
router.get("/is-user-follower/:id", GetIsUserFollower);
router.get("/is-following-story/:id", GetUserFollowing);
router.get("/user-following/:id", GetUserFollowing);
router.get("/user-followers/:id", GetUserFollowers);
router.get("/story-followers/:id", GetStoryFollowers);
router.post("/follow-user/:id", FollowUser);
router.post("/unfollow-user/:id", UnfollowUser);
router.post("/follow-story/:id", FollowStory);
router.post("/unfollow-story/:id", UnfollowStory);

module.exports = router;

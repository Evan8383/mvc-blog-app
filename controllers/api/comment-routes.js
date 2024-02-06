const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

const withAuth = require('../../utils/withAuth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
}
);

router.post('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      // title: req.body.title,
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });

    res.json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
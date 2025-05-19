const express = require('express');
const router = express.Router();
const { Comment, User } = require('../models');
const authenticate = require('../middleware/authMiddleware');

router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id, {
      include: User, 
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Add comment to article
router.post('/:articleId', authenticate, async (req, res) => {
  const comment = await Comment.create({
    text: req.body.text,
    ArticleId: req.params.articleId,
    UserId: req.userId
  });
  res.status(201).json(comment);
});

// Update comment
router.put('/:id', authenticate, async (req, res) => {
  const comment = await Comment.findByPk(req.params.id);
  if (comment.UserId !== req.userId) return res.status(403).json({ message: 'Not allowed' });

  await comment.update({ text: req.body.text });
  res.json(comment);
});

// Delete comment
router.delete('/:id', authenticate, async (req, res) => {
  const comment = await Comment.findByPk(req.params.id);
  if (comment.UserId !== req.userId) return res.status(403).json({ message: 'Not allowed' });

  await comment.destroy();
  res.json({ message: 'Deleted' });
});

module.exports = router;

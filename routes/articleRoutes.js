const express = require('express');
const router = express.Router();
const { Article, Comment, User } = require('../models'); 
const authenticate = require('../middleware/authMiddleware');



// Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'email']
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['id', 'email']
          }
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const formatted = articles.map(article => {
      const plain = article.toJSON();

      // Manually attach userId for frontend logic
      plain.userId = plain.User?.id;

      // Also normalize comment userId
      plain.comments = plain.Comments.map(comment => ({
        ...comment,
        user: comment.User,
        userId: comment.User?.id
      }));

      return plain;
    });

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Create article
router.post('/', authenticate, async (req, res) => {
  const { title, content } = req.body;
  const article = await Article.create({ title, content, UserId: req.userId });
  res.status(201).json(article);
});

// Update article
router.put('/:id', authenticate, async (req, res) => {
  const article = await Article.findByPk(req.params.id);
  if (article.userId !== req.userId) return res.status(403).json({ message: 'Not allowed' });

  await article.update(req.body);
  res.json(article);
});

// Delete article
router.delete('/:id', authenticate, async (req, res) => {
  const article = await Article.findByPk(req.params.id);
  if (Number(article.UserId) !== Number(req.userId)) {
  return res.status(403).json({ message: 'Not allowed' });
}
  await article.destroy();
  res.json({ message: 'Deleted' });
});

module.exports = router;

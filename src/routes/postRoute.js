const router = require('express').Router()
const verify = require('../validation/tokenVerification')
const jwt = require('jsonwebtoken')
const User = require('../users/users')
const Post = require('../posts/posts')

router.get('/post', verify,  async(req, res) =>
{
	const posts = await Post.find()
  res.json(posts)
})

router.post('/post', async (req, res) => {
  const token = req.header('auth-token')
  if (!token) return res.status(400).send('access Denied')

  const currentUserId = jwt.decode(token, process.env.SECRET_JWT)
  if (!currentUserId) return res.status(400).send('access Denied')

  const currentUser = await User.findById(currentUserId.id)
  if (!currentUser) return res.status(400).send('access Denied')

  const post = new Post({
    postName: req.body.postName,
    description: req.body.description,
    name: currentUser.name,
    email: currentUser.email
  })

  const savedPost = await post.save()

  res.send(savedPost)

  try {
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router

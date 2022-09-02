// backend/routes/api/session.js
const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

router.get('/:userId/playlists', async (req , res) =>{
  const playlists = await Playlist.findAll({
    where:{
      userId : req.params.userId
    }
  })
  res.json({Playlists:playlists})
})


router.get('/:userId/songs', async (req , res) =>{
  const songs = await Song.findAll({
    where:{
      userId : req.params.userId
    }
  })
  res.json({Songs:songs})
})

router.get('/:userId', async (req, res) =>{
    const userId = req.params
    let artist = User.findByPk(userId)
    const details = await User.findByPk({
      where: {
        userId
      },
      include: [
        {
          model: Song,
          attribtues: []
        },
        {
          model: Album,
          attributes: []
        }
      ],
      attributes: {
        include: [
          [
            sequelize.fn("COUNT",
            sequelize.col("Song.id")),
            "totalSongs"
          ]
        ]
      }
    });

    res.json(details)

  });





// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    const user = await User.signup({ email, username, password, firstName, lastName });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }
);



module.exports = router;

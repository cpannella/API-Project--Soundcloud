const router = require('express').Router();

const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');

const { requireAuth } = require('../../utils/auth.js');


router.use(restoreUser);

// GET /api/restore-user--------------------------------
router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);
router.get('/set-token-cookie', async (_req, res) => {

///GET //set-token-cookie-------------------------------
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user });
});



// GET /api/require-auth---------------------------------
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);


// router.post('/test', function(req, res) {

// //   fetch('/api/test', {
// //   method: "POST",
// //   headers: {
// //     "Content-Type": "application/json",
// //     "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
// //   },
// //   body: JSON.stringify({ hello: 'world' })
// // }).then(res => res.json()).then(data => console.log(data));
//   res.json({ requestBody: req.body });
// });




module.exports = router;

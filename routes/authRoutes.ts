import express from 'express';
import passport from '../auth/passport';

const router = express.Router();

// Start GitHub OAuth login
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// Handle callback after GitHub authentication
router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/books'); // Redirect after successful login
  }
);

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

export default router;
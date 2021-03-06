const {
  handleEmailSendingError,
} = require('../handleEmailSendingError');
const {
  handleSpreadsheetUploadError,
} = require('../handleSpreadsheetUploadError');
const {
  publishToEmail,
} = require('../publishToEmail');
const {
  publishToGoogleSheet,
} = require('../publishToGoogleSheet');

module.exports = {
  getStoryGeneratorMailerMiddleware() {
    return (req, res) => {
      /* Cross-reference with StorySubmissionForm component. */

      const sheetProm = publishToGoogleSheet(
        req.body.name,
        req.body.email,
        req.body.story,
        req.body.responses);

      sheetProm.then(
        () => {},
        handleSpreadsheetUploadError,
      );

      const emailProm = publishToEmail(
        req.body.name,
        req.body.email,
        req.body.carbonCopy,
        req.body.story);

      emailProm.then(
        () => {},
        (e) => {
          try {
            handleEmailSendingError(e, req, res);
          } catch (e) {
            console.error(e);
            res.redirect('/');
            res.end();
          }
        }, 
      );

      Promise.all([
        sheetProm,
        emailProm,
      ]).then(
        () => {
          /* Redirect to the home page. */
          res.redirect('/');
          res.end();
        },

        () => {},
      );
    }
  },
};
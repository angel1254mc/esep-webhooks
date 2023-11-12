const {onRequest} = require("firebase-functions/v2/https");
const fetch = require("node-fetch");

exports.pingwebhook = onRequest(async (req, res) => {
  const json = JSON.parse(req.body.payload);
  console.log(json);
  // New comment
  const payload = {text: `Issue Created: ${json.issue.html_url} added.`};
  await fetch(process.env.SLACK_URL, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    body: JSON.stringify(payload),
  });
  return res.status(200).json(payload);
});

const chatbot = require("../chatbot/chatbot");

module.exports = app => {
  app.get("/", (req, res) => {
    res.send({ hello: "there" });
    console.log(process.env.NODE_ENV);
  });

  app.post("/api/df_text_query", async (req, res) => {
    try {
      let responses = await chatbot.textQuery(
        req.body.text,
        req.body.parameters
      );
      res.send(responses[0].queryResult);
    } catch (error) {}
  });

  app.post("/api/df_event_query", async (req, res) => {
    try {
      let responses = await chatbot.eventQuery(
        req.body.event,
        req.body.parameters
      );
      res.send(responses[0].queryResult);
    } catch (error) {}
  });
};

// export GOOGLE_APPLICAION_CREDENTIALS=/home/joshmat/My_Projects/Node_Projects/my-project-1535666536710-04facd830390.json

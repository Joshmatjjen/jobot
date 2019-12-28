const {WebhookClient} = require('dialogflow-fulfillment');

const mongoose = require('mongoose');
const Demand = mongoose.model('demand');
const Joshmat = mongoose.model('joshmat');
const Coupon = mongoose.model('coupon');
const Registration = mongoose.model('registration');

module.exports = app => {
  app.post('/', async (req, res) => {
    const agent = new WebhookClient({
      request: req,
      response: res,
    });

    async function parrot(agent) {
      agent.add(`Welcome to my Parrot fulfillment!`);
      const joshmat = new Joshmat({
        question: 'girlfriend',
        answer:
          "🤔 He use to say he don't have a girlfriend, But i think he has only one girlfriend. But he cannot tell you her name!",
      });
      try {
        let reg = await joshmat.save();
        console.log(reg);
      } catch (err) {
        console.log(err);
      }
    }

    async function registration(agent) {
      const registrations = new Registration({
        name: agent.parameters.name,
        address: agent.parameters.address,
        phone: agent.parameters.phone,
        email: agent.parameters.email,
        dateSent: Date.now(),
      });
      try {
        let reg = await registrations.save();
        console.log(reg);
      } catch (err) {
        console.log(err);
      }
    }

    async function joshmat(agent) {
      let Jmt = await Joshmat.findOne(
        {question: agent.parameters.joshmats || agent.parameters.joshmats1},
        function(err, joshmat) {
          console.log(joshmat);
          console.log('Answer', joshmat.answer);
        }
      );

      let responseText = `
        You want to learn about ${agent.parameters.joshmats ||
          agent.parameters.joshmats1}.
      `;
      let badResponseText = ` 😢 Sorry i dont have an answer to your question, Please ask another one. `;

      if (Jmt !== null) {
        // responseText = `
        // You asked: ${agent.parameters.joshmats ||
        //   agent.parameters.joshmats1}.
        //         My answer:
        //          ${Jmt.answer}`;
        responseText = `${Jmt.answer}`;
      }
      if (!agent.parameters.joshmats && !agent.parameters.joshmats1) {
        responseText = badResponseText;
      }
      agent.add(responseText);
    }

    async function learn(agent) {
      Demand.findOne({course: agent.parameters.courses}, function(err, course) {
        if (course !== null) {
          course.counter++;
          course.save();
        } else {
          const demand = new Demand({
            course: agent.parameters.courses,
          });
          console.log(demand);
          console.log(demand.course);
          demand.save();
        }
      });
      let responseText = `
        You want to learn about ${agent.parameters.courses}. 
        Here is a link to all of my course: https://jclothing.herokuapp.com
      `;
      let badResponseText = ` 😢 Sorry this course is not available, please try other courses `;
      let coupon = await Coupon.findOne({course: agent.parameters.courses});
      if (coupon !== null) {
        responseText = `You want to learn about ${agent.parameters.courses}. 
                Here is a link to the course: ${coupon.link}`;
      }
      if (!agent.parameters.course) {
        responseText = badResponseText;
      }
      agent.add(responseText);
    }

    function fallback(agent) {
      agent.add(`I didn't understand`);
      agent.add(`I'm sorry, can you try again?`);
      agent.add(`I no understand you?`);
    }
    let intentMap = new Map();
    intentMap.set('Joshmat', joshmat);
    intentMap.set('parrot', parrot);
    intentMap.set('learn courses', learn);
    intentMap.set('recommend courses - yes', registration);
    intentMap.set('Default Fallback Intent', fallback);
    agent.handleRequest(intentMap);
  });
};

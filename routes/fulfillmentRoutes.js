const {WebhookClient} = require('dialogflow-fulfillment');

const {Payload} = require('dialogflow-fulfillment');
const mongoose = require('mongoose');
const Demand = mongoose.model('demand');
const Joshmat = mongoose.model('joshmat');
const Coupon = mongoose.model('coupon');
const Registration = mongoose.model('registration');
const BotFriend = mongoose.model('botFriend');
const Joke = mongoose.model('joke');

module.exports = app => {
  app.post('/', async (req, res) => {
    const agent = new WebhookClient({
      request: req,
      response: res,
    });

    async function parrot(agent) {
      agent.add(`Welcome to my Parrot fulfillment!`);
      const joke = new Joke({
        name: 'jokes',
        type: 'top',
        value:
          'Doctor says to his patient: "You have cancer and Alzheimer." - Patient: "At least I don\'t have cancer."',
      });
      try {
        let reg = await joke.save();
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

    async function joke(agent) {
      // console.log(agent.parameters.alljokes);
      // Get the count of all users
      // Joke.count().exec(function(err, count) {
      //   // Get a random entry
      //   var random = Math.floor(Math.random() * count);

      //   // Again query all users but only fetch one offset by our random #
      //   Joke.findOne()
      //     .skip(random)
      //     .exec(function(err, result) {
      //       // Tada! random user
      //       console.log(result);
      //     });
      // });
      let jokes = await Joke.find({
        name: agent.parameters.alljokes,
      });
      let randomJoke = await jokes[Math.floor(Math.random() * jokes.length)];
      let responseText = `
        You want to learn about ${agent.parameters.alljokes}.
      `;
      let badResponseText = ` 😢 Sorry i dont have an answer to your question, Please ask another one. `;

      if (randomJoke !== null) {
        responseText = `${randomJoke.value}`;
      }
      if (!agent.parameters.alljokes) {
        responseText = badResponseText;
      }
      agent.add(responseText);
    }

    async function botFriend(agent) {
      const botFriends = new BotFriend({
        name: agent.parameters.name,
        gender: agent.parameters.gender,
        mobile: agent.parameters.mobile,
        social_media: agent.parameters.social_media,
        dateSent: Date.now(),
      });
      try {
        let reg = await botFriends.save();

        const payload = {
          text: 'Who whould you like to know about?',
          quick_replies: [
            {
              text: 'Josh',
              payload: 'josh',
            },
            {
              text: 'Bot',
              payload: 'bot',
            },
          ],
        };

        agent.add(
          new Payload(agent.UNSPECIFIED, payload, {
            rawPayload: true,
            sendAsMessage: true,
          })
        );
        // const payload = {
        //   text: "Would you like to be Joshmat's Friend?",
        //   quick_replies: [
        //     {
        //       text: 'yes',
        //       payload: 'yes',
        //     },
        //     {
        //       text: 'no',
        //       payload: 'no',
        //     },
        //   ],
        // };
        // agent.add(JSON.stringify(payload));
        console.log(reg);
      } catch (err) {
        console.log(err);
      }
    }

    async function joshmat(agent) {
      let Jmt = await Joshmat.findOne(
        {
          question:
            agent.parameters.joshmats ||
            agent.parameters.joshmats1 ||
            agent.parameters.joshmats2,
        },
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
      if (
        !agent.parameters.joshmats &&
        !agent.parameters.joshmats1 &&
        !agent.parameters.joshmats2
      ) {
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
    intentMap.set('learn joshmat', joshmat);
    intentMap.set('parrot', parrot);
    intentMap.set('jokes', joke);
    intentMap.set('learn courses', learn);
    intentMap.set('recommend courses - yes', registration);
    intentMap.set('about joshmat - yes', botFriend);
    intentMap.set('Default Fallback Intent', fallback);
    agent.handleRequest(intentMap);
  });
};

const fs = require("fs");
const {WebhookClient} = require("dialogflow-fulfillment");

const {Payload} = require("dialogflow-fulfillment");
const mongoose = require("mongoose");
const Demand = mongoose.model("demand");
const Joshmat = mongoose.model("joshmat");
const Coupon = mongoose.model("coupon");
const Registration = mongoose.model("registration");
const BotFriend = mongoose.model("botFriend");
const Joke = mongoose.model("joke");
// const Test = mongoose.model("test");

module.exports = app => {
  app.post("/", async (req, res) => {
    const agent = new WebhookClient({
      request: req,
      response: res,
    });

    async function parrot(agent) {
      agent.add(`Welcome to my Parrot fulfillment!`);
      // const joke = new Joke({
      //   name: 'jokes',
      //   type: 'top',
      //   value:
      //     "I've got a friend who's fallen in love with two school bags, he's bisatchel.",
      //   dateSent: Date.now(),
      // });

      // const jokes = [
      //   {
      //     name: 'jokes',
      //     type: 'top',
      //     value: 'It’s not who you know, it’s whom you know.',
      //     dateSent: Date.now(),
      //   },
      //   {
      //     name: 'jokes',
      //     type: 'top',
      //     value: 'I have a lot of jokes about unemployed people but none of them work.',
      //     dateSent: Date.now(),
      //   },
      // ];

      try {
        let reg;
        // let reg = await Joke.create(jokes);
        let docNum = await Joke.countDocuments();
        let number = docNum - 1;
        console.log(number);
        let jokelist = [];
        // ''' ""
        for (let i = 0; i < jokelist.length; i++) {
          reg = await Joke.create({
            id: i + docNum,
            name: "jokes",
            type: "top",
            value: jokelist[i],
            dateSent: Date.now(),
          });
        }
        console.log(reg);
      } catch (err) {
        console.log(err);
      }

      // await Joke.find(function(err, data) {
      //   console.log(data);
      //   fs.writeFile("myjokes.json", data, err => {
      //     // throws an error, you could also catch it here
      //     if (err) throw err;

      //     // success case, the file was saved
      //     console.log("data saved!");
      //   });
      // });

      // try {
      //   let reg = await joke.save();
      //   console.log(reg);
      // } catch (err) {
      //   console.log(err);
      // }
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
      /** Method 1 */
      var startDate = new Date();
      const allJoke = await Joke.aggregate([{$sample: {size: 3}}]);
      let randomJoke = allJoke[0];
      console.log(randomJoke);
      var t1 = new Date() - startDate;
      console.log(t1);

      /** Method 2 to get random jokes*/
      // var startDate = new Date();
      // var i = 10000;
      // const number = await Joke.countDocuments();
      // let random = Math.floor(Math.random() * number);
      // let randomJoke2 = await Joke.find()
      //   .limit(-1)
      //   .skip(random);
      // console.log(randomJoke2[0].value);
      // var t2 = new Date() - startDate;
      // console.log(t1, t2);
      // console.log;
      // let jokes = await Joke.find({
      //   name: agent.parameters.alljokes,
      // });
      // let randomJoke = await jokes[Math.floor(Math.random() * jokes.length)];
      // console.log(randomJoke);
      let responseText = `😢 Sorry, Unable to find any joke right now, Please try again later`;
      let badResponseText = ` 😢 Sorry, i dont have an answer to your question, Please ask another one. `;

      // if (randomJoke2[0] !== null) {
      if (randomJoke !== null) {
        // responseText = `${randomJoke2[0].value}`;
        responseText = `${randomJoke.value}`;
        // console.log(responseText);
      }
      if (!randomJoke) {
        responseText = badResponseText;
      }

      agent.add(responseText);
      if (randomJoke.value) {
        const payload = {
          text: "Do you want to another funny joke? 😁😊",
          quick_replies: [
            {
              text: "Yes",
              payload: "yes_more_jokes",
            },
            {
              text: "No",
              payload: "no",
            },
          ],
        };

        agent.add(
          new Payload(agent.UNSPECIFIED, payload, {
            rawPayload: true,
            sendAsMessage: true,
          })
        );
      }
      console.log("datafrom Agent: ", responseText);
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
        await agent.add(
          "😊Thanks for typing in your details soon you and Joshmat would be friends."
        );
        const payload = {
          text: "Who whould you like to know about?",
          quick_replies: [
            {
              text: "Josh",
              payload: "josh",
            },
            {
              text: "Bot",
              payload: "bot",
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
        //   text: "Would you like to be Joshmat´s Friend?",
        //   quick_replies: [
        //     {
        //       text: yes´,
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
      let Jmt = await Joshmat.findOne({
        question: agent.parameters.joshmats || agent.parameters.joshmats1,
      });

      let responseText = `
       ${agent.parameters.joshmats || agent.parameters.joshmats1}.
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
    await intentMap.set("learn joshmat", joshmat);
    // await intentMap.set("parrot", parrot);
    await intentMap.set("jokes", joke);
    await intentMap.set("jokes -yes", joke);
    await intentMap.set("learn courses", learn);
    await intentMap.set("recommend courses - yes", registration);
    await intentMap.set("about joshmat - yes", botFriend);
    await intentMap.set("Default Fallback Intent", fallback);
    await agent.handleRequest(intentMap);
  });
};

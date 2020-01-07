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
        let jokelist = [
          "Lightning doesn´t mean to shock people, it just doesn´t know how to conduct itself.",
          "Knowledge is knowing a tomato is a fruit. Wisdom is not putting it in a fruit salad.",
          "The only substitute for good manners is fast reflexes.",
          "Reading whilst sunbathing makes you well red.",
          "Evening news is where they begin with ´Good evening´, and then proceed to tell you why it isn´t.",
          "A bus station is where a bus stops. A train station is where a train stops. On my desk, I have a work station.",
          "Did you know that dolphins are so smart that within a few weeks of captivity, they can train people to stand on the very edge of the pool and throw them fish?",
          "A bank is a place that will lend you money, if you can prove that you don´t need it.",
          "A clear conscience is usually the sign of a bad memory.",
          "My first job was working in an orange juice factory, but I got canned because I couldn´t concentrate.",
          "Worrying works! 90% of the things I worry about never happen.",
          "A bus is a vehicle that runs twice as fast when you are after it as when you are in it.",
          "Can´t stand it when a sentence doesn´t end the way you think it OCTOPUS!",
          "I was going to donate blood until the lady got all personal and started asking ¨Who´s blood is this?¨ and ¨How did you get it?¨",

          "If swimming is so good for your figure, how do you explain whales?",
          "I don´t have a big ego. I´m way too cool for that.",
          "Why couldn´t the bicycle stand? Because it was two tired.",
          "Originality is the art of concealing your sources.",
          "Despite the cost of living, have you noticed how popular it remains?",
          "My GPS keeps saying, ¨Go back 20 years and enter law school.¨",
          "If I eat healthy today then I can have one piece of candy as a reward. If I eat unhealthy, I can have the whole bag.",
          "My mother was so overprotective we were only allowed to play rock, paper.",
          "I don´t know what ´gluten free´ means but I´m adding it to my resume.",
          "Don´t worry. Your secret is safe with me. Everyone I told swore they wouldn´t tell anyone else.",
          "Your call is very important to us. Please enjoy this 40 minute flute solo.",
          "The barman says ¨we don´t serve time travellers here¨. A time traveller walks into a bar.",
          "Drinking and drugs will not solve all your problems. That´s what chocolate and ice cream are for.",
          "If you notice a person is deceiving you, they must not be deceiving you very well.",
          "My boss has told so many unfunny jokes today, I´ve forgotten what my real laugh sounds like.",
          "A cat jumps into a cab and yells, “Follow that red dot!”",
          "The trouble with real life is that there is no danger music.",
          "Unless you can be Batman, always be yourself.",
          "You know it's time to reconsider your diet when you buy a hulahoop and it fits.",
          "In order to catch a bus, first one must think like a bus.",
        ];
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
    await intentMap.set("parrot", parrot);
    await intentMap.set("jokes", joke);
    await intentMap.set("jokes -yes", joke);
    await intentMap.set("learn courses", learn);
    await intentMap.set("recommend courses - yes", registration);
    await intentMap.set("about joshmat - yes", botFriend);
    await intentMap.set("Default Fallback Intent", fallback);
    await agent.handleRequest(intentMap);
  });
};

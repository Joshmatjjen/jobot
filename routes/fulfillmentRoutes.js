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
          "According to my best recollection, I don’ t remember.",

          "The word“ gullible” isn’ t in the dictionary.",

          "The more people I meet, the more I like my dog.",

          "Work is for people who don’ t know how to fish.",

          "If you don’ t like the news, go out and make some.",

          "For every action, there is an equal and opposite criticism.",

          "~Q: Who was the worlds first carpenter ? ~A: Eve, because she made Adams banana stand",

          "~Q: Why does Dr Pepper come(cum) in a bottle ? ~A: Because his wife died!",

          "~Q: When do you kick a midget in the balls ? ~A: When he is standing next to your girlfriend saying her hair smells nice",

          "~Q: What’ s the difference between your job and a dead prostitute ? ~A: Your job still sucks!",

          "~Q: Why do men get their great ideas in bed ? ~A: Because they’ re plugged into a genius!",

          "~Q: What do you call an artist with a brown finger ? ~A: Piccassole",

          "~Q: Did you guys hear about the cannibal that made a bunch of businessmen into Chili ? ~A: I guess he liked seasoned professionals.",

          "~Q: Whats long and hard and has cum in it ? ~A: a cucumber",

          "~Q: How do you kill a circus clown ? ~A: Go for the juggler!",

          "~Q: Did you hear about the guy who died of a Viagra overdose ? ~A: They couldn’ t close his casket.",

          "~Q: Why don’ t orphans play baseball ? ~A: They don’ t know where home is.",

          "~Q: What’ s the difference between a Catholic priest and a zit ? ~A: At least a zit waits until you’ re a teenager before it cums on your face!",

          "~Q: Why can’ t Jesus play hockey ? ~A: He keeps getting nailed to the boards.",

          "~Q: What did the hurricane say to the coconut palm tree ? ~A: Hold on to your nuts, this is no ordinary blow job!",

          "~Q: How does a woman scare a gynaecologist ? ~A: By becoming a ventriloquist!",

          "~Q: What’ s 6 inches long, 2 inches wide and drives women wild ? ~A: A $100 bill!",

          "~Q: What do you call a cheap circumcision ? ~A: A rip off Girl: “Hey, what’ s up ? ”Boy : “If I tell you, will you sit on it ? ”",

          "~Q: How do you get a nun pregnant ? ~A: Dress her up as an altar boy.",

          "~Q: Why can’ t you play Uno with a Mexican ? ~A: They steal all the green cards.",

          "~Q: How do you circumcise a hillbilly ? ~A: Kick his sister in the jaw.",

          "How did the black girl know her mother was on the rag ? Her brothers dick tasted funny.",

          "How did they improve the transportation in Harlem ? Moved the trees closer together.",

          "How did they invent break dancing ? Trying to steal the hubcaps off a moving car.",

          "What do you call a black guys condom ? A duffel bag.",

          "What do you call a black man in a tree ? A branch manager.",

          "What do you call a black man in Thailand ? A tycoon.",

          "How can you tell when a black has been on your computer ? It is not there.",

          "Did you hear about the new black French restaurant ? It’ s called Chez What.",

          "What did Lincoln say after his five - day drunk ? I freed whom.",

          "A black guy and a Mexican guy opened a restaurant.It’ s called Nacho Mama.",

          "Did you hear about Klu Klux Knievel ? He tried to jump over 8 blacks with a steamroller.",

          "Did you hear that the KKK bought the movie rights to Roots ? They’ re going to play it backwards so it has a happy ending.",

          "Why are black people so tall ? Because their knee grows.",

          "Why did God invent golf ? So white people could dress up like blacks.",

          "Why do black people wear hats covering their face ? So the birds don’ t shit on their lips.",

          "What do you call a barn full of blacks ? Farm equipment.",

          "What did the black girl say while having sex ? Dad, get off me you’ re crushing my ciggies.",

          "What did the black women get for getting an abortion ? Fat cash from crime stoppers.",

          "What did the white redneck say to his wife when she told him their black neighbours were coming over for Christmas ? So much for a white Christmas this year!",

          "How many black people does it take to single a roof ? Depends on how thin you slice um.",

          "~Q: Why are blonde jokes so stupid ? ~A: So brunettes can get them!",

          "~Q: What does a blonde say after she knocks over an antique vase that is priceless and it cracks on the ground ? ~A: “It’ s Okay daddy, I’ m alright”",

          "~Q: Why did the blonde snort Sweet - n - Low ? ~A: She thought it was Diet Coke.",

          "~Q: What does a blonde say after two more years of college ? ~A: Would you like fries with that ?",

          "~Q: Why did the blonde cross the road ? ~A: I don’ t know, and neither does she.",

          "~Q: Why can’ t you tell blondes knock - knock jokes ? ~A: Because they go answer the door.",

          "~Q: Why is it a blonde cannot have more than a 10 minutes lunch break ? A: Because otherwise, you have to retrain her.",

          "~Q: What do you call a couple of blondes in the front seat of a car ? ~A: Air Bags.",

          "~Q: What do you do if a Blonde throws a pin at you ? ~A: Run, she’ s got a grenade in her mouth!",

          "~Q: How can you tell if a Blonde has been using your computer ? ~A: There is white - out all over the monitor.",

          "~Q: Why shouldn’ t Blondes have coffee breaks ? ~A: It takes too long to retrain them.",

          "~Q: What’ s a blonde and a postage stamp got in common ? ~A: Lick Em, Stick Em, Send Em",

          "~Q: How can you tell if a blonde has been on the computer ? ~A: There is tipex on the screen.",

          "~Q: How can you tell if she has been on again ? ~A: She has left cheese for the mouse.",

          "~Q: What do SMART Blondes and UFO’ s have in common ? ~A: You always hear about them but never see them.",

          "~Q: What did the Blonde say when she opened the box of Cheerios ? ~A: Oh look, Daddy… Doughnut seeds.",

          "~Q: How do you get a twinkle in a Blonde’ s eye ? ~A: Shine a flashlight in her ear.",

          "~Q: Hear about the blonde that got an AM radio ? ~A: It took her a month to realize she could play it at night.",

          "~Q: What happened to the blonde Ice Hockey Team ? ~A: They drowned in Spring Training.",

          "~Q: What is dumber than two brunettes that tried to build a house at the bottom of the ocean ? ~A: Two blondes that tried to burn it down!",

          "~Q: What’ s blonde - brunette - blonde - brunette - blonde - brunette - blonde ? ~A: A blonde doing cartwheels.",

          "~Q: What do you call a blonde with half a brain ? ~A: Gifted.",

          "~Q: Did you hear the one about the blonde fox that got stuck in a trap ? ~A: She chewed off three legs and was still stuck.",

          "~Q: Why did the blonde have square boobs ? ~A: She forgot to take the tissue out of the box.",

          "~Q: What’ s an intelligent blonde ? ~A: A Golden Retreiver.",

          "~Q: How do blonde’ s brain cells die ? ~A: Alone.",

          "~Q: How do you make a one arm blonde fall out of a tree ? ~A: Wave to her!",

          "~Q: What do you call blondes in a freezer ? ~A: Frosted Flakes!",

          "~Q: Did you hear about the blonde who died drinking milk ? ~A: The cow fell on her.",

          "~Q: What do blondes and beer bottles have in common ? ~A: They are both empty from the neck up!",

          "~Q: Why does a blonde keep a wire coat hanger in the back seat of her car ? ~A: In case she locks her keys in .",

          "~Q: What do you call an eternity ? ~A: Four Blondes in four cars at a four - way stop.",

          "~Q: Why do Blondes have TGIF written on their shoes ? ~A: Toes Go In First.",

          "~Q: Why did the Blonde stare at the can of frozen orange juice ? ~A: Because it said concentrate.",

          "~Q: Why does it take longer to build a Blonde snowman as opposed to a regular one ? ~A: You have to hollow out the head.",

          "~Q: What did the blonde say when she saw the sign in front of the YMCA ? ~A: “Look!They spelt MACY’ S wrong!”",

          "~Q: How do you make a blonde laugh on Saturday ? ~A: Tell her joke on Wednesday.",

          "Why did God make poo smelly ? So deaf people could enjoy them too.",

          "Did you hear that diarrhoea is hereditary ? It runs in the genes.",

          "Have you heard about that new movie Constipation ? It hasn’ t come out yet.",

          "Why did Tigger stick his head in the toilet ? He was looking for Pooh.",

          "Why does Tigger smell ? You’ d smell too if you played with Winnie the Pooh all day.",

          "What did the maxi pad say to the fart ? You are the wind beneath my wings.",

          "What do you get when you cross a Bulldog and a Shih Tzu ? Bullshit!",

          "What’ s brown and sticky ? A stick.",

          "What did the tired bum hole say after a crap ? I’ m pooped out",

          "We always hold hands.If I let go, she shops.",

          "My wife and I went back to the hotel where we spent our wedding night, only this time I stayed in the bathroom and cried.",

          "Patient: “I have a ringing in my ears.”Doctor: “Don’ t answer!”",

          "A drunk was in front of a judge.The judge says, “You’ ve been brought here for drinking.”The drunk says“ Okay, let’ s get started.”",

          "I’ ve been in love with the same woman for 49 years.If my wife ever finds out, she’ ll kill me!",

          "What are three words a woman never wants to hear when she’ s making love ? “Honey, I’ m home!”",

          "She was at the beauty shop for two hours.That was only for the estimate.She got a mud pack and looked great for two days.Then the mud fell off.",

          "Doctor: “You’ ll live to be 60!”Patient: “I AM 60!”Doctor: “See!What did I tell you ? ”",

          "A car hit an elderly Jewish man.The paramedic says, “Are you comfortable ? ”The man says, “I make a good living.”",

          "I just got back from a pleasure trip.I took my mother - in -law to the airport.",

          "My wife and I went to a hotel where we got a waterbed.My wife called it the Dead Sea.",

          "A doctor held a stethoscope up to a man’ s chest.The man asks, “Doc, how do I stand ? ”The doctor says, “That’ s what puzzles me!”",

          "Why do Jewish divorces cost so much ? They’ re worth it.",

          "What do you call a Jewish knight ? Sir Cumsiced.",
        ];

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

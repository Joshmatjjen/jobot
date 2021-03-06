const mongoose = require("mongoose");
const {Schema} = mongoose;

const testSchema = new Schema({
  name: String,
  type: String,
  // value: String,
  value: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
  },
  dateSent: Date,
});

mongoose.model("test", testSchema);

// const joshmat = [
// {
// 1  value: "A guy goes in for a job interview and sits down with the boss. The boss asks him, “What do you think is your worst quality?” The man says “I’m probably too honest.” The boss says, “That’s not a bad thing, I think being honest is a good quality.” The man replies, “I don’t care about what you think!”",
// 2  value: "My memory has gotten so bad it has actually caused me to lose my job. I’m still employed. I just can’t remember where.",
// 3  value: "Some people say the glass is half full. Some people say the glass is half empty. Engineers say the glass is twice as big as necessary.",
// 4  value: "I asked the corporate wellness officer, “Can you teach me yoga?” He said, “How flexible are you?” I said, “I can’t make Tuesdays.”",
// 5  value: "My boss says I have a preoccupation with vengeance. We’ll see about that.",
// 6  value: "The reason we “nod off to sleep” is so it looks like we’re just emphatically agreeing with everything when we’re in a boring meeting.",
// 7  value: "When an employment application asks who is to be notified in case of emergency, I always write, “A very good doctor”.",
// 8  value: "Team work is important; it helps to put the blame on someone else.",
// 9  value: "I’m great at multitasking. I can waste time, be unproductive, and procrastinate all at once.",
// 10  value: "Nothing ruins a Friday more than an understanding that today is Tuesday.",
// 11  value: "I can’t believe I got fired from the calendar factory. All I did was take a day off.",
// 12  value: "I always tell new hires, don’t think of me as your boss, think of me as a friend who can fire you.",
// 13  value: "My resumé is just a list of things I hope you never ask me to do.",
// 14  value: "The proper way to use a stress ball is to throw it at the last person to upset you.",
// 15  value: "There is a new trend in our office; everyone is putting names on their food. I saw it today, while I was eating a sandwich named Kevin.",
// 16  value: "My annual performance review says I lack “passion and intensity.” I guess management hasn’t seen me alone with a Big Mac.",
// 17  value: "I get plenty of exercise – jumping to conclusions, pushing my luck, and dodging deadlines.",
// 18  value: "How do construction workers party? They raise the roof.",
// 19  value: "If every day is a gift, I’d like a receipt for Monday. I want to exchange it for another Friday.",
// 20  value: "Feeling stressed out? Make a nice cup of hot tea and then spill it in the lap of whoever’s bugging you.",
// 21  value: "I use artificial sweetener at work. I add it to everything I say to my boss.",
// 22  value: "A clean desk is a sign of a cluttered desk drawer.",
// 23  value: "The only thing worse than seeing something done wrong is seeing it done slowly.",
// 24  value: "If at first you don’t succeed, redefine success.",
// 25  value: "Give me ambiguity or give me something else.",
// 26  value: "We have enough youth. How about a fountain of “Smart”?",
// 27  value: "I started out with nothing and I still have most of it.",
// 28  value: "The boss frowns on anyone yelling: “Hey Weirdo!” He says too many people look up from their work.",
// 29  value: "Things really haven’t gotten worse. We’ve just improved our inter-departmental communication skills.",
// 30  value: "Anything that could possibly go wrong often does – as well as a thing or two that couldn’t possibly.",
// 31  value: "If it wasn’t for the last minute, nothing would get done.",
// 32  value: "If our boss makes a mistake, it is our mistake.",
// 33  value: "A diplomat is someone who can tell you to go to hell in such a way that you will look forward to the trip.",
// 34  value: "To steal ideas from one person is plagiarism. To steal from many is research.",
// 35  value: "A bus station is where a bus stops. A train station is where a train stops. On my desk, I have a work station…",
// 36  value: "I like work. It fascinates me. I sit and look at it for hours.",
// 37  value: "I’m out of bed and dressed. What more do you want?",
// 38  value: "Experience is what you get when you didn’t get what you wanted.",
// 39  value: "To be sure of hitting the target, shoot first and call whatever you hit the target.",
// 40  value: "To err is human, to blame it on someone else shows management potential.",
// 41  value: "A man can do more than he thinks he can, but he usually does less than he thinks he does.",,
// 42  value: "I don’t work well under pressure… or any other circumstance.",
// 43  value: "Knowledge is knowing a tomato is a fruit; wisdom is not putting it in a fruit salad.",
// 44  value: "I thought I wanted a career, turns out I just wanted paychecks",
// 45  value: "Some people are like Slinkies … not really good for anything, but you can’t help smiling when you see one tumble down the stairs.",
// 46  value: "A work week is so rough that after Monday and Tuesday, even the calendar says WTF.",
// 47  value: "I didn’t say it was your fault, I said I was blaming you.",
// 48  value: "Laugh at your problems, everybody else does.",
// 49  value: "Artificial intelligence is no match for natural stupidity.",
// 50  value: "He who smiles in a crisis has found someone to blame.",
// 51  value: "Some cause happiness wherever they go. Others whenever they go.",
// 52  value: "Worrying works! 90% of the things I worry about never happen.",
// 53  value: "I couldn’t work today because of an eye problem. I just can’t see myself working today.",
// 54  value: "When in doubt, mumble.",
// 55  value: "You’re never too old to learn something stupid.",
// 56  value: "When tempted to fight fire with fire, remember that the Fire Department usually uses water.",
// 57  value: "When it comes to work, change is inevitable, except from the vending machine.",
// 58  value: "If you keep your feet firmly on the ground, you’ll have trouble putting on your pants.",
// 59  value: "Some mistakes are too much fun to only make once.",
// 60  value: "Keep the dream alive: hit the snooze button.",
// 61  value: "If you can stay calm while all around you is chaos, then you probably haven’t completely understood the situation.",
// 62  value: "Hard work never killed anyone, but why take the chance?",
// 63  value: "I have all the money I’ll ever need – if I die by 4:00 p.m. today.",
// 64  value: "The right to be heard does not automatically include the right to be taken seriously.",
// 65  value: "Archaeologist: someone whose career lies in ruins.",
// 66  value: "The probability of someone watching you is proportional to the stupidity of your action.",
// 67  value: "It matters not whether you win or lose: what matters is whether I win or lose.",
// 68  value: "If you can’t convince them, confuse them.",
// 69  value: "Progress is made by lazy people looking for an easier way to do things.",
// 70  value: "I don’t have a solution, but I do admire the problem.",
// 71  value: "People tend to make rules for others and exceptions for themselves.",
// 72  value: "Stress is when you wake up screaming and you realize you haven’t fallen asleep yet.",
// 73  value: "Sometimes the best helping hand you can give is a good, firm push.",
// 74  value: "Drink coffee! Do stupid things faster with more energy!",
// 75  value: "I don’t mind coming to work, it’s the 8-hour wait to go home I can’t stand.",
// 76  value: "A positive attitude may not solve all your problems, but it will annoy enough people to make it worth the effort.",
// 77  value: "The trouble with being punctual is that nobody’s there to appreciate it.",
// 78  value: "Just about the time when you think you can make ends meet, somebody moves the ends.",
// 79  value: "My biggest professional ambition is to get a desk where no one can see my computer monitor but me.",
// 80  value: "A committee is twelve men doing the work of one.",
// 81  value: "If everything seems to be coming your way, you’re probably in the wrong lane.",
// 82  value: "It’s not how good your work is, it’s how well you explain it.",
// 83  value: "Efficiency is a highly developed form of laziness.",
// 84  value: "The farther away the future is, the better it looks.",
// 85  value: "Some of us learn from the mistakes of others; the rest of us have to be the others.",
// 86  value: "Discretion is being able to raise your eyebrow instead of your voice.",
// 87  value: "I pretend to work as long as they pretend to pay me.",
// 88  value: "I like my job only marginally more than I like being homeless.",
// 89  value: "The trouble with doing something right the first time is that nobody appreciates how difficult it was.",
// 90  value: "The human brain is a wonderful thing. It starts working the moment you are born, and never stops until you stand up to speak in public.",
// 91  value: "Do not walk behind me, for I may not lead. Do not walk ahead of me, for I may not follow. Do not walk beside me either. Just pretty much leave me alone.",
// 92  value: "There are two kinds of people who don’t say much: those who are quiet and those who talk a lot.",
// 93  value: "With a calendar, your days are numbered.",
// 94  value: "A hard thing about a business is minding your own.",
// 95  value: "I think they picked me for my motivational skills. Everyone always says they have to work twice as hard when I’m around!",
// 96  value: "Early to bed, early to rise makes people suspicious.",
// 97  value: "Many people quit looking for work when they find a job.",
// 98  value: "All I ask is a chance to prove money can’t make me happy.",
// 99  value: "It’s not who you know, it’s whom you know.",
// 100 value: "Nothing is foolproof to a sufficiently talented fool.",
// 101 value: "I have a lot of jokes about unemployed people but none of them work.",
//   }
// ];

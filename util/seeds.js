const Thought = require('../model/Thought')
const User = require('../model/user')

const db = require('../connection')

const userData = [
    { 
        username: "Ralph Gorp",
        email: "gorp@gorpy.com"
    },
    { 
        username: "Bill Billson",
        email: "bill@billsonplumbing.com"
    },
    { 
        username: "Kal Jiminy",
        email: "bat@cricket.com"
    }
]

const thoughtData = [
    {
        username: "Ralph Gorp",
        thoughtText : "Politics is hard!"
    },
    {
        username: "Ralph Gorp",
        thoughtText : "I'm grilling today!"
    },
    {
        username: "Bill Billson",
        thoughtText : "I wish I could shift to Hogwarts!"
    },
    {
        username: "Bill Billson",
        thoughtText : "My blood is basically gravy!"
    },
    {
        username: "Kal Jiminy",
        thoughtText : "Queen Elizabeth!"
    },
    {
        username: "Kal Jiminy",
        thoughtText : "Doctor Who?!"
    }
]

const seedUsers = async() => {
    await db.dropCollection('users');

    await User.create(userData)
    
}

const seedThoughts = async  () => {
    await db.dropCollection('thoughts');
    let users = await User.find({})
    
    users = users.map(user => user._id)
    console.log(users)
    thoughtData.forEach(thought => {
      thought['createdBy'] = users[Math.floor(Math.random() * users.length)]
    })

    await Thought.create(thoughtData)
    
}

db.once('open', async () => {
    console.log('Database Connected');
    await seedUsers()
    await seedThoughts()
    console.log('Database Seeded');
    process.exit(0);
})
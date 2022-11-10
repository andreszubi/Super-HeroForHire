# Super-HeroForHire by Andres Zubizarreta and Tatiana Toledo

# Description
We wanted to create a website for people who have a very busy life schedule and who want to improve their life's quality by spending less time on looking for someone to do a job for them and to also help them out to cut out from their time, having to commute to another place in order to make their life's easier. The purpose of the website is for professionals to sign up and advertise their services offered as well a price. Then the client would create a profile and look for a professional who is offering the services for which they are searching for.
# User Stories

As as user I would like a page which facilitates me to find a professional in a quick manner to come and assist me with any help I may need at home or to not have to commute to another place to receive a service , since I have a very tight agenda.

The website login and signup I like for it to be simple and clean, making it easy to use.

When I search for a professional I want it to be quick to choose from and show me the reselts.

I want the professional to receive my request as soon as possible and to be contacted by the professional in a quick manner.

I want to be able to edit my profile as well as delete it as I see fit.

# Backlog
We would like to implement a messaging system between the client and the professional.
# Routes
Home route, Client-Logged Rotes & Professional logged routes
# Models
const clientSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (value) => {
        const emailRegex = /@/;
        return emailRegex.test(value);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalcode: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
});

const Client = model("Client", clientSchema);


const proSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (value) => {
        const emailRegex = /@/;
        return emailRegex.test(value);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalcode: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  services: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const Professional = model("Professional", proSchema);
# Trello
https://trello.com/b/mixw5hho/project-2



# Git & Cyclic
Repository link:
https://github.com/andreszubi/Super-HeroForHire


Deploy link:

https://bright-gold-bee.cyclic.app/

# Slides

https://docs.google.com/presentation/d/1GTvOjIYCE_cBeTKB6GGCHHztVFPigvsywyOoOx6LwyM/edit?usp=sharing
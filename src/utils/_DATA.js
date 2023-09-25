
let users = {
  shinichiKudo: {
    id: 'shinichiKudo',
    name: 'Shinichi Kudo',
    avatarURL: '/images/avatars/conan.jpg',
    answers: {
      '8xf0y6ziyjabvozdd253nd': 'optionOne',
      '6ni6ok3ym7mf1p33lnez': 'optionTwo',
      am8ehyc8byjqgar0jgpub9: 'optionTwo',
      loxhs1bqm25b708cmbf3g: 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  ranMori: {
    id: 'ranMori',
    name: 'Ran Mori',
    avatarURL: '/images/avatars/ran.jpg',
    answers: {
      vthrdm985a262al8qx3do: 'optionOne',
      xj352vofupe1dqz9emx13r: 'optionTwo'
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do']
  },
  kogoroMori: {
    id: 'kogoroMori',
    name: 'Kogoro Mori',
    avatarURL: '/images/avatars/mori.jpg',
    answers: {
      xj352vofupe1dqz9emx13r: 'optionOne',
      vthrdm985a262al8qx3do: 'optionTwo',
      '6ni6ok3ym7mf1p33lnez': 'optionTwo'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r']
  },
  haibaraAi: {
    id: 'haibaraAi',
    name: 'Haibara Ai',
    avatarURL: '/images/avatars/hibarra.jpg',
    answers: {
      xj352vofupe1dqz9emx13r: 'optionOne',
      vthrdm985a262al8qx3do: 'optionTwo',
      '6ni6ok3ym7mf1p33lnez': 'optionTwo'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r']
  }
};

let questions = {
  '8xf0y6ziyjabvozdd253nd': {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'shinichiKudo',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['shinichiKudo'],
      text: 'have horrible short term memory'
    },
    optionTwo: {
      votes: [],
      text: 'have horrible long term memory'
    }
  },
  '6ni6ok3ym7mf1p33lnez': {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'kogoroMori',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'become a superhero'
    },
    optionTwo: {
      votes: ['kogoroMori', 'shinichiKudo', 'haibaraAi'],
      text: 'become a supervillain'
    }
  },
  am8ehyc8byjqgar0jgpub9: {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'shinichiKudo',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'be telekinetic'
    },
    optionTwo: {
      votes: ['shinichiKudo'],
      text: 'be telepathic'
    }
  },
  loxhs1bqm25b708cmbf3g: {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'ranMori',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'be a front-end developer'
    },
    optionTwo: {
      votes: ['shinichiKudo'],
      text: 'be a back-end developer'
    }
  },
  vthrdm985a262al8qx3do: {
    id: 'vthrdm985a262al8qx3do',
    author: 'ranMori',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['ranMori'],
      text: 'find $50 yourself'
    },
    optionTwo: {
      votes: ['kogoroMori','haibaraAi'],
      text: 'have your best friend find $500'
    }
  },
  xj352vofupe1dqz9emx13r: {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'kogoroMori',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['kogoroMori', 'haibaraAi'],
      text: 'write JavaScript'
    },
    optionTwo: {
      votes: ['ranMori'],
      text: 'write Swift'
    }
  }
};
  
  function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
  
  export function _getUsers () {
    return new Promise((resolve) => {
      setTimeout(() => resolve({...users}), 1000)
    })
  }
  
  export function _getQuestions () {
    return new Promise((resolve) => {
      setTimeout(() => resolve({...questions}), 1000)
    })
  }
  
  function formatQuestion ({ optionOneText, optionTwoText, author }) {
    return {
      id: generateUID(),
      timestamp: Date.now(),
      author,
      optionOne: {
        votes: [],
        text: optionOneText,
      },
      optionTwo: {
        votes: [],
        text: optionTwoText,
      }
    }
  }
  
  export function _saveQuestion (question) {
    return new Promise((resolve, reject) => {
      if (!question.optionOneText || !question.optionTwoText || !question.author) {
        reject("Please provide optionOneText, optionTwoText, and author");
      }
  
      const formattedQuestion = formatQuestion(question)
      setTimeout(() => {
        questions = {
          ...questions,
          [formattedQuestion.id]: formattedQuestion
        }
  
        resolve(formattedQuestion)
      }, 1000)
    })
  }
  
  export function _saveQuestionAnswer ({ authUser, questionId, answer }) {
    return new Promise((resolve, reject) => {
      if (!authUser || !questionId || !answer) {
        reject("Please provide authUser, questionId, and answer");
      }
  
      setTimeout(() => {
        users = {
          ...users,
          [authUser]: {
            ...users[authUser],
            answers: {
              ...users[authUser].answers,
              [questionId]: answer
            }
          }
        }
  
        questions = {
          ...questions,
          [questionId]: {
            ...questions[questionId],
            [answer]: {
              ...questions[questionId][answer],
              votes: questions[questionId][answer].votes.concat([authUser])
            }
          }
        }
  
        resolve(true)
      }, 1000)
    })
  }
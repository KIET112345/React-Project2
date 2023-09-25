import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";

describe("_saveQuestion", () => {
  it("will return an error message", async () => {
    await expect(_saveQuestion({})).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  it("will return the saved question", async () => {
    const author = "shinichiKudo";
    const optionOneText = "books";
    const optionTwoText = "films";
    const question = { author, optionOneText, optionTwoText };
    const expectation = {
      author: author,
      optionOne: {
        text: optionOneText,
      },
      optionTwo: {
        text: optionTwoText,
      },
    };

    await expect(_saveQuestion(question)).resolves.toMatchObject(expectation);
  });
});

describe("_saveQuestionAnswer", () => {
  it("will verify that true is returned when correct data is passed", async () => {
    const authedUser = "sarahedo";
    const questionId = "am8ehyc8byjqgar0jgpub9";
    const answer = "optionTwo";
    const questionAnswer = { authedUser, questionId, answer };
    await expect(_saveQuestionAnswer(questionAnswer)).resolves.toBe(true);
  });

  it("will return an error message", async () => {
    await expect(_saveQuestionAnswer({})).rejects.toEqual(
      "Please provide authedUser, questionId, and answer"
    );
  });
});

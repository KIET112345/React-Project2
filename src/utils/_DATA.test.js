import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";

describe("_saveQuestion", () => {
  it("will return the saved question and populate all expected fields", async () => {
    const author = "shinichiKudo";
    const optionOneText = "be telekinetic 1";
    const optionTwoText = "be telekinetic 2";
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

  it("will return an error", async () => {
    await expect(_saveQuestion({})).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});


describe("_saveQuestionAnswer", () => {
  it("will verify that true is returned when correct data is passed", async () => {
    const authUser = "shinichiKudo";
    const questionId = "8xf0y6ziyjabvozdd253nd";
    const answer = "optionOne";
    const questionAnswer = { authUser, questionId, answer };
    await expect(_saveQuestionAnswer(questionAnswer)).resolves.toBe(true);
  });

  it("will return an error", async () => {
    await expect(_saveQuestionAnswer({})).rejects.toEqual(
      "Please provide authUser, questionId, and answer"
    );
  });
});
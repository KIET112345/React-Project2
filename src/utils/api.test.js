import { getInitialData, saveQuestion, saveQuestionAnswer } from "./api";

describe("saveQuestion", () => {
  it("will save question", async () => {
    const author = "zoshikanlu";
    const optionOneText = "Option 1";
    const optionTwoText = "Option 2";
    const question = await saveQuestion({
      author,
      optionOneText,
      optionTwoText,
    });

    expect(question).toBeDefined();
  });
});

describe("getInitialData", () => {
  it("will get initial data for app", async () => {
    const { users, questions } = await getInitialData();
    expect(users).toBeDefined();
    expect(questions).toBeDefined();
  });
});

describe("saveQuestionAnswer", () => {
  it("will save the answer to a question", async () => {
    const authUser = "sarahedo";
    const questionId = "6ni6ok3ym7mf1p33lnez";
    const answer = "optionTwo";
    const questionAnswer = await saveQuestionAnswer(
      authUser,
      questionId,
      answer
    );

    expect(questionAnswer).toBe(true);
  });

  it("will return an error message", async () => {
    await expect(saveQuestionAnswer()).rejects.toEqual(
      "Please provide authedUser, questionId, and answer"
    );
  });
});

import { getInitialData, saveQuestion, saveQuestionAnswer } from "./api";

describe("getInitialData", () => {
  it("will load initial data", async () => {
    const { users, questions } = await getInitialData();

    expect(users).toBeDefined();
    expect(questions).toBeDefined();
  });
});


describe("saveQuestion", () => {
  it("will save the question", async () => {
    const author = "shinichiKudo";
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


describe("saveQuestionAnswer", () => {
  it("will save the answer to a question", async () => {
    const authUser = "shinichiKudo";
    const questionId = "8xf0y6ziyjabvozdd253nd";
    const answer = "optionTwo";
    const questionAnswer = await saveQuestionAnswer(authUser, questionId, answer);

    expect(questionAnswer).toBe(true);
  });
});
import { onAddQuestion, ADD_QUESTION  } from "./questions";
  
describe("onAddQuestion", () => {
    it("will create an action of type: " + 'ADD_QUESTION', () => {
      const question = { question: "question" };
      const expectation = {
        type: 'ADD_QUESTION',
        question,
      };
  
      expect(onAddQuestion(question)).toEqual(expectation);
    });
});
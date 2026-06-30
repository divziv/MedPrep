// Shuffling algorithms for questions and options

/**
 * Standard Fisher-Yates shuffle algorithm.
 * @param {Array} array 
 * @returns {Array} Shuffled shallow copy of the array.
 */
export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Shuffles questions, and for each question, shuffles options
 * and dynamically recalculates the correct option index.
 * @param {Array} questions - Array of question objects
 * @returns {Array} Shuffled questions with shuffled options
 */
export function shuffleQuiz(questions) {
  // First shuffle the questions
  const shuffledQuestions = shuffleArray(questions);

  // For each question, shuffle its options and update the correct index
  return shuffledQuestions.map(q => {
    const originalOptions = q.options;
    const correctText = originalOptions[q.correct];
    
    // Shuffle options
    const shuffledOptions = shuffleArray(originalOptions);
    
    // Find new correct index
    const newCorrectIndex = shuffledOptions.indexOf(correctText);

    return {
      ...q,
      options: shuffledOptions,
      correct: newCorrectIndex,
      originalCorrectIndex: q.correct // Stashing for reference if needed
    };
  });
}

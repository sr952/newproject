const questions = [
  {
    q: "series in pandas is a?",
    options: ["1d array", "2d array", "3d array"],
    answer: "1d array"
  },
  {
    q: " flask is a ____ framework?",
    options: ["micro", "mini", "macro"],
    answer: "micro"
  },
  {
    q: "5+3x2?",
    options: ["11", "10", "14"],
    answer: "11"
  }
];

const quizBox = document.getElementById("quiz-box");

// 🔹 Render Questions
questions.forEach((q, index) => {
  const div = document.createElement("div");
  div.classList.add("question");

  div.innerHTML = `
    <p>${index + 1}. ${q.q}</p>
    ${q.options.map(opt => `
      <label>
        <input type="radio" name="q${index}" value="${opt}">
        ${opt}
      </label><br>
    `).join("")}
  `;

  quizBox.appendChild(div);
});

// 🔹 Submit Quiz
async function submitQuiz() {
  let score = 0;

  questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  // Show result
  document.getElementById("result").innerText = "Score: " + score;

  // Send to backend
  try {
    const res = await fetch(`${BASE_URL}/save-score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ score })
    });

    const data = await res.json();
    console.log("Saved:", data);
  } catch (err) {
    console.log("Error:", err);
  }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-corail',
  standalone: true,
  imports: [],
  templateUrl: './corail.component.html',
  styleUrl: './corail.component.scss'
})
export class CorailComponent {
  score = 0;
  displayedAnswers: { image: string; label: string; isCorrect: boolean }[] = [];

  public constructor(private router: Router) { }

  ngOnInit(){
    this.getRandomAnswers();
  }

  questions = [
    {
      answers: [
        { 
          image: 'corail/alimentation_corail/good/eau.png',
          label: 'Bonne réponse',
          isCorrect: true 
        },
        { 
          image: 'corail/alimentation_corail/good/plancton.png',
          label: 'Bonne réponse',
          isCorrect: true 
        },
        { 
          image: 'corail/alimentation_corail/good/poisson.png',
          label: 'Bonne reponse',
          isCorrect: true 
        },
        { 
          image: 'corail/alimentation_corail/good/poisson.png',
          label: 'Bonne réponse',
          isCorrect: true 
        },
        { 
          image: 'corail/alimentation_corail/bad/ancre.png',
          label: 'Mauvaise réponse',
          isCorrect: false 
        }, { 
          image: 'corail/alimentation_corail/bad/bouteille.png',
          label: 'Mauvaise réponse',
          isCorrect: false 
        },
        { 
          image: 'corail/alimentation_corail/bad/creme.png',
          label: 'Mauvaise réponse',
          isCorrect: false 
        }, 
        { 
          image: 'corail/alimentation_corail/bad/dechets.png',
          label: 'Mauvaise réponse',
          isCorrect: false 
        }, 
        { 
          image: 'corail/alimentation_corail/bad/pesticide.png',
          label: 'Mauvaise réponse',
          isCorrect: false 
        }
      ]
    },

  ];
  nbTotalQuestions = 5;
  nbCurrentQuestion = 0;
  currentQuestionIndex = 0;
  isOceanMode = true;

  toggleMode() {
    this.isOceanMode = !this.isOceanMode;
  }
  getRandomAnswers() {
    const correctAnswers = this.questions[this.currentQuestionIndex].answers.filter(answer => answer.isCorrect);
    const incorrectAnswers = this.questions[this.currentQuestionIndex].answers.filter(answer => !answer.isCorrect);

    const randomCorrectAnswer = correctAnswers[Math.floor(Math.random() * correctAnswers.length)];
    const randomIncorrectAnswer = incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)];

    this.displayedAnswers = [randomCorrectAnswer, randomIncorrectAnswer].sort(() => Math.random() - 0.5); // Mélange aléatoire
  }

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  selectAnswer(answer: { image: string; label: string; isCorrect: boolean }) {
    if (answer.isCorrect) {
      this.score++;
    }
    this.nextQuestion();
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.nbTotalQuestions) {
      
      this.getRandomAnswers();
      this.nbCurrentQuestion++;
      
    }
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  restartGame() {
    this.score = 0;
    this.nbCurrentQuestion = 0;
    this.currentQuestionIndex = 0;
    this.getRandomAnswers();
  }



}

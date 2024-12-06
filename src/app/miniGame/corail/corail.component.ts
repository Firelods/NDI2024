import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GameService } from '../../game.service';

@Component({
    selector: 'app-corail',
    standalone: true,
    imports: [MatSlideToggleModule, MatButtonToggleModule, FormsModule],
    templateUrl: './corail.component.html',
    styleUrl: './corail.component.scss',
})
export class CorailComponent {
    score = 0;
    displayedAnswers: { image: string; label: string; isCorrect: boolean }[] =
        [];
    readonly dialog: MatDialog = inject(MatDialog);

    public constructor(
        private router: Router,
        private gameService: GameService,
    ) {}

    ngOnInit() {
        this.getRandomAnswers();
    }

    questions = [
        {
            answers: [
                {
                    image: 'corail/alimentation_corail/good/eau.png',
                    label: 'Bonne réponse',
                    isCorrect: true,
                },
                {
                    image: 'corail/alimentation_corail/good/plancton.png',
                    label: 'Bonne réponse',
                    isCorrect: true,
                },
                {
                    image: 'corail/alimentation_corail/good/poisson.png',
                    label: 'Bonne reponse',
                    isCorrect: true,
                },
                {
                    image: 'corail/alimentation_corail/good/poisson.png',
                    label: 'Bonne réponse',
                    isCorrect: true,
                },
                {
                    image: 'corail/alimentation_corail/bad/ancre.png',
                    label: 'Mauvaise réponse',
                    isCorrect: false,
                },
                {
                    image: 'corail/alimentation_corail/bad/bouteille.png',
                    label: 'Mauvaise réponse',
                    isCorrect: false,
                },
                {
                    image: 'corail/alimentation_corail/bad/creme.png',
                    label: 'Mauvaise réponse',
                    isCorrect: false,
                },
                {
                    image: 'corail/alimentation_corail/bad/dechets.png',
                    label: 'Mauvaise réponse',
                    isCorrect: false,
                },
                {
                    image: 'corail/alimentation_corail/bad/pesticide.png',
                    label: 'Mauvaise réponse',
                    isCorrect: false,
                },
            ],
        },
    ];

    humanQuestions = [
        {
            answers: [
                {
                    image: 'corail/alimentation_humain/good/brocolis.png',
                    label: 'Bonne réponse',
                    isCorrect: true,
                },
                {
                    image: 'corail/alimentation_humain/good/citron.png',
                    label: 'Bonne réponse',
                    isCorrect: true,
                },
                {
                    image: 'corail/alimentation_humain/good/concombre.png',
                    label: 'Bonne réponse',
                    isCorrect: true,
                },
                {
                    image: 'corail/alimentation_humain/good/peche.png',
                    label: 'Bonne réponse',
                    isCorrect: true,
                },
                {
                    image: 'corail/alimentation_humain/good/salade.png',
                    label: 'Bonne réponse',
                    isCorrect: true,
                },
                {
                    image: 'corail/alimentation_humain/bad/azote.png',
                    label: 'Mauvaise réponse',
                    isCorrect: false,
                },
                {
                    image: 'corail/alimentation_humain/bad/bonbon.png',
                    label: 'Mauvaise réponse',
                    isCorrect: false,
                },
                {
                    image: 'corail/alimentation_humain/bad/burger.png',
                    label: 'Mauvaise réponse',
                    isCorrect: false,
                },
                {
                    image: 'corail/alimentation_humain/bad/chips.png',
                    label: 'Mauvaise réponse',
                    isCorrect: false,
                },
                {
                    image: 'corail/alimentation_humain/bad/tabac.png',
                    label: 'Mauvaise réponse',
                    isCorrect: false,
                },
            ],
        },
    ];

    nbTotalQuestions = 10;
    scoreCorail = 0;
    scoreHuman = 0;
    nbTotalCorailQuestions = 5;
    nbTotalHumanQuestions = 5;
    nbCurrentQuestionCorail = 0;
    nbCurrentQuestionHuman = 0;
    currentQuestionIndex = 0;
    isOceanMode = true;
    chosenOption: string = 'corail';

    toggleMode(event: any) {
        if (event.value === 'corail') {
            this.isOceanMode = true;
        } else {
            this.isOceanMode = false;
        }

        this.getRandomAnswers();
    }

    getRandomAnswers() {
        if (this.isOceanMode) {
            const correctAnswers = this.questions[
                this.currentQuestionIndex
            ].answers.filter((answer) => answer.isCorrect);
            const incorrectAnswers = this.questions[
                this.currentQuestionIndex
            ].answers.filter((answer) => !answer.isCorrect);

            const randomCorrectAnswer =
                correctAnswers[
                    Math.floor(Math.random() * correctAnswers.length)
                ];
            const randomIncorrectAnswer =
                incorrectAnswers[
                    Math.floor(Math.random() * incorrectAnswers.length)
                ];

            this.displayedAnswers = [
                randomCorrectAnswer,
                randomIncorrectAnswer,
            ].sort(() => Math.random() - 0.5); // Mélange aléatoire
        } else {
            const correctAnswers = this.humanQuestions[
                this.currentQuestionIndex
            ].answers.filter((answer) => answer.isCorrect);
            const incorrectAnswers = this.humanQuestions[
                this.currentQuestionIndex
            ].answers.filter((answer) => !answer.isCorrect);

            const randomCorrectAnswer =
                correctAnswers[
                    Math.floor(Math.random() * correctAnswers.length)
                ];
            const randomIncorrectAnswer =
                incorrectAnswers[
                    Math.floor(Math.random() * incorrectAnswers.length)
                ];

            this.displayedAnswers = [
                randomCorrectAnswer,
                randomIncorrectAnswer,
            ].sort(() => Math.random() - 0.5); // Mélange aléatoire
        }
    }

    get currentQuestion() {
        if (this.isOceanMode) {
            return this.questions[this.currentQuestionIndex];
        } else {
            return this.humanQuestions[this.currentQuestionIndex];
        }
    }

    selectAnswer(answer: { image: string; label: string; isCorrect: boolean }) {
        if (answer.isCorrect) {
            if (this.isOceanMode) {
                this.scoreCorail++;
            } else {
                this.scoreHuman++;
            }
            this.score++;
        }
        this.nextQuestion();
    }

    nextQuestion() {
        if (
            this.isOceanMode &&
            this.currentQuestionIndex < this.nbTotalCorailQuestions
        ) {
            this.getRandomAnswers();
            this.nbCurrentQuestionCorail++;
        } else if (
            !this.isOceanMode &&
            this.currentQuestionIndex < this.nbTotalHumanQuestions
        ) {
            this.getRandomAnswers();
            this.nbCurrentQuestionHuman++;
        }
    }

    goToHome() {
        this.router.navigate(['/']);
    }

    goToMenu() {
        this.gameService.incrementCompletedGames();
        this.router.navigate(['/']);
    }
}

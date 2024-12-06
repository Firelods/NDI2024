import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgForOf, NgStyle } from '@angular/common';
import { GenericGaugeComponent } from './genericJauge/generic-gauge.component';
import { Router } from '@angular/router';
import { GameService } from '../../game.service';

@Component({
    selector: 'app-jauges',
    standalone: true,
    imports: [FormsModule, NgClass, GenericGaugeComponent, NgForOf, NgStyle],
    templateUrl: './jauges.component.html',
    styleUrls: ['./jauges.component.scss'],
})
export class JaugesComponent implements OnInit, OnDestroy {
    gaugeConfigurations = {
        human: [
            { label: 'IMC', value: 18.5, min: 10, max: 50, unit: '' },
            {
                label: 'Température',
                value: 36.6,
                min: 28,
                max: 41.1,
                unit: '°C',
            },
            { label: 'Pouls', value: 60, min: 30, max: 200, unit: 'bpm' },
        ],
        ocean: [
            { label: 'CO2', value: 200, min: 200, max: 500, unit: 'ppm' },
            { label: 'O2', value: 8, min: 5, max: 10, unit: 'mg/L' },
            { label: 'NaCl', value: 35, min: 20, max: 50, unit: 'ppt' },
        ],
    };

    selectedType: 'human' | 'ocean' = 'human';
    gauges: any[] = [];
    clues: string[] = [];
    currentClue: string = '';
    clueInterval: any;
    oceanIsHappy = false;
    humanIsHappy = false;
    oceanBodyClassIsHappy = false;
    humanBodyClassIsHappy = false;

    constructor(
        private router: Router,
        private gameService: GameService,
    ) {}

    ngOnInit(): void {
        this.randomizeGaugeValues();
        this.switchType(this.selectedType);
        this.startClueRotation();
    }

    ngOnDestroy(): void {
        this.stopClueRotation();
    }

    // Helper function to get a random value between min and max
    getRandomValue(min: number, max: number): number {
        return parseFloat((Math.random() * (max - min) + min).toFixed(2));
    }

    // Randomize values for all gauges (human and ocean)
    randomizeGaugeValues(): void {
        this.gaugeConfigurations.human.forEach((gauge) => {
            gauge.value = this.getRandomValue(gauge.min, gauge.max);
        });

        this.gaugeConfigurations.ocean.forEach((gauge) => {
            gauge.value = this.getRandomValue(gauge.min, gauge.max);
        });
    }

    switchType(type: 'human' | 'ocean'): void {
        this.selectedType = type;
        this.gauges = this.gaugeConfigurations[type];
        this.updateClues(type);
        this.backgroundImage();
    }

    updateClues(type: 'human' | 'ocean'): void {
        if (type === 'human') {
            this.clues = [
                'A healthy BMI (18.5–24.9) is important for overall well-being. Very low or very high BMI values indicate severe health concerns.',
                'A normal body temperature lies between 36.1°C and 37.2°C. Too low indicates hypothermia, while too high might be feverish.',
                'A pulse rate between 50 and 70 bpm is ideal. Lower than 50 might indicate bradycardia, while above 100 is a sign of tachycardia.',
            ];
        } else if (type === 'ocean') {
            this.clues = [
                'CO2 levels under 250 ppm are optimal for ocean health. Above 400 ppm, the ocean becomes acidified, which harms marine life.',
                'Oxygen levels above 7 mg/L are crucial for marine ecosystems. Below 5 mg/L, it becomes hypoxic and endangers aquatic species.',
                'The salinity (NaCl) range of 30-40 ppt is ideal for marine balance. Values outside this range disrupt ecosystems.',
            ];
        }
        this.currentClue = this.clues[0];
    }

    startClueRotation(): void {
        this.clueInterval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * this.clues.length);
            this.currentClue = this.clues[randomIndex];
        }, 5000);
    }

    stopClueRotation(): void {
        if (this.clueInterval) {
            clearInterval(this.clueInterval);
        }
    }

    getMood(imc: number, temp: number, pulse: number): string {
        let imcMood = '';
        if (imc < 16) {
            imcMood = 'very sad';
        } else if (imc >= 16 && imc < 18.5) {
            imcMood = 'sad';
        } else if (imc >= 18.5 && imc < 22) {
            imcMood = 'happy';
        } else if (imc >= 22 && imc <= 24.9) {
            imcMood = 'neutral';
        } else if (imc > 24.9 && imc <= 29.9) {
            imcMood = 'neutral';
        } else if (imc > 29.9 && imc <= 34.9) {
            imcMood = 'sad';
        } else if (imc > 34.9) {
            imcMood = 'very sad';
        }

        let tempMood = '';
        if (temp < 32) {
            tempMood = 'very sad';
        } else if (temp >= 32 && temp < 36.1) {
            tempMood = 'sad';
        } else if (temp >= 36.1 && temp <= 37.2) {
            tempMood = 'happy';
        } else if (temp > 37.2 && temp <= 39) {
            tempMood = 'neutral';
        } else if (temp > 39 && temp <= 40) {
            tempMood = 'sad';
        } else {
            tempMood = 'very sad';
        }

        let pulseMood = '';
        if (pulse < 40) {
            pulseMood = 'very sad';
        } else if (pulse >= 40 && pulse < 50) {
            pulseMood = 'sad';
        } else if (pulse >= 50 && pulse <= 70) {
            pulseMood = 'happy';
        } else if (pulse > 70 && pulse <= 85) {
            pulseMood = 'neutral';
        } else if (pulse > 85 && pulse <= 100) {
            pulseMood = 'neutral';
        } else if (pulse > 100 && pulse <= 120) {
            pulseMood = 'sad';
        } else {
            pulseMood = 'very sad';
        }

        const combinedMoods = [imcMood, tempMood, pulseMood];

        const happyCount = combinedMoods.filter(
            (mood) => mood === 'happy',
        ).length;
        const sadCount = combinedMoods.filter((mood) => mood === 'sad').length;
        const verySadCount = combinedMoods.filter(
            (mood) => mood === 'very sad',
        ).length;
        const neutralCount = combinedMoods.filter(
            (mood) => mood === 'neutral',
        ).length;

        if (verySadCount >= 2) {
            return '😞';
        } else if (sadCount >= 2) {
            return '😞';
        } else if (happyCount === 3) {
            this.humanIsHappy = true;
            return '😊';
        } else if (happyCount === 2 && neutralCount === 1) {
            this.humanIsHappy = true;
            return '😊';
        } else if (neutralCount === 3) {
            return '😐';
        } else if (sadCount === 1 && neutralCount === 2) {
            return '😐';
        } else if (neutralCount === 2 && happyCount === 1) {
            return '😐';
        } else {
            return '😞';
        }
    }

    getMoodOcean(co2: number, o2: number, nacl: number): string {
        let co2Mood = '';
        if (co2 < 250) {
            co2Mood = 'happy';
        } else if (co2 >= 250 && co2 < 400) {
            co2Mood = 'neutral';
        } else if (co2 >= 400) {
            co2Mood = 'very sad';
        }

        let o2Mood = '';
        if (o2 > 7) {
            o2Mood = 'happy';
        } else if (o2 >= 5 && o2 <= 7) {
            o2Mood = 'neutral';
        } else if (o2 < 5) {
            o2Mood = 'very sad';
        }

        let naclMood = '';
        if (nacl >= 30 && nacl <= 40) {
            naclMood = 'happy';
        } else if (nacl < 30 || nacl > 40) {
            naclMood = 'sad';
        }

        const combinedMoods = [co2Mood, o2Mood, naclMood];

        const happyCount = combinedMoods.filter(
            (mood) => mood === 'happy',
        ).length;
        const sadCount = combinedMoods.filter((mood) => mood === 'sad').length;
        const verySadCount = combinedMoods.filter(
            (mood) => mood === 'very sad',
        ).length;
        const neutralCount = combinedMoods.filter(
            (mood) => mood === 'neutral',
        ).length;

        if (verySadCount >= 2) {
            return '🌊😞';
        } else if (sadCount >= 2) {
            return '🌊😞';
        } else if (happyCount === 3) {
            this.oceanIsHappy = true;
            return '🌊😊';
        } else if (happyCount === 2 && neutralCount === 1) {
            this.oceanIsHappy = true;
            return '🌊😊';
        } else if (neutralCount === 3) {
            return '🌊😐';
        }

        return '🌊😞';
    }

    getBodyClass(imc: number, temp: number, pulse: number): string {
        let bodyClass = '';

        if (imc < 16 || temp < 32 || pulse < 40) {
            bodyClass += ' very-sad';
        } else if (imc < 18.5 || temp < 36.1 || pulse < 50) {
            bodyClass += ' sad';
        } else if (
            imc >= 18.5 &&
            imc <= 24.9 &&
            temp >= 36.1 &&
            temp <= 37.2 &&
            pulse >= 50 &&
            pulse <= 70
        ) {
            bodyClass += ' happy';
            this.humanBodyClassIsHappy = true;
        } else {
            bodyClass += ' neutral';
        }

        if (pulse < 50) {
            bodyClass += ' sitting';
        } else if (imc > 30) {
            bodyClass += ' laying';
        } else {
            bodyClass += ' standing';
        }

        return bodyClass;
    }

    getBodyClassOcean(co2: number, o2: number, nacl: number): string {
        let bodyClass = '';

        if (co2 > 400 || o2 < 5 || nacl < 30 || nacl > 40) {
            bodyClass += ' very-sad';
        } else if (
            (co2 >= 250 && co2 <= 400) ||
            (o2 >= 5 && o2 <= 7) ||
            (nacl >= 20 && nacl < 30)
        ) {
            bodyClass += ' sad';
        } else if (co2 < 250 && o2 > 7 && nacl >= 30 && nacl <= 40) {
            bodyClass += ' happy';
            this.oceanBodyClassIsHappy = true;
        } else {
            bodyClass += ' neutral';
        }

        if (o2 < 5) {
            bodyClass += ' endangered';
        }

        if (co2 > 400) {
            bodyClass += ' acidified';
        }

        return bodyClass;
    }

    updateGauge(value: number, gauge: any): void {
        if (value >= gauge.min && value <= gauge.max) {
            gauge.value = value;
        }
    }

    backgroundImage() {
        const html = document.getElementsByTagName('html')[0];
        const body = document.body;
        if (this.selectedType === 'ocean') {
            html.style.backgroundImage = "url('jauge/ocean_background.jpg')";
            body.classList.add('ocean');
            body.classList.remove('human');
        } else {
            html.style.backgroundImage = "url('jauge/human_background.jpg')";
            body.classList.add('human');
            body.classList.remove('ocean');
        }

        html.style.backgroundPosition = 'center center';
        html.style.backgroundRepeat = 'no-repeat';
        html.style.backgroundSize = 'cover';
        html.style.backgroundAttachment = 'fixed';
    }

    goToHome() {
        this.gameService.incrementCompletedGames();
        this.router.navigate(['/']);
    }

    restartGame() {
        this.oceanIsHappy = false;
        this.humanIsHappy = false;
        this.oceanBodyClassIsHappy = false;
        this.humanBodyClassIsHappy = false;
        this.randomizeGaugeValues();
        this.switchType(this.selectedType);
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-jauges',
    standalone: true,
    imports: [FormsModule, NgClass],
    templateUrl: './jauges.component.html',
    styleUrls: ['./jauges.component.scss'],
})
export class JaugesComponent implements OnInit, OnDestroy {
    imcValue: number = 18.5;
    tempValue: number = 36.6;
    pulseValue: number = 60;

    clues: string[] = [
        'A healthy BMI (18.5–24.9) is important for overall well-being.',
        'A normal temperature (36.1°C - 37.2°C) is crucial for your body to function properly.',
        'A pulse rate between 60 and 100 beats per minute is normal for most adults.',
        'Extreme temperature (either too high or too low) can be harmful to your health.',
        'Overweight (BMI above 25) can increase the risk of many health issues.',
        'Low pulse rate (under 50 bpm) could be a sign of bradycardia.'
    ];

    currentClue: string = this.clues[0];
    clueInterval: any;

    ngOnInit(): void {
        // Change clue every 5 seconds
        this.clueInterval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * this.clues.length);
            this.currentClue = this.clues[randomIndex];
        }, 5000);
    }

    ngOnDestroy(): void {
        // Clear interval when the component is destroyed
        if (this.clueInterval) {
            clearInterval(this.clueInterval);
        }
    }

    calculateRotation(value: number): string {
        if (value >= 0 && value <= 100) {
            const rotation = value * 1.8 - 45;
            return `rotate(${rotation}deg)`;
        }
        return 'rotate(-45deg)';
    }

    getGaugePercentage(value: number): string {
        return `${value}%`;
    }

    calculateCopyRotation(value: number): string {
        const rotation = value * 1.8;
        return `translate(-50%, -50%) rotate(${rotation}deg)`;
    }

    updateGauge(value: number, type: string): void {
        if (value < 0 || value > 100) {
            return;  // If the value is invalid, don't update
        }

        switch (type) {
            case 'imc':
                this.imcValue = value;
                break;
            case 'temp':
                this.tempValue = value;
                break;
            case 'pulse':
                this.pulseValue = value;
                break;
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

        // Mix moods to get a more nuanced result
        const combinedMoods = [imcMood, tempMood, pulseMood];

        const happyCount = combinedMoods.filter(mood => mood === 'happy').length;
        const sadCount = combinedMoods.filter(mood => mood === 'sad').length;
        const verySadCount = combinedMoods.filter(mood => mood === 'very sad').length;
        const neutralCount = combinedMoods.filter(mood => mood === 'neutral').length;

        // Define composite mood based on the mix of health indicators
        if (verySadCount >= 2) {
            return '😞'; // Mostly very sad
        } else if (sadCount >= 2) {
            return '😞'; // Mostly sad
        } else if (happyCount === 3) {
            return '😊'; // All happy
        } else if (happyCount === 2 && neutralCount === 1) {
            return '😊'; // Mostly happy, with a neutral factor
        } else if (neutralCount === 3) {
            return '😐'; // All neutral
        } else if (sadCount === 1 && neutralCount === 2) {
            return '😐'; // One sad, two neutral
        } else if (neutralCount === 2 && happyCount === 1) {
            return '😐'; // One happy, two neutral
        } else {
            return '😞'; // Default fallback for mixed sad-neutral combinations
        }
    }


    getBodyClass(imc: number, temp: number, pulse: number): string {
        let bodyClass = '';

        // Determine body mood based on IMC, temperature, and pulse
        if (imc < 16 || temp < 32 || pulse < 40) {
            bodyClass += ' very-sad';
        } else if (imc < 18.5 || temp < 36.1 || pulse < 50) {
            bodyClass += ' sad';
        } else if (imc >= 18.5 && imc <= 24.9 && temp >= 36.1 && temp <= 37.2 && pulse >= 50 && pulse <= 70) {
            bodyClass += ' happy';
        } else {
            bodyClass += ' neutral';
        }

        // Add posture class based on values, for example:
        if (pulse < 50) {
            bodyClass += ' sitting'; // Low pulse can represent sitting posture
        } else if (imc > 30) {
            bodyClass += ' laying'; // High IMC can represent laying posture
        } else {
            bodyClass += ' standing'; // Default posture
        }

        return bodyClass;
    }
}

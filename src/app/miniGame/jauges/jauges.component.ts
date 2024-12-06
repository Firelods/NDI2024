import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgStyle} from '@angular/common';
import {GenericGaugeComponent} from './genericJauge/generic-gauge.component';

@Component({
    selector: 'app-jauges',
    standalone: true,
    imports: [FormsModule, NgClass, GenericGaugeComponent, NgForOf, NgStyle],
    templateUrl: './jauges.component.html',
    styleUrls: ['./jauges.component.scss'],
})
export class JaugesComponent implements OnInit, OnDestroy {
    // Configurations for human and ocean gauges
    gaugeConfigurations = {
        human: [
            {label: 'IMC', value: 18.5, min: 10, max: 50, unit: ''},
            {label: 'Température', value: 36.6, min: 28, max: 41.1, unit: '°C'},
            {label: 'Pouls', value: 60, min: 30, max: 200, unit: 'bpm'},
        ],
        ocean: [
            {label: 'CO2', value: 200, min: 200, max: 500, unit: 'ppm'},  // Happy CO2 level
            {label: 'O2', value: 8, min: 5, max: 10, unit: 'mg/L'},         // Happy O2 level
            {label: 'NaCl', value: 35, min: 20, max: 50, unit: 'ppt'},       // Optimal salinity (NaCl)
        ],
    };

    selectedType: 'human' | 'ocean' = 'human';
    gauges: any[] = []; // Currently displayed gauges
    clues: string[] = []; // Clues for the selected type
    currentClue: string = '';
    clueInterval: any;

    ngOnInit(): void {
        this.randomizeGaugeValues();  // Randomize gauge values when component initializes
        this.switchType(this.selectedType);
        this.startClueRotation();
    }

    ngOnDestroy(): void {
        this.stopClueRotation();
    }

    // Helper function to get a random value between min and max
    getRandomValue(min: number, max: number): number {
        return parseFloat((Math.random() * (max - min) + min).toFixed(2));  // Limit to 2 decimal places
    }

    // Randomize values for all gauges (human and ocean)
    randomizeGaugeValues(): void {
        // Randomize human gauges
        this.gaugeConfigurations.human.forEach(gauge => {
            gauge.value = this.getRandomValue(gauge.min, gauge.max);
        });

        // Randomize ocean gauges
        this.gaugeConfigurations.ocean.forEach(gauge => {
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
                'A healthy BMI (18.5–24.9) is important for overall well-being.',
                'A normal temperature (36.1°C - 37.2°C) is crucial for your body.',
                'A pulse rate between 60 and 100 bpm is normal for adults.',
            ];
        } else if (type === 'ocean') {
            this.clues = [
                'CO2 levels should be under control to prevent ocean acidification.',
                'Oxygen levels below 5 mg/L can harm marine life.',
                'Optimal salinity (NaCl) is essential for ocean ecosystems.',
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

        const happyCount = combinedMoods.filter(mood => mood === 'happy').length;
        const sadCount = combinedMoods.filter(mood => mood === 'sad').length;
        const verySadCount = combinedMoods.filter(mood => mood === 'very sad').length;
        const neutralCount = combinedMoods.filter(mood => mood === 'neutral').length;

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

    getMoodOcean(co2: number, o2: number, nacl: number): string {
        let co2Mood = '';
        if (co2 < 250) {
            co2Mood = 'happy';  // Low CO2 levels are good
        } else if (co2 >= 250 && co2 < 400) {
            co2Mood = 'neutral';  // Acceptable CO2 levels
        } else if (co2 >= 400) {
            co2Mood = 'very sad';  // High CO2 levels cause ocean acidification
        }

        let o2Mood = '';
        if (o2 > 7) {
            o2Mood = 'happy';  // High oxygen levels are healthy for marine life
        } else if (o2 >= 5 && o2 <= 7) {
            o2Mood = 'neutral';  // Adequate oxygen
        } else if (o2 < 5) {
            o2Mood = 'very sad';  // Low oxygen levels harm marine life
        }

        let naclMood = '';
        if (nacl >= 30 && nacl <= 40) {
            naclMood = 'happy';  // Optimal salinity for marine ecosystems
        } else if (nacl < 30 || nacl > 40) {
            naclMood = 'sad';  // Extreme salinity values are harmful
        }

        const combinedMoods = [co2Mood, o2Mood, naclMood];

        const happyCount = combinedMoods.filter(mood => mood === 'happy').length;
        const sadCount = combinedMoods.filter(mood => mood === 'sad').length;
        const verySadCount = combinedMoods.filter(mood => mood === 'very sad').length;
        const neutralCount = combinedMoods.filter(mood => mood === 'neutral').length;

        // Return mood based on the majority
        if (verySadCount >= 2) {
            return '🌊😞'; // Ocean-themed very sad
        } else if (sadCount >= 2) {
            return '🌊😞'; // Ocean-themed sad
        } else if (happyCount === 3) {
            return '🌊😊'; // Ocean-themed happy
        } else if (happyCount === 2 && neutralCount === 1) {
            return '🌊😊'; // Ocean-themed mostly happy
        } else if (neutralCount === 3) {
            return '🌊😐'; // Ocean-themed neutral
        }

        return '🌊😞'; // Default fallback for mixed sad-neutral combinations
    }


    getBodyClass(imc: number, temp: number, pulse: number): string {
        let bodyClass = '';

        if (imc < 16 || temp < 32 || pulse < 40) {
            bodyClass += ' very-sad';
        } else if (imc < 18.5 || temp < 36.1 || pulse < 50) {
            bodyClass += ' sad';
        } else if (imc >= 18.5 && imc <= 24.9 && temp >= 36.1 && temp <= 37.2 && pulse >= 50 && pulse <= 70) {
            bodyClass += ' happy';
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

        // Define body class based on CO2, O2, and NaCl levels
        if (co2 > 400 || o2 < 5 || nacl < 30 || nacl > 40) {
            bodyClass += ' very-sad';  // Very poor conditions for marine life
        } else if ((co2 >= 250 && co2 <= 400) || (o2 >= 5 && o2 <= 7) || (nacl >= 20 && nacl < 30)) {
            bodyClass += ' sad';  // Moderate conditions for marine life
        } else if (co2 < 250 && o2 > 7 && nacl >= 30 && nacl <= 40) {
            bodyClass += ' happy';  // Ideal conditions for ocean ecosystems
        } else {
            bodyClass += ' neutral';  // Default if none of the above conditions match
        }

        // Additional conditions for how marine life interacts based on NaCl or O2 values
        if (o2 < 5) {
            bodyClass += ' endangered';  // High danger if O2 is too low
        }

        if (co2 > 400) {
            bodyClass += ' acidified';  // Too high CO2 levels cause ocean acidification
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
        const body = document.body; // Get the body element
        if (this.selectedType === 'ocean') {
            html.style.backgroundImage = "url('jauge/ocean_background.jpg')";
            body.classList.add('ocean');  // Add ocean-specific class
            body.classList.remove('human');  // Remove human-specific class
        } else {
            html.style.backgroundImage = "url('jauge/human_background.jpg')";
            body.classList.add('human');  // Add human-specific class
            body.classList.remove('ocean');  // Remove ocean-specific class
        }

        html.style.backgroundPosition = 'center center';
        html.style.backgroundRepeat = 'no-repeat';
        html.style.backgroundSize = 'cover';
        html.style.backgroundAttachment = 'fixed';
    }

}

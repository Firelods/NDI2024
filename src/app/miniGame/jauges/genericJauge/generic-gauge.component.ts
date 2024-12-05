import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-generic-gauge',
    templateUrl: './generic-gauge.component.html',
    styleUrls: ['./generic-gauge.component.scss'],
    imports: [
        FormsModule
    ],
    standalone: true
})
export class GenericGaugeComponent {
    @Input() label!: string;
    @Input() value!: number;
    @Input() min!: number;
    @Input() max!: number;
    @Input() unit!: string;

    @Output() valueChange = new EventEmitter<number>();

    calculateRotation(): string {
        const range = this.max - this.min;
        const percentage = ((this.value - this.min) / range) * 100;
        const rotation = percentage * 1.8 - 45;
        return `rotate(${rotation}deg)`;
    }

    onValueChange(newValue: number): void {
        if (newValue >= this.min && newValue <= this.max) {
            this.valueChange.emit(newValue);
        }
    }
}

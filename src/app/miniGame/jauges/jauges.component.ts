import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule

@Component({
  selector: 'app-jauges',
  standalone: true,
  imports: [FormsModule],  // Ajout de FormsModule ici
  templateUrl: './jauges.component.html',
  styleUrls: ['./jauges.component.scss'],
})
export class JaugesComponent {
  imcValue: number = 0;
  tempValue: number = 0;
  pulseValue: number = 0;

  // Méthode pour calculer la rotation de la jauge
  calculateRotation(value: number): string {
    if (value >= 0 && value <= 100) {
      const rotation = value * 1.8 - 45;
      return `rotate(${rotation}deg)`;
    }
    return 'rotate(-45deg)';
  }

  // Méthode pour obtenir le pourcentage de la jauge
  getGaugePercentage(value: number): string {
    return `${value}%`;
  }

  // Méthode pour calculer la rotation de l'élément "gauge-copy"
  calculateCopyRotation(value: number): string {
    const rotation = value * 1.8;
    return `translate(-50%, -50%) rotate(${rotation}deg)`;
  }

  // Méthode de validation des valeurs des jauges
  updateGauge(value: number, type: string): void {
    if (value < 0 || value > 100) {
      return;  // Si la valeur est invalide, on ne met pas à jour
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
}

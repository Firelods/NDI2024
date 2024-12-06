import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameService } from '../game.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    constructor(public gameService: GameService) {}
}

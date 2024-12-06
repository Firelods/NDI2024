import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    completedGames = 2;

    constructor() {}

    incrementCompletedGames() {
        this.completedGames++;
    }

    getCompletedGames() {
        return this.completedGames;
    }
}

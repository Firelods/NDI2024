import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';

import {
    CdkDrag,
    CdkDragEnd,
    CdkDragMove,
    CdkDropList,
    DragDropModule,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialog,
} from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { GameService } from '../../game.service';
import {
    MatButtonToggle,
    MatButtonToggleModule,
} from '@angular/material/button-toggle';

@Component({
    selector: 'dialog-elements-example-dialog',
    templateUrl: 'dialog-element.html',
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatButtonModule,
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogElementsExampleDialog {}

@Component({
    selector: 'app-arteres',
    standalone: true,
    imports: [
        MatButtonToggleModule,
        ReactiveFormsModule,
        DragDropModule,
        CommonModule,
        FormsModule,
        RouterModule,
        CdkDropList,
        CdkDrag,
    ],
    templateUrl: './arteres.component.html',
    styleUrl: './arteres.component.scss',
})
export class ArteresComponent {
    wastes = [
        { id: 6, x: 250, y: 20 },
        { id: 1, x: 70, y: 100 },
        { id: 2, x: 200, y: 150 },
        { id: 3, x: 100, y: 300 },
        { id: 4, x: 250, y: 350 },
        { id: 5, x: 100, y: 475 },
    ];
    wasteOcean = [
        { id: 7, x: 250, y: 350 },
        { id: 8, x: 70, y: 350 },
        { id: 9, x: 200, y: 350 },
        { id: 10, x: 100, y: 300 },
        { id: 11, x: 250, y: 350 },
        { id: 12, x: 100, y: 475 },
    ];
    wasteOceanInBin = [];
    readonly dialog: MatDialog = inject(MatDialog);
    wastesInBin = [];
    isOceanMode: string = 'ocean';
    score = 0;
    totalScore = this.wasteOcean.length + this.wastes.length;

    constructor(
        private router: Router,
        private gameService: GameService,
    ) {}
    toggleMode(event: any) {
        this.isOceanMode = event.value;
    }

    drop(event: any) {
        const container = event.container.element.nativeElement;
        const containerRect = container.getBoundingClientRect();
        const waste = event.item.data;

        const { x, y } = event.dropPoint;
        waste.x = x - containerRect.left - 60; // Ajustement de 60px si nécessaire
        waste.y = y - containerRect.top - 60;
    }

    openDialog() {
        const dialogRef = this.dialog.open(DialogElementsExampleDialog);
        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
            this.router.navigate(['/']);
            this.gameService.incrementCompletedGames();
        });
    }

    onDock(event: any) {
        const waste = event.item.data;
        this.score += 1;
        this.checkIfWin();
        this.wasteOcean = this.wasteOcean.filter((w) => w.id !== waste.id);
    }
    onClean(event: any) {
        const waste = event.item.data;
        this.score += 1;
        this.checkIfWin();
        this.wastes = this.wastes.filter((w) => w.id !== waste.id);
    }

    checkIfWin() {
        if (this.score === this.totalScore) {
            this.openDialog();
        }
    }
}

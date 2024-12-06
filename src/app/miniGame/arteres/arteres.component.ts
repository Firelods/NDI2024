import { Component } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-arteres',
    standalone: true,
    imports: [
        MatSlideToggleModule,
        DragDropModule,
        CommonModule,
        FormsModule,
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

    wastesInBin = [];
    isOceanMode = false;

    toggleMode() {
        this.isOceanMode = !this.isOceanMode;
    }
    onDragEnd(event: CdkDragEnd, waste: any) {
        // Mise à jour des coordonnées
        const { x, y } = event.source.getFreeDragPosition();
        waste.x = x;
        waste.y = y;
        console.log('dragEnd', event, waste);
    }
    onClean(event: any) {
        console.log('cleaned', event);
        const waste = event.item.data;
        this.wastes = this.wastes.filter((w) => w.id !== waste.id);
    }

    drop(event: any) {
        console.log('dropped', event);
        const waste = event.item.data;
        // modify the waste object which is in the wastes array to put the coordinate of drop position
        const { x, y } = event.dropPoint;
        waste.x = x - 60;
        waste.y = y - 60;
    }

    onDock(event: any) {
        console.log('docked', event);
        const waste = event.item.data;
        this.wasteOcean = this.wasteOcean.filter((w) => w.id !== waste.id);
    }
}

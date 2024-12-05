import { Component } from '@angular/core';
import { ArteresComponent } from '../miniGame/arteres/arteres.component';
import { RouterModule } from '@angular/router';
import { CorailComponent } from '../miniGame/corail/corail.component';
import { JaugesComponent } from '../miniGame/jauges/jauges.component';
import { MaboulComponent } from '../miniGame/maboul/maboul.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        ArteresComponent,
        RouterModule,
        CorailComponent,
        JaugesComponent,
        MaboulComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {}
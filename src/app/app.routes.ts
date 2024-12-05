import { Routes } from '@angular/router';
import { ArteresComponent } from './miniGame/arteres/arteres.component';
import { CorailComponent } from './miniGame/corail/corail.component';
import { JaugesComponent } from './miniGame/jauges/jauges.component';
import { MaboulComponent } from './miniGame/maboul/maboul.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: 'arteres',
        component: ArteresComponent,
    },
    {
        path: 'corail',
        component: CorailComponent,
    },
    {
        path: 'jauges',
        component: JaugesComponent,
    },
    {
        path: 'maboul',
        component: MaboulComponent,
    },
    {
        path: '',
        component: HomeComponent,
    },
];

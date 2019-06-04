import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from '../profile/profile.component';
import { NgModule } from '@angular/core';
import { TrendsComponent } from './trends/trends.component';
import { UsersComponent } from './users/users.component';

export const dashboardRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            { path: '', component: UsersComponent },
            { path: 'users', component: UsersComponent },
            { path: 'trends', component: TrendsComponent },
            { path: 'update', pathMatch: 'full', component: ProfileComponent },
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(dashboardRoutes)
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
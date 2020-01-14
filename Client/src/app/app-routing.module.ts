import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { TeamsComponent } from './teams/teams.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { AuthGuardService } from '../app/my-nav/auth-guard.service'


const routes: Routes = [
  { path: 'rooms', component: RoomsComponent, canActivate: [AuthGuardService] },
  { path: 'teams', component: TeamsComponent, canActivate: [AuthGuardService]  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]  },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuardService]  },
  { path: 'auth', component: AuthentificationComponent },
  { path: '**', component:RoomsComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

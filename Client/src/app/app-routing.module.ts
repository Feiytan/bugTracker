import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { TeamsComponent } from './teams/teams.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';


const routes: Routes = [
  { path: 'rooms', component: RoomsComponent, data: {title: 'Rooms'} },
  { path: 'teams', component: TeamsComponent, data: {title: 'Teams'}},
  { path: 'profile', component: ProfileComponent, data: {title: 'Profile'} },
  { path: 'contact', component: ContactComponent, data: {title: 'Contact'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

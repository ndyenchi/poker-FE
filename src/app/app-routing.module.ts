import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './forgotPassword/reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { CreateNameGameComponent } from './pokerGame/create-name-game/create-name-game.component';
import { EditIssueComponent } from './pokerGame/edit-issue/edit-issue.component';
import { HomePokerComponent } from './pokerGame/home-poker/home-poker.component';
import { RegisterComponent } from './register/register.component';
import { HomePageRetrospectiveComponent } from './retrospectiveGame/home-page-retrospective/home-page-retrospective.component';
import { MainBoardComponent } from './retrospectiveGame/main-board/main-board.component';
import { SelectTemplateComponent } from './retrospectiveGame/select-template/select-template.component';
import {DashboardComponent} from './manager/dashboard/dashboard.component';
import {LoginAdminComponent} from './manager/login-admin/login-admin.component';
import {UserManagerComponent} from './manager/user-manager/user-manager.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  //RetrospectiveGame
  { path: 'home-retrospective', component: HomePageRetrospectiveComponent },
  { path: 'select-template', component: SelectTemplateComponent },
  //Forgot Password
  { path: 'reset-password/:id', component: ResetPasswordComponent },
  { path: 'create-game', component: CreateNameGameComponent },
  { path: 'home-poker/:id', component: HomePokerComponent },
  { path: 'main-board/:url', component: MainBoardComponent },
  //test

  { path: 'edit-issue', component: EditIssueComponent },
  { path: 'home', component: HomeComponent },
  { path: 'create-game', component: CreateNameGameComponent },
  {path: 'manager', component: LoginAdminComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserManagerComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
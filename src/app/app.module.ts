import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomePokerComponent} from './pokerGame/home-poker/home-poker.component';
import {CreateNameGameComponent} from './pokerGame/create-name-game/create-name-game.component';
import {authInterceptorProviders} from './_helpers/auth.interceptor';
import {CommonModule} from '@angular/common';
import {HomePageRetrospectiveComponent} from './retrospectiveGame/home-page-retrospective/home-page-retrospective.component';
import {SelectTemplateComponent} from './retrospectiveGame/select-template/select-template.component';
import {MainBoardComponent} from './retrospectiveGame/main-board/main-board.component';
import {CreateNewBoardComponent} from './retrospectiveGame/create-new-board/create-new-board.component';
import {ForgotPasswordComponent} from './forgotPassword/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './forgotPassword/reset-password/reset-password.component';

import {CreateIssueComponent} from './pokerGame/create-issue/create-issue.component';
import {ShowIssueComponent} from './pokerGame/show-issue/show-issue.component';
import {VotingHistoryComponent} from './pokerGame/voting-history/voting-history.component';
import {NgxCopyPasteModule} from 'ngx-copypaste';
import {DiscussionListComponent} from './retrospectiveGame/main-board/discussion-list/discussion-list.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConfirmationPopoverModule} from 'angular-confirmation-popover';
import {WebSocketAPI} from './config/web-socket-api';
import {EditIssueComponent} from './pokerGame/edit-issue/edit-issue.component';
import {DashboardComponent} from './manager/dashboard/dashboard.component';
import {EditUserComponent} from './pokerGame/edit-user/edit-user.component';
import {UserManagerComponent} from './manager/user-manager/user-manager.component';
import {LoginAdminComponent} from './manager/login-admin/login-admin.component';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './manager/chart/chart.component';

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        HomeComponent,
        LoginComponent,
        HomePokerComponent,
        CreateNameGameComponent,

        CreateNewBoardComponent,
        SelectTemplateComponent,
        MainBoardComponent,
        HomePageRetrospectiveComponent,
        ForgotPasswordComponent,
        HomePageRetrospectiveComponent,
        SelectTemplateComponent,
        MainBoardComponent,
        CreateNewBoardComponent,
        ResetPasswordComponent,
        CreateIssueComponent,
        ShowIssueComponent,
        VotingHistoryComponent,
        DiscussionListComponent,

        CreateIssueComponent,
        ShowIssueComponent,
        VotingHistoryComponent,


        HomePageRetrospectiveComponent,
        SelectTemplateComponent,
        MainBoardComponent,
        CreateNewBoardComponent,
        EditIssueComponent,
        DashboardComponent,
        EditUserComponent,
        UserManagerComponent,
        LoginAdminComponent,
        ChartComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule,
        CommonModule,
        BrowserAnimationsModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger', // set defaults here
        }),
        ModalModule.forRoot(),
        ToastrModule.forRoot({
            timeOut: 5000,
            progressBar: true
        }),
        NgxCopyPasteModule,
        ChartsModule

    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [authInterceptorProviders],
    bootstrap: [AppComponent]
})
export class AppModule {
}

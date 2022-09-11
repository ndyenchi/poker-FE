import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamePoker } from 'src/app/model/game-poker';
import { IssuePoker } from 'src/app/model/issue-poker';
import { User } from 'src/app/model/user';
import { GamePokerService } from 'src/app/_services/game-poker.service';
import { IssuesPokerService } from 'src/app/_services/issues-poker.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { map } from 'rxjs/operators';
import { GameUser } from 'src/app/Dto/game-user';
import { WebSocketServiceService } from 'src/app/config/web-socket-service.service';
import { VotingHistoryService } from 'src/app/_services/voting-history.service';
import { ApiResponse, FlipCard } from 'src/app/model/api-response';
import { IssuesDto } from 'src/app/Dto/issues-dto';
import { GameUserID } from 'src/app/Dto/game-user-id';
import {UserDTO} from '../../Dto/userDTO';
import {ManagerService} from '../../_services/manager.service';
import {VotingHitory} from '../../model/voting-history';

@Component({
  selector: 'app-home-poker',
  templateUrl: './home-poker.component.html',
  styleUrls: ['./home-poker.component.scss']
})
export class HomePokerComponent implements OnInit {
  numberList: number[] = [0, 1, 2, 3, 5, 8, 13, 21];
  currentUser: any;
  isLoggedIn = false;
  gamePoker: GamePoker;
  url: string;
  name: string;
  isCreateIssues = false;
  users: User[];
  issues: IssuePoker[] = [];
  displaysecondStart: boolean = false;
  displaysecond: any;
  flip: boolean = false;
  numberCurrent: number;
  showCard: boolean;
  checkReveal: boolean;
  gameUser: GameUser[] = [];
  userVoteTrue: GameUser[] = [];
  userss: any;
  obs: any;
  idUser: any;
  average: any;
  responseFlipCard: ApiResponse<FlipCard[]>;
  issueDto: IssuesDto;
  id: number;
  isReload: boolean = false;
  webSocketAPI!: WebSocketServiceService;
  greeting: IssuePoker = new IssuePoker();
  issue: IssuePoker = new IssuePoker();
  checkIssue:boolean;

  isVote = false;

  temp = 'http://localhost:4200/home-poker/' + this.route.snapshot.params['id'];
  authUser = sessionStorage.getItem('auth-user');
  checkUser: boolean = true;
  userDTO : UserDTO = new UserDTO();
  @ViewChild('closeButton') closeButton: ElementRef;
  voting: VotingHitory[] =[];

  constructor(
      private token: TokenStorageService,
      private gamePokerService: GamePokerService,
      private route: ActivatedRoute,
      private issuesService: IssuesPokerService,
      private router: Router,
      private votingHistoryService: VotingHistoryService,
      private managerService: ManagerService,
  ) {

  }
  ngOnInit(): void {
    this.webSocketAPI = new WebSocketServiceService(this);
    this.connect();
    this.processLogin();
    this.checkIssue1();
    this.getUserInfor();
    this.getVotingHistory();
  }
  getUserInfor(){
    console.log("hehehe");
    this.managerService.getUser(this.idUser).subscribe(data => {
      console.log("hehe",data);
      // this.userDTO = data.map(item => { return new UserDTO().deserialize(item)});
      this.userDTO.name = data.name;
      this.userDTO.phone = data.phone;
      this.userDTO.address = data.address;
      this.userDTO.displayName = data.displayName;
      this.userDTO.dob = data.dob;

    });
    console.log("userDTO", this.userDTO)
  }
  checkIssue1(){

    for (let i = 0; i < this.issues.length; i++) {
      if (this.issues[i].status) {
        this.checkIssue=true;
      }
    }

  }
  processLogin(data?) {
    console.log("data", data)
    if (this.authUser == null) {
      console.log("authUser", this.authUser);
      // localStorage.setItem("");
      // if (localStorage.getItem("signout") != "true") {
      //   localStorage.setItem('dataSource', this.route.snapshot.params['id']);
      //   // this.router.navigate(['/home']);
      // }
      // this.router.navigate(['/home']);

      localStorage.setItem('dataSource', this.route.snapshot.params['id']);
      //  this.router.navigate(['/home-poker/' + this.route.snapshot.params['id']]);
      document.getElementById("btnLogin").click();
    } else {

      this.currentUser = this.token.getUser();
      this.obs = JSON.parse(sessionStorage.getItem("auth-user"));
      this.idUser = this.obs.id;

      this.url = this.route.snapshot.params['id'];

      //put user->game

      // this.gamePokerService.oldJoinGame(this.idUser, this.url).subscribe(data=>{});
      console.log("idUser: " + this.idUser);
      console.log("url ", this.url)

      this.gamePokerService.getListGameUserByIdGame(this.url).subscribe(data => {
        this.processJoinGame(data);
        console.log("data", data);
      });

    }


    //
    this.obs = JSON.parse(sessionStorage.getItem("auth-user"));
    if (this.obs) {
      this.idUser = this.obs.id;
    }
    this.currentUser = this.token.getUser();
    this.url = this.route.snapshot.params['id'];
    this.gamePokerService.getNameByUrl(this.url).subscribe(data => {
      this.gamePoker = data;
      this.name = this.gamePoker.name;
    });

    // Check exist room from DB
    // Get infor room
    // redirect to page not found

    //Call connnect to this url

    //Subscribe message from this url



    // this.inv()
    this.loadRevealCard();
    this.loadUserGame();
    this.loadIssuses();
    this.loadCheckReveal();




  }
  //



  processJoinGame(data) {
    this.gameUser = data;

    const isUserExitsGame = this.gameUser.filter(gameUserModel => {
      return gameUserModel.gameUserID.idUser === this.idUser;
    })

    if (!isUserExitsGame.length) {
      // this.gamePokerService.invite(this.idUser, this.route.snapshot.params['id']).
      //   subscribe();
      console.log("idUser", this.idUser)


      // gameUserID: new GameUserID(this.idUser, this.gameUser[0].gameUserID.idGame);
      // temp : new GameUser();
      // this.gameUser.push(temp);

      this.webSocketAPI._sendInvite(this.url, this.idUser);

    }
  }
  loadCheckReveal() {
    this.gamePokerService.checkReveal(this.url).subscribe(data => {
      this.checkReveal = data;
    })
  }

  loadRevealCard() {
    this.gamePokerService.findGameUserRevealByGameId(this.url).subscribe(data => {
      this.showCard = data;
      console.log("showCard" + this.showCard)
    })

    this.showAverage();


    this.showPointVote();
    this.displaysecondStart = false;
  }

  // inv() {
  //   if (this.authUser == null) {
  //     if (localStorage.getItem("signout") != "true") {
  //       localStorage.setItem('dataSource', this.route.snapshot.params['id']);
  //       this.router.navigate(['/home']);
  //     } this.router.navigate(['/home']);

  //   }
  //   else {
  //     this.currentUser = this.token.getUser();
  //     this.obs = JSON.parse(sessionStorage.getItem("auth-user"));
  //     this.idUser = this.obs.id;
  //     console.log("chichi: " + this.idUser);
  //     this.gamePokerService.invite(this.idUser, this.route.snapshot.params['id']).
  //       subscribe();
  //   }
  // }

  loadIssuses() {
    this.url = this.route.snapshot.params['id'];
    this.issuesService.getIdGameByUrl(this.url).subscribe(data => {
      this.issues = data.map(item => { return new IssuePoker().deserialize(item) });
      console.log("asssssssssss123", this.issues)
    })
  }

  loadUserGame() {
    this.url = this.route.snapshot.params['id'];
    this.gamePokerService.getListGameUserByIdGame(this.url).subscribe(data => {
      this.processJoinGame(data);
      // this.gameUser = data;
      // console.log('gameUser', this.gameUser);
    })

  }

  waitAfterSecond() {
    this.displaysecondStart = true;
    let statSec: number = 3;
    this.displaysecond = 3;
    const timer = setInterval(() => {
      if (statSec != 0) statSec--;
      this.displaysecond = `${statSec}`;
      console.log("Dem nguoc:" + this.displaysecond)
      if (statSec == 0) {
        clearInterval(timer);
        this.revealCard();
        this.loadRevealCard();;
        // this.reloadPage();
      }
    }, 1000);

  }
  revealCard() {
    // this.gamePokerService.revealCard(this.url, this.idUser, true).subscribe(data => {
    //   });


    this.votingHistoryService.save(this.url).subscribe();
    this.webSocketAPI._sendRevealCard(this.url, this.idUser);

    // this.votingHistoryService.save(this.url).subscribe(result => {
    //   if (!result.success) {
    //     alert("pleass choose issue");
    //   //  this.router.navigate(["http://localhost:4200/home-poker/" + this.route.snapshot.params['id']]);
    //   }
    // });

  }

  showAverage() {
    this.gamePokerService.showAverage(this.url).subscribe(data => {
      this.average = data;
      console.log(data)
    });
  }

  showPointVote() {
    this.gamePokerService.showListVoteTrue(this.url).subscribe(data => {
      this.userVoteTrue = data;
      console.log(data)
    });
  }


  chooseCard(number: number, select: number) {


    if (select > 0) {
      this.webSocketAPI._sendChooseCard(this.url, this.idUser, number, true);
    }
    else if (select < 0) {
      this.webSocketAPI._sendChooseCard(this.url, this.idUser, number, false);
    }


    // this.webSocketAPI._sendChooseCard(this.url, this.idUser, number, this.numberCurrent !== number);
    // this.numberCurrent = number;
  }
  revealEnd() {

    // this.gamePokerService.revealEnd(this.url).subscribe(data => {

    //   console.log(data)
    // });
    this.webSocketAPI._sendRevealCardEnd(this.url);

    // this.showCard = false;
    //  this.reloadPage()
  }

  signOut() {
    console.log("aaaa");
    this.token.signOut();

    localStorage.setItem("signout", "true")
    if (localStorage.getItem("dataSource")) {
      localStorage.removeItem("dataSource");
    }
    this.redirectPage();
  }

  isActive(number: number) {
    this.obs = JSON.parse(sessionStorage.getItem("auth-user"));
    this.idUser = this.obs.id;
    if (!this.numberCurrent) {
      for (let gu of this.gameUser) {
        if (gu.gameUserID.idUser === this.idUser)
          this.numberCurrent = gu.point
      }
    }
    return this.numberCurrent === number;
  }

  reloadPage(): void {
    window.location.reload();
  }
  redirectPage(): void {
    this.router.navigate(["home"])
  }

  deleteAllIssues() {
    this.url = this.route.snapshot.params['id'];
    // this.issuesService.deleteAllIssue(this.url).subscribe();
    // this.webSocketAPI._sendIssue(this.url);
    //this.reloadPage();
    this.webSocketAPI._sendDeleteAllIssue(this.url);
    this.handleCloseButton();

  }


  // processSocket() {
  //   this.websocket = new WebSocketServiceService(this);
  //   //this.websocket._connect(this.url);
  // }

  public onGetMessage(message: any) {
    console.log(message)
  }


  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  getItem(newItem: IssuesDto) {
    this.issueDto = newItem;
  }

  handleMessage(message: any) {
    this.responseFlipCard = message;
    switch (message.body.type) {
      case "CHOOSE": {
        if (message.body.data[0].game.url == this.route.snapshot.params['id']) {
          this.gameUser = message.body.data;
          console.log("gameUser", this.gameUser);
          for (let i = 0; i < this.gameUser.length; i++) {
            if (this.gameUser[i].flipCard == true) {
              this.checkReveal = true;
              break;
            } else this.checkReveal = false;
          }
        }

        break;
      }

      case "REVEAL": {
        if (message.body.data[0].game.url == this.route.snapshot.params['id']) {
          this.showCard = true;
          this.issues = message.body.data;
        }

        //   this.gameUser = this.userVoteTrue = message.body.data;
        break;
      }


      case "REVEALEND": {
        if (message.body.data[0].game.url == this.route.snapshot.params['id']) {
          this.gameUser = message.body.data;
          // this.reloadPage();
          this.showCard = false;
          this.checkReveal = false;
        }

        break;
      }
      case "ISSUE": {
        if (message.body.data.length == 0) {
          this.issues = message.body.data;
        }
        else if (message.body.data[0].game.url == this.route.snapshot.params['id']) {
          this.issues = message.body.data;
        }

        console.log('issuesssss', this.issues);
        break;
      }
      case "INVITE": {
        if (message.body.data[0].game.url == this.route.snapshot.params['id']) {
          this.gameUser = message.body.data;
        }
        console.log("aaa", this.gameUser);
        break;
      }
      case "VOTE": {
        if (message.body.data[0].game.url == this.route.snapshot.params['id']) {
          this.issues = message.body.data;
          console.log("aaa", this.issues);

          for(let i=0;i< this.issues.length;i++){
            if(this.issues[i].status == true){
              this.checkIssue=true;
              break;
            }else {
              this.checkIssue=false;
            }
          }
        }

        break;
      }
      case "OUT-GAME": {
        if (message.body.data[0].game.url == this.route.snapshot.params['id']) {
          this.gameUser = message.body.data;
          console.log("out-game", this.gameUser)
        }

        break;
      }
      case "DELETE-ALL-ISSUE": {
        if (message.body.data == this.route.snapshot.params['id']) {
          this.issues = [];
          console.log("delete-all-issue", this.issues)
        }

        break;
      }
      case "DELETE-ISSUE": {
        if (message.body.message == this.route.snapshot.params['id']) {
          this.issues = message.body.data;
          console.log("delete-issue", this.issues)
        }

        break;
      }
      case "EDIT-ISSUE": {
        if (message.body.data[0].game.url == this.route.snapshot.params['id']) {
          this.issues = message.body.data;
          for (let i = 0; i < this.issues.length; i++) {
            if (this.issue.id == this.issues[i].id) {
              this.issue = this.issues[i];
              console.log("issue", this.issue)
            }
          }
        }
        break;
      }
      case "OLD_USER": {
        if (message.body.data[0].game.url == this.route.snapshot.params['id']) {
          this.gameUser = message.body.data;
          console.log("old-user", this.gameUser)
        }
        break;
      }
    }

  }
  handleLoggedInEmitter() {
    this.isLoggedIn = !this.isLoggedIn;
    this.webSocketAPI._sendIssue(this.url);
    this.loadIssuses();
  }

  voteIssue(id: number) {
    //  this.isVote = !this.isVote;
    console.log("id", id)
    this.webSocketAPI._sendVoteIssue(id, this.url);

  }
  getIdIssue(id) {
    this.id = id;
  }
  getIssue(issue) {
    this.issue = issue;
    console.log("id", this.issue.id);
    console.log("title", this.issue.title);
    console.log("key", this.issue.key);
  }
  deleteIssue() {

    console.log("id delete", this.id);
    this.webSocketAPI._sendDeleteIssue(this.id, this.url);
  }
  editIssue(value: IssuePoker) {
    console.log("value", value);
    this.webSocketAPI._sendEditIssue(value);
  }
  // @HostListener('window:unload', ['$event'])
  // unloadhandler(event){
  // this.webSocketAPI._sendOutGame( this.idUser,this.url);
  // }
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadhandler(event) {

    this.webSocketAPI._sendOutGame(this.idUser, this.url);
    this.webSocketAPI._disconnect();
  }

  public handleCloseButton() {
    this.closeButton.nativeElement.click();
  }
  getVotingHistory(){
    this.votingHistoryService.getVotingHistory(this.url).subscribe(data => {
      this.voting = data;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GamePoker } from 'src/app/model/game-poker';
import { GamePokerService } from 'src/app/_services/game-poker.service';

@Component({
  selector: 'app-create-name-game',
  templateUrl: './create-name-game.component.html',
  styleUrls: ['./create-name-game.component.scss']
})
export class CreateNameGameComponent implements OnInit {

  gamePoker: GamePoker = new GamePoker();
  errorMessage = '';
  id1: string;
  ss: any;
  id2: number;
 idUser: string;
 obs:any;
  constructor(private fb: FormBuilder, private gamePokerService: GamePokerService, private router: Router) { }

  ngOnInit(): void {
  }

  createNameForm = this.fb.group({
    "name": ["", [Validators.required,Validators.maxLength(50)]],

  },
  )

  get CreateNameForm() {
    return this.createNameForm.controls;
  }

  onSubmit() {
    this.gamePoker.name = this.createNameForm.controls.name.value;
    this.obs = JSON.parse(sessionStorage.getItem("auth-user"));
    this.idUser = this.obs.id;

    this.gamePokerService.createNamePoker(this.gamePoker, this.idUser).subscribe(
      data => {
        
        this.redirectPage(data.message);
      },
      err => {
        this.errorMessage = err.error.message;

      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }

  redirectPage(id: string): void {
    this.router.navigate(["home-poker", id])
  }

}

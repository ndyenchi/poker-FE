import { Component, OnInit } from '@angular/core';
import {ManagerService} from '../../_services/manager.service';
import {UserDTO} from '../../Dto/userDTO';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {

  users :  UserDTO[]=[]
  constructor(private managerService: ManagerService) { }

  ngOnInit(): void {
    this.getUsersList();
  }
  getUsersList(){
    this.managerService.users().subscribe(data=>{
      this.users=data;
    })
  }
}

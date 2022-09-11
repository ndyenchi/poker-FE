import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VotingHitory } from 'src/app/model/voting-history';
import { VotingHistoryService } from 'src/app/_services/voting-history.service';

@Component({
  selector: 'app-voting-history',
  templateUrl: './voting-history.component.html',
  styleUrls: ['./voting-history.component.scss']
})
export class VotingHistoryComponent implements OnInit {

  @Input('voting') voting: VotingHitory[];
  link: string;
  url: string;
  constructor(private route: ActivatedRoute, private votingHistoty: VotingHistoryService) { }

  ngOnInit(): void {
    this.url = this.route.snapshot.params['id'];
    this.link = "http://localhost:8080/api/planning-poker/exportCSVs/" + this.url;
    // this.voiting();
  }
  voiting() {
    this.votingHistoty.getVotingHistory(this.url).subscribe(data => {
      this.voting = data;
    });
  }


}

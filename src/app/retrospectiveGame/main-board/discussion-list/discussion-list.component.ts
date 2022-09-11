import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Discussion } from '../../discussion';

@Component({
  selector: 'app-discussion-list',
  templateUrl: './discussion-list.component.html',
  styleUrls: ['./discussion-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscussionListComponent implements OnInit {

  @Input("discussion") discussion: Discussion;

  constructor() { }

  ngOnInit(): void {
    console.log("discussion", this.discussion);
  }

}

import { Component, OnInit } from '@angular/core';

import { BackendService } from '../../shared/backend.service';

@Component({
  selector: 'app-bowling-alley',
  templateUrl: './bowling-alley.component.html',
  styleUrls: ['./bowling-alley.component.scss']
})
export class BowlingAlleyComponent implements OnInit {

  constructor(
    public backendService:BackendService
    ) { 

  }

  ngOnInit(): void {

    this.backendService.resetGame();

  }
}

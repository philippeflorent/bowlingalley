import { Component, OnInit } from '@angular/core';

import { BackendService } from '../../shared/backend.service';

/*
  main wrapper component only contains the background image and sub components
*/
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

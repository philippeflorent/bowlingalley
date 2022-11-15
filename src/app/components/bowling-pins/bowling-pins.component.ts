import { Component, OnInit } from '@angular/core';

import { BackendService } from '../../shared/backend.service';
import { BowlingData } from '../../model/bowlingData.class';

@Component({
  selector: 'app-bowling-pins',
  templateUrl: './bowling-pins.component.html',
  styleUrls: ['./bowling-pins.component.scss']
})
export class BowlingPinsComponent implements OnInit {

  bowlingData!:BowlingData;

	constructor(
		public backendService:BackendService
	) { 

	this.backendService.bowlingDataObservable$.subscribe((bowlingData:BowlingData)=>{
        	this.bowlingData=bowlingData;
        	
        });
	}

  ngOnInit(): void {
  }

}

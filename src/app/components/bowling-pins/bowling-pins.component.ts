import { Component, OnInit } from '@angular/core';

/* services and model */
import { BackendService } from '../../shared/backend.service';
import { BowlingData } from '../../model/bowlingData.class';

/*
  just to display the remaining standing pins
*/
@Component({
  selector: 'app-bowling-pins',
  templateUrl: './bowling-pins.component.html',
  styleUrls: ['./bowling-pins.component.scss']
})
export class BowlingPinsComponent implements OnInit {

  bowlingData!:BowlingData | null; // otherwise compiler freaks out

	constructor(
		public backendService:BackendService
	) { 
    // service subscription only works in constructor
  	this.backendService.bowlingDataObservable$.subscribe((bowlingData:BowlingData)=>{
     	this.bowlingData=bowlingData;
    });
    // otherwise compiler freaks out
    this.bowlingData = null;
	}

  ngOnInit(): void {
  }

}

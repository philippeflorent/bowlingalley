import { Component, OnInit } from '@angular/core';

import { BackendService } from '../../shared/backend.service';
import { BowlingData,BowlingFrameData } from '../../model/bowlingData.class';

@Component({
  selector: 'app-bowling-screen',
  templateUrl: './bowling-screen.component.html',
  styleUrls: ['./bowling-screen.component.scss']
})
export class BowlingScreenComponent implements OnInit {

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

  /* helper to concat points in a frame display */
  public frameTotal(frame:BowlingFrameData)
  {
    return this.backendService.frameTotal(frame);
  }

  public get total():number
    {

    return this.backendService.totalPoints();
  }

}

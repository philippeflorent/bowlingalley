import { Component, OnInit } from '@angular/core';

/* services and model */
import { BackendService } from '../../shared/backend.service';
import { BowlingData,BowlingFrameData } from '../../model/bowlingData.class';

/*
  the screen component will display each frames and its points
  asside of that screeen in another sceen for the total points
*/
@Component({
  selector: 'app-bowling-screen',
  templateUrl: './bowling-screen.component.html',
  styleUrls: ['./bowling-screen.component.scss']
})
export class BowlingScreenComponent implements OnInit {

	// copy of gamestate from service (see BackendService)
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

  /* accesses from template */

  /*
    returns the points for a given frame

    input:
      frame: given BowlingFrameData
  */
  public frameTotal(frame:BowlingFrameData):number
  {
    return this.backendService.frameTotal(frame);
  }

  /*
    getter for total points
  */
  public get total():number
  {
    return this.backendService.totalPoints();
  }

}

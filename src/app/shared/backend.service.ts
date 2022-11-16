import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Process } from './process.class';
import { Constants } from './constants.class';
import { BowlingData,BowlingFrameData } from '../model/bowlingData.class';

/*
  this backend service holds the game state, observables for components and entry points to update the gamestate
*/

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  /* game state (cfr model folder) */
  bowlingData = new BowlingData();

  // will be used to provide fresh data to components (cfr SreenComponent/TableComponent)
  private bowlingDataSubject = new Subject < BowlingData > ();
  bowlingDataObservable$ = this.bowlingDataSubject.asObservable();

  constructor() { }

  /* play one run of the game 

    inputs:
     fallenPins (process user input/ fallen pins on this throw)
     bowlingData (cfr BowlingData class)
  */
  public setFallenPins(fallenPins:number,bowlingData:BowlingData) {
      this.bowlingData = Process.calcScore(fallenPins,bowlingData);
      this.bowlingDataSubject.next(this.bowlingData);
  }

  /* reset game, called from constructor and reset button (cfr bowling-alley.component.html) */
  public resetGame()
  {
    // resets game
    this.bowlingData = new BowlingData();

    if(Constants.DEBUG_DATA)
    {
      // temporary debug data (for css)
      this.addFrameDebugData(true,false,[10,0,0],false); // strike
      this.addFrameDebugData(false,false,[1,2,13],true); // open frame (pins still standing) + bonus
      this.addFrameDebugData(false,true,[2,8,0],false); // spare
      this.addFrameDebugData(false,false,[4,5,14],true); // open frame (pins still standing) + bonus
      this.addFrameDebugData(false,false,[6,4,0],false); // regular throw
      this.addFrameDebugData(false,false,[3,5,0],true); // open frame (pins still standing)
      this.addFrameDebugData(false,false,[10,10,10],true); // maxed out debug frames
      this.addFrameDebugData(false,false,[10,10,10],true); // maxed out debug frames
      this.addFrameDebugData(false,false,[10,10,10],true); // maxed out debug frames
      this.addFrameDebugData(false,false,[99,99,99],true); // maxed out debug frames
    }

    // forwards data to components
    this.bowlingDataSubject.next(this.bowlingData);  
  }

  /* 
    this is there for the sole purpose of debugging CSS
  */
  public addFrameDebugData(strike:boolean,spare:boolean,points:number[],open:boolean)
  {
    let bfd = new BowlingFrameData();
    bfd.debugInit(strike,spare,points,open);
    this.bowlingData.frames.push(bfd);  
    this.bowlingData.currentFrame=this.bowlingData.frames.length;
  }

  /* helper to concat points in a frame */
  public frameTotal(frame:BowlingFrameData):number
  {
    return frame.points.reduce((acc, cur) => acc + cur, 0);
  }

  /* helper to concat points in a whole game */
  public totalPoints():number
  {
    var total = 0;
    this.bowlingData.frames.forEach((frame, index) => {
      total += frame.points.reduce((acc, cur) => acc + cur, 0);
    });
    return total;
  }

}

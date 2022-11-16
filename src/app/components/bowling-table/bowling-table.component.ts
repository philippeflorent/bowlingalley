import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,AbstractControl } from '@angular/forms';

/* custom model class will be shared between form and validator (cfr bowling-pins-validator.ts)*/
import { BowlingData,BowlingFrameData } from '../../model/bowlingData.class';
import { PinsCountValidator } from '../../validators/bowling-pins-validator';
import { BackendService } from '../../shared/backend.service';

/*
  component displaying an input field w<ith validation, a play buttona nd a reset button
  as well as validation errors if needed
*/
@Component({
  selector: 'app-bowling-table',
  templateUrl: './bowling-table.component.html',
  styleUrls: ['./bowling-table.component.scss']
})
export class BowlingTableComponent implements OnInit {

  // copy of gamestate from service (see BackendService)
	bowlingData!:BowlingData | null; // otherwise compiler freaks out

  // input form
  formGroup:FormGroup = new FormGroup({});
  fallenPins:number = 1;

  constructor(
  	public backendService:BackendService
  ) { 
    // service subscription only works in constructor
    this.backendService.bowlingDataObservable$.subscribe((bowlingData:BowlingData)=>{
      this.bowlingData=bowlingData;
		  this.resetForm();
    });

  	this.bowlingData = null;
  }

  ngOnInit(): void {
  }

  /* getters for access from template */ 

	public get standingPins():number{
 		return this.bowlingData ? this.bowlingData.standingPins : 0;
	}

	public get done():boolean{
 		return this.bowlingData ? this.bowlingData.done : false;
	}

	public get currentFrame():number{
 		return this.bowlingData ? this.bowlingData.currentFrame : 0;
	}

	public get throwCount():number{
 		return this.bowlingData ? this.bowlingData.throwCount : 0;
	}

 	public get frames():BowlingFrameData[]{
 		return this.bowlingData ? this.bowlingData.frames : [];
	}


  /* player interractions */

  /*
    apply N fallen pins to gamestate
  */
  public applyScore(){
    if(this.formGroup.valid && this.bowlingData){
      this.backendService.setFallenPins(this.formGroup.get('fallenPins')?.value,this.bowlingData);
      this.resetForm();
      this.formGroup.reset(1); // 1 instead of 0 to avoid bug (cfr bellow)
    }
  }

  /*
    reset game once finished
  */
  public resetGame(){
    this.backendService.resetGame();
  }
	
  /*
    for some reason, the input field does not get reset properly
    https://github.com/angular/angular/issues/15741
    so to reset the form I avoid using reset and recreates the form object
  */
  resetForm() {
    if(this.bowlingData) // required for compiler to pass
    {
      this.formGroup = new FormGroup({
        /* number of pins to put down on each turn */
        fallenPins: new FormControl(this.fallenPins, [
          Validators.required,
          Validators.minLength(1),
          PinsCountValidator(this.bowlingData)
        ])
      });
    }
  }

	/* share form for template */ 
	public get form():FormGroup{
 		return this.formGroup;
	}

}

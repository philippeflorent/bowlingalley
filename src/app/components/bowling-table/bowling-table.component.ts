import { Component, OnInit } from '@angular/core';

import { FormGroup,FormControl,Validators,AbstractControl } from '@angular/forms';
/* custom model class will be shared between form and validator (cfr bowling-pins-validator.ts)*/

import { BowlingData,BowlingFrameData } from '../../model/bowlingData.class';
import { PinsCountValidator } from '../../validators/bowling-pins-validator';
import { BackendService } from '../../shared/backend.service';

@Component({
  selector: 'app-bowling-table',
  templateUrl: './bowling-table.component.html',
  styleUrls: ['./bowling-table.component.scss']
})
export class BowlingTableComponent implements OnInit {

	bowlingData!:BowlingData | null;

  formGroup:FormGroup = new FormGroup({});

  fallenPins:number = 1;

  constructor(
  	public backendService:BackendService
  ) { 
  	this.backendService.bowlingDataObservable$.subscribe((bowlingData:BowlingData)=>{
        	this.bowlingData=bowlingData;
		  	this.resetForm();
        });

  	this.bowlingData = null;
  }

  ngOnInit(): void {

  }

    /* data sharing */ 

  	public get standingPins():number
  	{
 		return this.bowlingData ? this.bowlingData.standingPins : 0;
	}

  	public get done():boolean
  	{
 		return this.bowlingData ? this.bowlingData.done : false;
	}

  	public get currentFrame():number
  	{
 		return this.bowlingData ? this.bowlingData.currentFrame : 0;
	}

  	public get throwCount():number
  	{
 		return this.bowlingData ? this.bowlingData.throwCount : 0;
	}

   	public get frames():BowlingFrameData[]
  	{
 		return this.bowlingData ? this.bowlingData.frames : [];
	}


  /* player interractions */

  public applyScore()
  {
    if(this.formGroup.valid && this.bowlingData)
    {
      this.backendService.setFallenPins(this.formGroup.get('fallenPins')?.value,this.bowlingData);
      this.resetForm();
      //this.formGroup.reset(1);
    }
  }

  public resetGame()
  {
    this.backendService.resetGame();
  }
	
  /*
  https://github.com/angular/angular/issues/15741
  */
  resetForm() {
    /* validation setup */ 
    if(this.bowlingData)
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

	/* share from for template */ 

	public get form():FormGroup
  	{
 		return this.formGroup;
	}

}

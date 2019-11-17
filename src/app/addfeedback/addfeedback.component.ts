import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'app-addfeedback',
  templateUrl: './addfeedback.component.html',
  styleUrls: ['./addfeedback.component.css']
})
export class AddfeedbackComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  feedbackTypeList:Array<string>=["Participated","Not Participated","Unregistered"];
  answerTypeList:Array<string>=["Allow Multiple Answers","Free Text Answers","Custom Questions"];
  feedbackForm:FormGroup;

  ngOnInit() {
    this.feedbackForm = this.fb.group({
      feedbackType: [''],
      answerType: this.fb.array([]),
      questionAndAnswerList: this.fb.group({
        question: [''],
        answerList: this.fb.array([])
      }),
      country: this.fb.array([])
    })

  }

  onCheckChange(event) {
    const formArray: FormArray = this.feedbackForm.get('answerType') as FormArray;
    if(event.target.checked){
      formArray.push(new FormControl(event.target.value));
    }
    else{
      let i: number = 0;
      formArray.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onAddAnswer(){
    const answer = this.fb.control('');
    (<FormArray>this.feedbackForm.get('country')).push(answer);

    console.log(this.feedbackForm.value)
  }

  onDelete(index){
    (<FormArray>this.feedbackForm.get('questionAndAnswerList.answerList')).removeAt(index);
  }

  onSubmit(){
    console.log(this.feedbackForm.value)
  }

}

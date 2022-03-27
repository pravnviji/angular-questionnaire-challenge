import {
  AfterViewChecked,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss'],
})
export class MultipleChoiceComponent implements OnInit {
  @Input() question: any;

  QuestionData: any = [];
  multiplechoiceGrp: FormGroup = new FormGroup({});
  modelFields: any = [];

  ngOnInit(): void {
    let count: number = 0;
    this.question.forEach(
      (question: {
        identifier: string;
        headline: string;
        question_type: string;
        choices: [];
      }) => {
        this.QuestionData.push({
          identifier: question?.identifier,
          value: '',
          count: count + 1,
          headline: question?.headline,
          question_type: question?.question_type,
          choices: question?.choices,
        });
        this.multiplechoiceGrp.addControl(
          question?.identifier,
          new FormControl('')
        );
        count++;
      }
    );
  }

  onMultipleChoiceChange(value: any, id: string) {
    let fieldData = null;
    if (typeof value === 'object') {
      fieldData = value.target?.value;
    } else {
      fieldData = value;
    }
    this.multiplechoiceGrp.controls[id].setValue({ value: fieldData });
  }
}

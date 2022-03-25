import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MultipleChoiceComponent } from './component/multiple-choice/multiple-choice.component';

@NgModule({
  declarations: [MultipleChoiceComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatNativeDateModule,
  ],
  exports: [MultipleChoiceComponent],
})
export class SharedModule {}

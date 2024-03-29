import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionComponent } from './component/question/question.component';
import { QuestionService } from './services/question.service';
import { HomeComponent } from './component/home/home.component';
import { SharedModule } from '../shared/shared.module';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [QuestionComponent, HomeComponent],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    SharedModule,
  ],
  providers: [QuestionService],
})
export class FeatureModule {}

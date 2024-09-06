import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StarComponent } from './star.component';
import { CriteriaComponent } from './criteria/criteria.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    StarComponent,
    CriteriaComponent
  ],
  exports: [
    StarComponent,
    CommonModule,
    FormsModule,
    CriteriaComponent // to use it in other modules you need to add the component to export 
  ]
})
export class SharedModule { }

import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {
  // listFilter :string = "cart"; you cant have a property declaration and a getter and setter. 
  @Input() displayDetail!: boolean;
  @Input() hitCount!: number;
  hitmessage!: string;
  @Output()valueChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('filterElement') filterElementRef! :ElementRef

  private _listFilter!: string;
  get listFilter():string{
    return this._listFilter;
  }

  set listFilter(value:string){
    this._listFilter = value;
    this.valueChange.emit(value);
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {   
    if(this.filterElementRef.nativeElement){
      this.filterElementRef.nativeElement.focus();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['hitcount'] && !changes['hitcount'].currentValue){
      this.hitmessage = 'No hits found';
    }else{
      this.hitmessage = 'Hits: ' + this.hitCount
    }
  }
  // onfilterChange(filter:string){
  //    this.listFilter = filter;
  //    this.performFilter(this.listFilter);
  // }
  // we ca nreplace this by using getter and setter
}

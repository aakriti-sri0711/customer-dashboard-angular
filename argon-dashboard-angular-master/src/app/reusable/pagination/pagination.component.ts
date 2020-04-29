import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input('pages') pages
  @Output('pagenumber') pagenumber = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  onSelect(page){
    this.pagenumber.emit(page);
  }

}

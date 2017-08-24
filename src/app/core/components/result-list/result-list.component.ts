import { Component, OnInit } from '@angular/core';
import {ResultHelperService} from '../../services/resultHelper/result-helper.service';

@Component({
  selector: 'pys-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {

  tabs: any[] = [];

  constructor(resultHelper: ResultHelperService) {
    resultHelper.resultControl$.subscribe(
      (tab) => {
        this.tabs.push(tab);
      }
    );
  }

  ngOnInit() {

  }

  close(index: number): void {
    this.tabs.splice(index, 1);
  }

}

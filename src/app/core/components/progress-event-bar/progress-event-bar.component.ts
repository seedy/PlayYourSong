import { Component, OnInit } from '@angular/core';
import {ProgressHelperService} from '../../services/progressHelper/progress-helper.service';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

@Component({
  selector: 'pys-progress-event-bar',
  templateUrl: './progress-event-bar.component.html',
  styleUrls: ['./progress-event-bar.component.scss']
})
export class ProgressEventBarComponent implements OnInit {

  progressMode: string;
  progressStatus: number;
  progressTotal: number;

  constructor(
    public progressHelper: ProgressHelperService
  ) { }

  ngOnInit() {
    this.resetProgressMode();
    this.progressHelper.progressEventControl$.subscribe(
      (event) => {
        this.progressMode = 'determinate';
        this.handleProgressEvents(event);
      }
    );
  }

  private resetProgressMode() {
    this.progressMode = '';
  }

  handleProgressEvents(event: HttpEvent<any>) {
    if (event.type === HttpEventType.Sent) {
      this.progressStatus = 0;
    }
    if (event.type === HttpEventType.ResponseHeader) {
      this.progressTotal = Number(event.headers.get('Content-Length')) * 10;
    }
    if (event.type === HttpEventType.UploadProgress || event.type === HttpEventType.DownloadProgress) {
      let total = 0;
      if (event.total) {
        total = event.total;
      } else {
        total = this.progressTotal;
      }
      this.progressStatus = Math.round(100 * event.loaded / total);
    }
    if (event.type === HttpEventType.Response) {
      this.progressStatus = this.progressTotal;
      Observable.timer(500).subscribe(() => this.resetProgressMode());
    }
  }

}

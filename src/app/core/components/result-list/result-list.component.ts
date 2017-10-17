import { Component, OnInit } from '@angular/core';
import {ResultHelperService} from '../../services/resultHelper/result-helper.service';
import {Track} from '../../../shared/classes/track';
import {PlaylistControlService} from '../../../shared/services/playlist-control/playlist-control.service';

@Component({
  selector: 'pys-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {

  tabs: any[] = [];

  private resultIds = {
    YoutubeSearchService: 'youtube'
  };

  constructor(
    private resultHelper: ResultHelperService,
    public playlistControl: PlaylistControlService
  ) {
    resultHelper.resultControl$.subscribe(
      (tab) => {
        tab.name = this.resultIds[tab.id];
        tab.count = this.countExistingTabs(tab);
        this.tabs.push(tab);
      }
    );
  }

  ngOnInit() {

  }

  countExistingTabs(tab: any): number {
    return this.tabs.reduce( (total, tabbed) => {
      if (tabbed.id === tab.id) {
        total++;
      }
      return total;
    }, 0);
  }

  close(index: number): void {
    this.tabs.splice(index, 1);
  }

  addResult(result: Track) {
    this.playlistControl.queueInControl(result);
  }

}

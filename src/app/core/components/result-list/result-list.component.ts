import { Component, OnInit } from '@angular/core';
import {ResultHelperService} from '../../services/resultHelper/result-helper.service';
import {Track} from '../../../shared/classes/track';
import {PlaylistControlService} from '../../../shared/services/playlist-control/playlist-control.service';
import {Tab} from '../../../shared/classes/tab';

@Component({
  selector: 'pys-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent {

  public tabs: Tab[] = [];

  private resultIds = {
    YoutubeSearchService: 'youtube'
  };

  constructor(
    private resultHelper: ResultHelperService,
    private playlistControl: PlaylistControlService
  ) {
    resultHelper.resultControl$.subscribe(
      (tab: Tab) => {
        tab.name = this.resultIds[tab.id];
        tab.count = this.countExistingTabs(tab);
        this.tabs.push(tab);
      }
    );
  }

  public close(index: number): void {
    if (index > -1) {
      this.tabs.splice(index, 1);
    }
  }

  public onResultAdded(result: Track): void {
    this.playlistControl.queueInControl(result);
  }

  private countExistingTabs(tab: any): number {
    return this.tabs.reduce( (total, tabbed) => {
      if (tabbed.id === tab.id) {
        total++;
      }
      return total;
    }, 0);
  }

}

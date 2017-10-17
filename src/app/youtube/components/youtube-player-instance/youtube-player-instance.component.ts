import {AfterViewInit, Component, DoCheck, Input, ViewChild} from '@angular/core';
import {Player} from '../../../shared/interfaces/player';
import {Track} from '../../../shared/classes/track';
import {PlayerLoaderService} from '../../services/player-loader/player-loader.service';

@Component({
  selector: 'pys-youtube-player-instance',
  templateUrl: './youtube-player-instance.component.html',
  styleUrls: ['./youtube-player-instance.component.scss']
})
export class YoutubePlayerInstanceComponent implements Player, DoCheck, AfterViewInit {
  @Input() track: Track;
  @ViewChild('iframe') iframe;

  path: string;
  constructor(
    private playerLoaderService: PlayerLoaderService
  ) { }

  ngAfterViewInit() {
    this.playerLoaderService.loadApi();
    this.playerLoaderService.loadPlayer(this.iframe.nativeElement, {})
      .subscribe((control) => control);
  }

  ngDoCheck() {
    this.path = 'http://www.youtube.com/embed/' + this.track.url + '?enablejsapi=1';
  }
}

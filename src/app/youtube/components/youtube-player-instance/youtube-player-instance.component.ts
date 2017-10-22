import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {Player} from '../../../shared/interfaces/player';
import {Track} from '../../../shared/classes/track';
import {PlayerLoaderService} from '../../services/player-loader/player-loader.service';
import {PlaylistControlService} from '../../../shared/services/playlist-control/playlist-control.service';

@Component({
  selector: 'pys-youtube-player-instance',
  templateUrl: './youtube-player-instance.component.html',
  styleUrls: ['./youtube-player-instance.component.scss']
})
export class YoutubePlayerInstanceComponent implements Player, AfterViewInit {
  @Input() track: Track;
  @ViewChild('iframe') iframe;

  path: string;

  private YT: any;
  private player: any;
  constructor(
    private playerLoaderService: PlayerLoaderService,
    private playlistControlService: PlaylistControlService
  ) { }

  ngAfterViewInit() {
    this.loadPlayer();
  }

  onManualTrackChange(oldTrack: Track, newTrack: Track): void {
    // expect @Input to have been modified, track and player to be truthy
    if (!this.track || !this.player || this.track !== newTrack) {
      return;
    }

    this.player.loadVideoById({videoId: this.track.url});
  }

  private loadPlayer(): void {
    this.playerLoaderService.loadApi()
      .subscribe((YT) => this.YT = YT);

    this.playerLoaderService.loadPlayer(this.iframe.nativeElement, {
      width: '360',
      height: '200',
      videoId: this.track.url,
      playerVars: {
        autoplay: 1,
        fs: 1,
        enablejsapi: 1
      },
      events: {
        onStateChange: this.onTrackEnded.bind(this)
      }
    })
      .subscribe((player) => {
      this.player = player;
    });
  }

  private onTrackEnded(event) {
    // event 'track ended'
    if (event.data === this.YT.PlayerState.ENDED) {
      this.playlistControlService.nextControl();
    }
  }
}

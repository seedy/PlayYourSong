import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';

import { HomeComponent } from './home.component';
import {TracknavComponent} from '../tracknav/tracknav.component';
import {NavbarComponent} from '../navbar/navbar.component';
import {ComponentsStub} from '../../../../testing/components-stub';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let tracknavStub, navbarStub;

  beforeEach(async(() => {
    tracknavStub = ComponentsStub.mockComponent({
      selector: 'pys-tracknav',
      template: '<ng-content></ng-content>',
      inputs: ['open'],
      outputs: ['onClosed']
    });
    navbarStub = ComponentsStub.mockComponent({
      selector: 'pys-navbar'
    });
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        HomeComponent,
        tracknavStub,
        navbarStub
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit').and.callThrough();
    fixture.detectChanges();
  });

  it('checks component public api, construction and lifecycle', () => {
    expect(component).toBeTruthy();
    expect(component.sideNavClosed).toEqual(jasmine.any(Function));
    expect(component.ngOnInit).toEqual(jasmine.any(Function));
    expect(component.ngOnInit as jasmine.Spy).toHaveBeenCalled();
    expect(component.sidenavOpen).toEqual(true);
  });


  it('checks method sidenavClosed', () => {
    expect(component.sidenavOpen).toEqual(true);
    component.sideNavClosed();
    expect(component.sidenavOpen).toEqual(false);
  });

  it('checks bindings with component pys-tracknav', () => {
    const tracknavEl = fixture.debugElement.query(By.css('pys-tracknav'));
    expect(tracknavEl).not.toBeNull();
    expect(tracknavEl.componentInstance).toBeDefined();

    expect(tracknavEl.componentInstance.open).toEqual(component.sidenavOpen);
    component.sidenavOpen = false;
    fixture.detectChanges();
    expect(tracknavEl.componentInstance.open).toEqual(component.sidenavOpen);

    spyOn(component, 'sideNavClosed');

    tracknavEl.componentInstance.onClosed.emit();
    expect(component.sideNavClosed as jasmine.Spy).toHaveBeenCalled();
  });

  it('checks bindings with component pys-navbar', () => {
    const navbarEl = fixture.debugElement.query(By.css('pys-tracknav > pys-navbar'));
    expect(navbarEl).not.toBeNull();
    expect(navbarEl.componentInstance).toBeDefined();
  });

});

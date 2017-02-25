import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeBarComponent } from './welcome-bar.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('WelcomeBarComponent', () => {
  let component: WelcomeBarComponent;
  let fixture: ComponentFixture<WelcomeBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeBarComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

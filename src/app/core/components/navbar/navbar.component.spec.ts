import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {Location} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {MaterialModule} from '../../../material/material.module';
import { NavbarComponent } from './navbar.component';
import {ComponentsStub} from '../../../../testing/components-stub';
import {RouterStub} from '../../../../testing/router-stub';
import {LoginService} from '../../../shared/services/login/login.service';
import {SearchHelperService} from '../../services/searchHelper/searchHelper.service';
import {ClassesStub} from '../../../../testing/classes-stub';

fdescribe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let progressEventBarStub, loginServiceStub, searchHelperStub, mockComponentStub;
  const isLoggedIn = true;
  const init = {
    isLoggedIn$: Observable.of(isLoggedIn),
    getServices: []
  };

  beforeEach(async(() => {
    progressEventBarStub = ComponentsStub.mockComponent({
      selector: 'pys-progress-event-bar'
    });
    mockComponentStub = ComponentsStub.mockComponent({
      selector: 'mock-component'
    });
    loginServiceStub = jasmine.createSpyObj('loginService', ['checkToken', 'logout']);
    loginServiceStub.isLoggedIn$ = init.isLoggedIn$;
    searchHelperStub = jasmine.createSpyObj('searchHelper', ['query', 'getServices', 'activateServices']);
    (searchHelperStub.getServices as jasmine.Spy).and.returnValue(init.getServices);

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        RouterTestingModule.withRoutes([
          {path: '', component: mockComponentStub},
          {path: 'search', component: mockComponentStub},
          {path: 'register', component: mockComponentStub},
          {path: 'login', component: mockComponentStub}
        ])
      ],
      declarations: [
        NavbarComponent,
        progressEventBarStub,
        mockComponentStub
      ],
      providers: [
        {provide: LoginService, useValue: loginServiceStub},
        {provide: SearchHelperService, useValue: searchHelperStub},
        Location,
        ClassesStub
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit').and.callThrough();
    fixture.detectChanges();
  });

  it('checks component public api, construction and lifecycle', () => {
    expect(component).toBeTruthy();
    expect(component.search).toEqual('');
    expect(component.ngOnInit).toEqual(jasmine.any(Function));
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.isLoggedIn).toEqual(isLoggedIn);
    expect(component.services).toEqual(init.getServices);
    expect(component.activeServices).toEqual(init.getServices);

    expect(component.onChange).toEqual(jasmine.any(Function));
    expect(component.query).toEqual(jasmine.any(Function));
    expect(component.checkToken).toEqual(jasmine.any(Function));
    expect(component.logout).toEqual(jasmine.any(Function));
  });

  it('checks method onChange',
    inject([ClassesStub], (classesStub: ClassesStub) => {
    const services = [classesStub.newSearchable('1'), classesStub.newSearchable('2')];
    const activeServices = services.slice(0, 1);
    activeServices[0].active = true;
    const expectedParam = activeServices.map((service) => service.name);

    component.activeServices = activeServices;

    component.onChange();

    expect(searchHelperStub.activateServices as jasmine.Spy).toHaveBeenCalledWith(expectedParam);
  }));

  it('checks method query',
    async(inject([Location], (location: Location) => {
    const search = 'mock';
    component.search = search;

    expect(location.path()).toEqual('');

    component.query();

    expect(searchHelperStub.query).toHaveBeenCalledWith(search);

    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/search');
    });
  })));

  it('checks method checkToken', () => {
    const token = 'mock';
    (loginServiceStub.checkToken as jasmine.Spy).and.returnValue(Observable.of(token));

    component.checkToken();

    expect(loginServiceStub.checkToken).toHaveBeenCalled();
  });

  it('checks method logout', () => {
    component.logout();

    expect(loginServiceStub.logout as jasmine.Spy).toHaveBeenCalled();
  });

});

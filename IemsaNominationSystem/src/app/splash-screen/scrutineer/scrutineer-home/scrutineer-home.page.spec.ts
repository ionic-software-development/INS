import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScrutineerHomePage } from './scrutineer-home.page';

describe('ScrutineerHomePage', () => {
  let component: ScrutineerHomePage;
  let fixture: ComponentFixture<ScrutineerHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrutineerHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScrutineerHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

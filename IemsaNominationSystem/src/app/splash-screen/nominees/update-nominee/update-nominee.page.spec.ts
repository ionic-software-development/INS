import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateNomineePage } from './update-nominee.page';

describe('UpdateNomineePage', () => {
  let component: UpdateNomineePage;
  let fixture: ComponentFixture<UpdateNomineePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateNomineePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateNomineePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

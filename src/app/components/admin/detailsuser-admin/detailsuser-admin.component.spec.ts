import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsuserAdminComponent } from './detailsuser-admin.component';

describe('DetailsuserAdminComponent', () => {
  let component: DetailsuserAdminComponent;
  let fixture: ComponentFixture<DetailsuserAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsuserAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsuserAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

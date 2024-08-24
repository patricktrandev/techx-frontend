import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsproductAdminComponent } from './detailsproduct-admin.component';

describe('DetailsproductAdminComponent', () => {
  let component: DetailsproductAdminComponent;
  let fixture: ComponentFixture<DetailsproductAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsproductAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsproductAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

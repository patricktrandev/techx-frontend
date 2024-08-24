import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailscategoriesAdminComponent } from './detailscategories-admin.component';

describe('DetailscategoriesAdminComponent', () => {
  let component: DetailscategoriesAdminComponent;
  let fixture: ComponentFixture<DetailscategoriesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailscategoriesAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailscategoriesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

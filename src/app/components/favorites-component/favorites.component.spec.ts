import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppFavoritesComponent } from './favorites.component';

describe('AppFavoritesComponent', () => {
  let fixture: ComponentFixture<AppFavoritesComponent>;
  let component: AppFavoritesComponent;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppFavoritesComponent
      ]
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(AppFavoritesComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('viewPhoto', () => {
    it('should navigate to photo page', () => {
      const dummyId = 1234;
      spyOn(router, 'navigate');

      component.viewPhoto(dummyId);

      expect(router.navigate).toHaveBeenCalledWith([`/photos/${dummyId}`]);
    });
  });
});
